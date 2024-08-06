const { generateAccessToken } = require('../utils/generateToken');

const asyncWrapper = require('express-async-handler');
const AppError = require('../utils/AppError');
const User = require('../models/User');

const signup = asyncWrapper(async (req, res, next) => {
	const { email, password, username } = req.body;
	if (!email || !password || !username) {
		return next(
			new AppError(400, 'Please provide email, password, and username'),
		);
	}
	const dupUser = await User.findOne({ email });
	if (dupUser) {
		return next(new AppError(400, 'User already exists'));
	}

	const user = await User.create({ email, password, username });

	const token = await generateAccessToken(user._id);
	res.status(201).json({
		status: 'success',
		token,
		user,
	});
});

const login = asyncWrapper(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError(400, 'Please provide email and password'));
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError(401, 'Invalid email or password'));
	}

	const token = await generateAccessToken(user._id);
	res.status(200).json({
		status: 'success',
		token,
		user,
	});
});

module.exports = { signup, login };