const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Category name is required'],
			unique: [true, 'Category must be unique, it already exists'],
			minlength: [3, 'Too short Category name'],
			maxlength: [32, 'Too long Category name'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'description is required'],
			minlength: [10, 'too short description'],
		},
	},
	{ timestamps: true, virtuals: true, validateBeforeSave: true },
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;