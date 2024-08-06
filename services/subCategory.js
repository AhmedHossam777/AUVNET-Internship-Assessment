const SubCategory = require('../models/SubCategory');
const AppError = require('../utils/AppError');
const asyncWrapper = require('express-async-handler');

const createSubCategory = asyncWrapper(async (req, res, next) => {
	const subCategory = await SubCategory.create(req.body);
	res.status(201).json({
		status: 'success',
		subCategory,
	});
});

const getSubCategories = asyncWrapper(async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const skip = (page - 1) * limit;

	const subCategories = await SubCategory.find().limit(limit).skip(skip);
	const totalSubCategories = await SubCategory.countDocuments();

	res.status(200).json({
		status: 'success',
		results: subCategories.length,
		totalSubCategories,
		currentPage: page,
		totalPages: Math.ceil(totalSubCategories / limit),
		subCategories,
	});
});

const getSubCategory = asyncWrapper(async (req, res, next) => {
	const subCategory = await SubCategory.findById(req.params.id);
	if (!subCategory) {
		return next(new AppError(404, 'SubCategory not found'));
	}
	res.status(200).json({
		status: 'success',
		subCategory,
	});
});

const updateSubCategory = asyncWrapper(async (req, res, next) => {
	const subCategory = await SubCategory.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
	);
	if (!subCategory) {
		return next(new AppError(404, 'SubCategory not found'));
	}
	res.status(200).json({
		status: 'success',
		subCategory,
	});
});

const deleteSubCategory = asyncWrapper(async (req, res, next) => {
	const subCategory = await SubCategory.findById(req.params.id);
	if (!subCategory) {
		return next(new AppError(404, 'SubCategory not found'));
	}

	await SubCategory.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	createSubCategory,
	deleteSubCategory,
	getSubCategories,
	getSubCategory,
	updateSubCategory,
};