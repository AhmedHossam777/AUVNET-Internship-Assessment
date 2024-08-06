const asyncWrapper = require('express-async-handler');
const AppError = require('../utils/AppError');

const Brand = require('../models/Brand');

const createBrand = asyncWrapper(async (req, res, next) => {
	const brand = await Brand.create(req.body);
	res.status(201).json({
		status: 'success',
		brand,
	});
});

const getBrands = asyncWrapper(async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const skip = (page - 1) * limit;

	const brands = await Brand.find().limit(limit).skip(skip);
	const totalBrands = await Brand.countDocuments();

	res.status(200).json({
		status: 'success',
		results: brands.length,
		totalBrands,
		currentPage: page,
		totalPages: Math.ceil(totalBrands / limit),
		brands,
	});
});

const getBrand = asyncWrapper(async (req, res, next) => {
	const brand = await Brand.findById(req.params.id);
	if (!brand) {
		return next(new AppError(404, 'Brand not found'));
	}
	res.status(200).json({
		status: 'success',
		brand,
	});
});

const updateBrand = asyncWrapper(async (req, res, next) => {
	const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	if (!brand) {
		return next(new AppError(404, 'Brand not found'));
	}
	res.status(200).json({
		status: 'success',
		brand,
	});
});

const deleteBrand = asyncWrapper(async (req, res, next) => {
	const brand = await Brand.findById(req.params.id);
	if (!brand) {
		return next(new AppError(404, 'Brand not found'));
	}

	await Brand.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	createBrand,
	deleteBrand,
	getBrands,
	getBrand,
	updateBrand,
};