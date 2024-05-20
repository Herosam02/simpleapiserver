const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header missing' })
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, ' 8660b4a22c68b7cd46b700d9b896441c7c01e681aa08c7cae8e84e30b6d3190e', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token'});
            }
            req.user = decoded;
            next();
    });
};

module.exports = { authenticate }