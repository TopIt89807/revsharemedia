const express = require('express');
const router = express.Router();
const sources = require('../../controllers/sources');
var validate = require('express-validation');
var Joi = require('joi');

router.post('/add', validate({
    body: {
        sourceName: Joi.string().required(),
        sourceState: Joi.boolean().required(),
    }
}), sources.add);

router.put('/update/:id', validate({
    body: {
        sourceName: Joi.string(),
        sourceState: Joi.boolean(),
    }
}), sources.update);

router.delete('/remove/:id', sources.delete);

module.exports = router;