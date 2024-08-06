const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Product name is required'],
			unique: [true, 'Product must be unique, it already exists'],
			minlength: [3, 'Too short Product name'],
			maxlength: [128, 'Too long Product name'],
			trim: true,
		},
		description: {
			type: String,
			minlength: [10, 'too short description'],
		},
		price: {
			type: Number,
			required: [true, 'product must have a price'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Product must belong to a user'],
		},
		brand: {
			type: mongoose.Schema.ObjectId,
			ref: 'Brand',
		},
	},
	{ timestamps: true, virtuals: true, validateBeforeSave: true },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;