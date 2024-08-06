const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Product name is required'],
			unique: [true, 'Product must be unique, it already exists'],
			minlength: [3, 'Too short Product name'],
			maxlength: [128, 'Too long Product name'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'description is required'],
			minlength: [10, 'too short description'],
		},
		quantity: {
			type: Number,
			required: [true, 'product quantity is required'],
		},
		price: {
			type: Number,
			required: [true, 'product must have a price'],
			trim: true,
		},
		imageCover: {
			type: String,
			default: 'default.jpg',
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: [true, 'Product must belong to category'],
		},
		subCategory: {
			type: mongoose.Schema.ObjectId,
			ref: 'SubCategory',
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