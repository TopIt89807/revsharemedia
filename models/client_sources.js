const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSourcesSchema = new Schema({
    SourceName: {
        type: String,
        unique: true,
        isRequired: true,
    },
    SourceState: { //0: disabled, 1: enabled
        type: Boolean,
        isRequired: true,
    },
});

module.exports = mongoose.model('client_sources', clientSourcesSchema);