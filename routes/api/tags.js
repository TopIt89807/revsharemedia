const express = require('express');
const router = express.Router();
const tags = require('../../controllers/tags');
var validate = require('express-validation');
var Joi = require('joi');

router.post('/add', validate({
    body: {
        tagName: Joi.string().required(),
        tagState: Joi.boolean().required(),
    }
}), tags.add);

router.put('/update/:id', validate({
    body: {
        tagName: Joi.string(),
        tagState: Joi.boolean(),
    }
}), tags.update);

router.delete('/remove/:id', tags.delete);

module.exports = router;