const express = require('express');
const { protect } = require('../middlewares/auth');
const {
	createProduct,
	deleteProduct,
	getProducts,
	getProduct,
	updateProduct,
} = require('../services/product');

const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);
router
	.route('/:id')
	.get(getProduct)
	.patch(protect, updateProduct)
	.delete(protect, deleteProduct);

module.exports = router;