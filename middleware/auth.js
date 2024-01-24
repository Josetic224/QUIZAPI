require('dotenv').config()
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Token is missing.' });
        }

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        // Log the decoded payload
        console.log(decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};
module.exports = {verifyToken}
