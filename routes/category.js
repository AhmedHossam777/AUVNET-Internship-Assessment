const express = require('express');
const isAdmin = require('../middlewares/isAdmin');
const { protect } = require('../middlewares/auth');
const {
	createCategory,
	deleteCategory,
	getCategories,
	getCategory,
	updateCategory,
} = require('../services/category');

const router = express.Router();

router
	.route('/')
	.get(protect, getCategories)
	.post(protect, isAdmin, createCategory);

router
	.route('/:id')
	.get(protect, getCategory)
	.patch(protect, isAdmin, updateCategory)
	.delete(protect, isAdmin, deleteCategory);

module.exports = router;