const express = require('express');
const { protect } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');
const {
	createBrand,
	deleteBrand,
	getBrands,
	getBrand,
	updateBrand,
} = require('../services/brand');

const router = express.Router();

router.route('/').get(getBrands).post(protect, isAdmin, createBrand);
router
	.route('/:id')
	.get(getBrand)
	.patch(protect, isAdmin, updateBrand)
	.delete(protect, isAdmin, deleteBrand);

module.exports = router;