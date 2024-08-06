const asyncWrapper = require('express-async-handler');
const AppError = require('../utils/AppError');

const Category = require('../models/Category');

const createCategory = asyncWrapper(async (req, res, next) => {
	const category = await Category.create(req.body);
	res.status(201).json({
		status: 'success',
		category,
	});
});

const getCategories = asyncWrapper(async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const skip = (page - 1) * limit;

	const categories = await Category.find().limit(limit).skip(skip);
	const totalCategories = await Category.countDocuments();

	res.status(200).json({
		status: 'success',
		results: categories.length,
		totalCategories,
		currentPage: page,
		totalPages: Math.ceil(totalCategories / limit),
		categories,
	});
});

const getCategory = asyncWrapper(async (req, res, next) => {
	const category = await Category.findById(req.params.id);
	if (!category) {
		return next(new AppError(404, 'Category not found'));
	}
	res.status(200).json({
		status: 'success',
		category,
	});
});

const updateCategory = asyncWrapper(async (req, res, next) => {
	const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	if (!category) {
		return next(new AppError(404, 'Category not found'));
	}

	res.status(200).json({
		status: 'success',
		category,
	});
});

const deleteCategory = asyncWrapper(async (req, res, next) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		return next(new AppError(404, 'Category not found'));
	}

	await Category.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
};