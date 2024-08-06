const AppError = require('../utils/AppError');

const getTokenFromHeader = (req) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}
	return authHeader.split(' ')[1];
};

module.exports = getTokenFromHeader;