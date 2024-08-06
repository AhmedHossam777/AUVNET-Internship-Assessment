const express = require('express');

const { protect } = require('../middlewares/auth');
const {
	getWishlist,
	createWishlist,
	deleteWishlist,
} = require('../services/wishlist');

const router = express.Router();

router.route('/').get(protect, getWishlist).post(protect, createWishlist);
router.route('/:id').delete(protect, deleteWishlist);

module.exports = router;