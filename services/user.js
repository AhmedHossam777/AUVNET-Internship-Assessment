const mongoose = require('mongoose');
const asyncWrapper = require('express-async-handler');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const getAllUsers = asyncWrapper(async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const skip = (page - 1) * limit;

	const users = await User.find().skip(skip).limit(limit);
	const totalUsers = await User.countDocuments();

	res.status(200).json({
		status: 'success',
		results: users.length,
		totalUsers,
		currentPage: page,
		totalPages: Math.ceil(totalUsers / limit),
		users,
	});
});

const getUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	console.log(id);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new AppError(400, 'Invalid user ID'));
	}

	const user = await User.findById(id);
	if (!user) {
		return next(new AppError(404, 'User not found'));
	}

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new AppError(400, 'Invalid user ID'));
	}
	console.log(req.body);

	const user = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!user) {
		return next(new AppError(404, 'User not found'));
	}

	res.status(200).json({
		status: 'success',
		user,
	});
});

const deleteUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new AppError(400, 'Invalid user ID'));
	}

	const user = await User.findByIdAndDelete(id);
	if (!user) {
		return next(new AppError(404, 'User not found'));
	}

	res.status(204).json({
		status: 'success',
		message: 'User deleted successfully',
	});
});

module.exports = { getAllUsers, getUser, deleteUser, updateUser };