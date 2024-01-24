const { userModel } = require('../model/user');

async function makeAdmin(req) {
    try {
        // Check if the requester is a superuser
        if (!req.user || !req.user.isSuperuser) {
            throw new Error('Unauthorized. Only superusers can perform this action.');
        }

        // Find the user by userId
        const user = await userModel.findById(req.params.id);

        if (!user) {
            throw new Error('User not found');
        }

        // Update user to be an admin
        user.isAdmin = true;
        await user.save();

        return { success: true, message: 'User successfully promoted to admin', user };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message || 'Error promoting user to admin' };
    }
}

module.exports = { makeAdmin };
