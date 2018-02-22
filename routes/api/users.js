const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');

router.post('/signup', users.signup);

module.exports = router;