// authController.js

const jwt = require('jsonwebtoken');
const { userModel } = require('../model/user'); // Import your User model

const logout = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming id is in the request parameters
        const user = await userModel.findById(userId);

        // Check if user is found
        if (user) {
            // Clear the token by setting it to null in the user object
            user.token = null;

            // Save the user object
            await user.save();

            res.status(200).json({ status: true, message: 'Logout successful' });
        } else {
            // Log user ID for debugging
            console.log('User ID:', userId);

            // Handle the case where user is not found
            res.status(404).json({ status: false, message: 'User not found' });
        }
    } catch (error) {
        // Log the error for further investigation
        console.error('Logout Error:', error);

        // Handle other errors
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

module.exports = { logout };
