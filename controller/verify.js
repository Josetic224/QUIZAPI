const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utilities/nodemailer');
const generateDynamicEmail = require('../client/html');
const { userModel } = require('../model/user');
require('dotenv').config();

const verifyUserAndSendEmail = async (userId) => {
    try {
        // Get the registered user to be verified via id
        const userToBeVerified = await userModel.findById(userId);

        // Check if the user is already verified
        if (userToBeVerified.isVerified === true) {
            throw new Error("User has already been verified.");
        }

        // Verify the user's token
        jwt.verify(userToBeVerified.token, process.env.JWT_SECRET, async (err) => {
            if (err) {
                // If token verification fails, generate a new token and update the user's token in the database
                const token = jwt.sign(
                    { username: userToBeVerified.username, email: userToBeVerified.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "120s" }
                );
                userToBeVerified.token = token;
                // Save the token
                await userToBeVerified.save();

                // Send a new verification email to the user with a new verification link
                const encodedToken = encodeURIComponent(userToBeVerified.token);
                sendEmail({
                    email: userToBeVerified.email,
                    subject: "Re-verify your email",
                    html: generateDynamicEmail(
                        `${process.env.BASE_URL}/verify/${userToBeVerified.id}/${encodedToken}`,
                    ),
                });
            } else {
                // If token verification is successful, update isVerified to true
                userToBeVerified.isVerified = true;
                await userToBeVerified.save();

                // Send an email indicating successful verification
                sendEmail({
                    email: userToBeVerified.email,
                    subject: "Email Verification Successful",
                    html: "Thank you for verifying your email. You can now login to your account.",
                });
            }
        });
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {
    verifyUserAndSendEmail,
};
