const express = require('express');
const { makeAdmin } = require('../controller/adminAuth');

const verifyAdmin = async (req, res) => {
    try {
        // Check if the requester is a superuser
        if (!req.user || !req.user.isSuperuser) {
            throw new Error('Unauthorized. Only superusers can perform this action.');
        }

        const userId = req.params.userId;

        // Call the makeAdmin function with the req object
        const result = await makeAdmin(req);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({
                success: false,
                message: 'Error making user an admin',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error verifying admin privileges',
        });
    }
};

module.exports = verifyAdmin;
