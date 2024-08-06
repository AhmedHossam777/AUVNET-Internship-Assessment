const express = require('express');

const { protect } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');
const {
	createSubCategory,
	deleteSubCategory,
	getSubCategories,
	getSubCategory,
	updateSubCategory,
} = require('../services/subCategory');

const router = express.Router();

router
	.route('/')
	.get(getSubCategories)
	.post(protect, isAdmin, createSubCategory);

router
	.route('/:id')
	.get(getSubCategory)
	.patch(protect, isAdmin, updateSubCategory)
	.delete(protect, isAdmin, deleteSubCategory);

module.exports = router;