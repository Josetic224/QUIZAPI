const { check, validationResult } = require('express-validator');

// Custom validator function for username
const isUsernameValid = (value) => {
    const allowedCharacters = /^[a-zA-Z0-9_]+$/;
    return allowedCharacters.test(value);
};

// Password validation regex pattern
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Validation middleware for user registration
const validateUserRegistration = [
    // Validate username
    check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
        .custom(isUsernameValid).withMessage('Invalid characters in the username. Only alphanumeric characters and underscores are allowed'),

    // Validate email
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),

    // Validate password with strict rules
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .matches(passwordRegex).withMessage('Password must be at least 8 characters long and include at least one letter, one digit, and one special character'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
        }
        next();
    },
];

// Custom middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    handleValidationErrors,
};
