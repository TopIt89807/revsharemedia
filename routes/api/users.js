const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');
var validate = require('express-validation');
var Joi = require('joi');

router.post('/signup', validate(
    {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
), users.signup);

module.exports = router;