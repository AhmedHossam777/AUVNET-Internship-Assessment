require('dotenv').config();
require('express-async-errors');

const jwt = require('jsonwebtoken');

const signAccessToken = (userId) => {
	return new Promise((resolve, reject) => {
		const payload = { userId };
		const secret = process.env.ACCESS_TOKEN_SECRET;
		const options = {
			expiresIn: process.env.ACCESS_TOKEN_LIFE,
		};
		jwt.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				reject(err);
			}
			resolve(token);
		});
	});
};

const generateAccessToken = async (userId) => {
	return await signAccessToken(userId);
};

module.exports = { generateAccessToken };