const { userModel } = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to login a user
const loginUser = async (req, res) => {
    try {
        // Get the data from the request body
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' });
        }

        // Check if the user with the provided email exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: false, message: 'Email does not exist. Please sign up.' });
        }
        if(!user.isVerified == true){
            return res.status(403).send("Your account is not verified yet.")
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: 'Invalid password' });
        }

        // If the password is valid, generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, isSuperuser: user.isSuperuser },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // You can adjust the expiration time as needed
        );
        user.token = token 
        await user.save()

        res.status(200).json({
            status: true,
            message: 'Login successful',
            data: {
                user: {
                    userId: user._id,
                    email: user.email,
                    // Add any other user data you want to include in the response
                },
                token,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    loginUser,
};
