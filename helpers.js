const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('./config');

function createToken(user) {
    const payload = {user};
    return jwt.sign(payload, SECRET_KEY);
};

module.exports = {createToken};