const express = require('express');
const router = express.Router();
const clients = require('../../controllers/clients');
var validate = require('express-validation');
var Joi = require('joi');

router.post('/add', validate({
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        streetAddress1: Joi.string(),
        streetAddress2: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        postal: Joi.string(),
        assignedTo: Joi.string(),
    }
}), clients.add);

router.put('/update/:id', validate({
    body: {
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.string(),
        streetAddress1: Joi.string(),
        streetAddress2: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        postal: Joi.string(),
        assignedTo: Joi.string(),
    }
}), clients.update);

router.delete('/remove/:id', clients.delete);

module.exports = router;