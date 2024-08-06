const express = require('express');
const router = express.Router();
const {
	deleteUser,
	updateUser,
	getUser,
	getAllUsers,
} = require('../services/user');
const { login, signup } = require('../services/auth');

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.route('/signin').post(login);
router.route('/signup').post(signup);

module.exports = router;