const express = require('express');
const router = express.Router();
const client = require('../../controllers/client');
var validate = require('express-validation');
var Joi = require('joi');

router.post('/add', validate({
    body: {
        // firstName: Joi.string().required(),
        // lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        // streetAddress1: Joi.string().require(),
        // streetAddress2: Joi.string().require(),
        // city: Joi.string().require(),
        // state: Joi.string().require(),
        // country: Joi.string().require(),
        // postal: Joi.string().require(),
        // assignedTo: Joi.string().require(),
        
    }
}), client.add);

// router.put('/update', validate({
//     body: {
//         email: Joi.string().email().required(),
//         password: Joi.string().required()
//     }
// }), client.update);

// router.delete('/remove', validate({
//     body: {
//         email: Joi.string().email().required(),
//         password: Joi.string().required()
//     }
// }), client.delete);


module.exports = router;