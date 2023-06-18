const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Generate a JWT token
const generateToken = (userId, role) => {
    const token = jwt.sign({ userId, role }, 'shashank');
    return token;
};

// Verify the JWT token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'shashank');
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

// Middleware to authenticate the user using JWT token
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const userId = verifyToken(token);

    if (!userId) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while authenticating the user' });
    }
};

// Middleware to authorize access based on user role
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    };
};

module.exports = {
    generateToken,
    authenticateUser,
    authorizeRole,
};
