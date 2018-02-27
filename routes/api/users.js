const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');
var validate = require('express-validation');
var Joi = require('joi');

router.post('/signup', validate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        employeeType: Joi.number().integer().min(1).max(4).required(),
        state: Joi.boolean().required(),
        reportsTo: Joi.string().required(),
    },
}), users.signup);

router.post('/login', validate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), users.login);

router.put('/update', validate({
    body: {
        employeeType: Joi.number().integer().min(1).max(4),
        state: Joi.boolean(),
        reportsTo: Joi.string(),
    },
}), users.update);

router.put('/password_update', validate({
    body: {
        originPassword: Joi.string().required(),
        password: Joi.string().required(),
    },
}), users.updatePassword);

router.delete('/remove', users.remove);

module.exports = router;