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
	const categories = await Category.find();
	res.status(200).json({
		status: 'success',
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
	const category = await Category.findByIdAndDelete(req.params.id);

	if (!category) {
		return next(new AppError(404, 'Category not found'));
	}

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