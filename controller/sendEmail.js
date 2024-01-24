const { verifyUserAndSendEmail } = require('./verify');

// Inside your route handler for the verify endpoint
const verifyUser =  async (req, res) => {
    try {
        const userId = req.params.id;
        // Call the function to verify the user and send an email
        await verifyUserAndSendEmail(userId);
        res.json("Verification process completed successfully.");
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}
module.exports = {verifyUser}
