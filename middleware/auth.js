const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals = jwt.verify(token, SECRET_KEY);
        };
        return next();
    } catch (err) {
        return next();
    };
};

module.exports = {authenticateJWT};