const { userModel } = require('../model/user');

const isAdmin = async (req, res, next) => {
    try {
        // Check if the current user is an admin
        const user = await userModel.findById(req.params.id);

        // Check if the user exists and is an admin
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized. Only admins can perform this action.' });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = isAdmin;
