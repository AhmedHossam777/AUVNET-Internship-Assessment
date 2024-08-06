const AppError = require('../utils/AppError');

const User = require('../models/User');

const getTokenFromHeader = require('../utils/getTokenFromHeader');
const verifyToken = require('../utils/verifyToken');

export const protect = async (req, res, next) => {
	const token = getTokenFromHeader(req);
	if (!token) {
		return next(new AppError('Unauthorized: Missing token', 401));
	}
	const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

	if (decoded === 'TokenExpiredError') {
		return next(new AppError('Unauthorized: Token expired', 401));
	}
	if (!decoded) {
		return next(new AppError('Unauthorized: Invalid token', 401));
	}

	const user = await User.findById(decoded.userId);

	if (!user) {
		return next(new AppError('Unauthorized: User not found', 401));
	}
	req.user = user;

	next();
};