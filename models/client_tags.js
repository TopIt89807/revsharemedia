const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientTagsSchema = new Schema({
    tagName: {
        type: String,
        unique: true,
        isRequired: true,
    },
    tagState: { //0: disabled, 1: enabled
        type: boolean,
        isRequired: true,
    },
});

module.exports = mongoose.model('client_tags', clientTagsSchema);