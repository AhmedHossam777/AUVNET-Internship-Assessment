const AppError = require('../utils/AppError');
const asyncWrapper = require('express-async-handler');
const Wishlist = require('../models/Wishlist');

const createWishlist = asyncWrapper(async (req, res, next) => {
	const user = req.user.id;
	const product = req.body.product;

	const wishlist = await Wishlist.create({ user, product });
	res.status(201).json({
		status: 'success',
		wishlist,
	});
});

const getWishlist = asyncWrapper(async (req, res, next) => {
	const user = req.user.id;
	const wishlists = await Wishlist.find({ user }).populate('product');
	res.status(200).json({
		status: 'success',
		results: wishlists.length,
		wishlists,
	});
});

const deleteWishlist = asyncWrapper(async (req, res, next) => {
	const user = req.user.id;

	const wishlist = await Wishlist.findOne({ user });
	if (!wishlist) {
		return next(
			new AppError(403, 'You are not authorized to perform this action')
		);
	}

	await Wishlist.findOneAndDelete({ user });

	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	createWishlist,
	getWishlist,
	deleteWishlist,
};
