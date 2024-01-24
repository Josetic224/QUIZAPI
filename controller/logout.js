// authController.js

const jwt = require('jsonwebtoken');

const logout = async (req, res) => {
    try {
        // Clear the token by setting it to null in the user object
        req.user.token = null;
        await req.user.save();

        res.status(200).json({ status: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

module.exports = { logout };
