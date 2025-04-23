const jwt = require('jsonwebtoken');
const { blacklistedTokens,isBlacklisted } = require('../utils/token.blacklist.js'); // Import the blacklist array

// Middleware to authenticate the token
const authtoken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    } 
    
        // 🔒 Check if token is blacklisted
    if (isBlacklisted(token)) {
        return res.status(401).json({ message: 'Token has been invalidated' });
    }


    jwt.verify(token, process.env.JWT_SeCRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authtoken;