const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'SubCategory name is required'],
			unique: [true, 'SubCategory must be unique, it already exists'],
			minlength: [2, 'Too short SubCategory name'],
			maxlength: [32, 'Too long SubCategory name'],
		},

		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: [true, 'SubCategory must belong to parent category'],
		},
	},
	{ timestamps: true, virtuals: true, validateBeforeSave: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;