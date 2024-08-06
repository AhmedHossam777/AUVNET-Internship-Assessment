const express = require('express');
const router = express.Router();
const {
	createUser,
	deleteUser,
	updateUser,
	getUser,
	getAllUsers,
} = require('../services/user');

router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;