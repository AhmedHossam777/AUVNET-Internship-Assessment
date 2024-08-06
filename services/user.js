const mongoose = require('mongoose');
const User = require('../models/User');
const asyncWrapper = require('express-async-handler');

const createUser = asyncWrapper(async (req, res, next) => {
	const { email } = req.body;
	const dupUser = await User.findOne({ email });
	if (dupUser) {
		return res.status(400).json({
			status: 'error',
			message: 'User already exists',
		});
	}

	const user = await User.create(req.body);
	res.status(201).json({
		status: 'success',
		user,
	});
});

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

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			status: 'error',
			message: 'Invalid user ID',
		});
	}

	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			status: 'error',
			message: 'Invalid user ID',
		});
	}

	const user = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	res.status(200).json({
		status: 'success',
		user,
	});
});

const deleteUser = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			status: 'error',
			message: 'Invalid user ID',
		});
	}

	const user = await User.findByIdAndDelete(id);
	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'User deleted successfully',
	});
});

module.exports = { createUser, getAllUsers, getUser, deleteUser, updateUser };