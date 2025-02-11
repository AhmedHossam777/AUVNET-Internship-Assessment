const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: [true, 'You already have a wishlist'],
		},
		product: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
		],
	},
	{ timestamps: true },
);

const WishList = mongoose.model('WishList', wishListSchema);
module.exports = WishList;