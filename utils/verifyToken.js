const jwt = require('jsonwebtoken');

const verifyToken = (token, secret) => {
	// { userId: '5f8b3e3f9d3e2b2d3c3e1b2d' }
	return jwt.verify(token, secret);
};

module.exports = { verifyToken };