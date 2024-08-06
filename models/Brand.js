const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Brand name is required'],
			unique: [true, 'Brand must be unique, it already exists'],
			minlength: [3, 'Too short Brand name'],
			maxlength: [32, 'Too long Brand name'],
		},
		subCategory: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'SubCategory',
				required: [true, 'Brand must belong to parent subCategory'],
			},
		],
	},
	{ timestamps: true, virtuals: true, validateBeforeSave: true },
);

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;