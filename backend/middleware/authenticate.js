const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if authHeader exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not provided or in wrong format' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        // Verify the token using the secret key
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Differentiating between expired token and other errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Token is not valid' });
        } else {
            console.error("Token verification error:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authenticate;
