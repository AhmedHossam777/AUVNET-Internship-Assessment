const asyncWrapper = require('express-async-handler');
const AppError = require('../utils/AppError');
const Product = require('../models/Product');
const User = require('../models/User');

const createProduct = asyncWrapper(async (req, res, next) => {
	const { price, name, brand } = req.body;
	const user = req.user.id;

	const product = await Product.create({
		name,
		price,
		brand,
		user,
	});

	res.status(201).json({
		status: 'success',
		product,
	});
});

const getProducts = asyncWrapper(async (req, res, next) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const skip = (page - 1) * limit;

	const products = await Product.find().limit(limit).skip(skip);
	const totalProducts = await Product.countDocuments();

	res.status(200).json({
		status: 'success',
		results: products.length,
		totalProducts,
		currentPage: page,
		totalPages: Math.ceil(totalProducts / limit),
		products,
	});
});

const getProduct = asyncWrapper(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new AppError(404, 'Product not found'));
	}
	res.status(200).json({
		status: 'success',
		product,
	});
});

const updateProduct = asyncWrapper(async (req, res, next) => {
	const userId = req.user.id;

	const [user, product] = await Promise.all([
		User.findById(userId),
		Product.findById(req.params.id),
	]);

	if (!product) {
		return next(new AppError(404, 'Product not found'));
	}
	if (product.user.toString() !== userId && user.role !== 'admin') {
		return next(
			new AppError(403, 'You are not authorized to update this product'),
		);
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
	);

	res.status(200).json({
		status: 'success',
		updatedProduct,
	});
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
	const userId = req.user.id;

	const [user, product] = await Promise.all([
		User.findById(userId),
		Product.findById(req.params.id),
	]);

	if (!product) {
		return next(new AppError(404, 'Product not found'));
	}

	if (product.user.toString() !== userId && user.role !== 'admin') {
		return next(
			new AppError(403, 'You are not authorized to delete this product'),
		);
	}

	await Product.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};