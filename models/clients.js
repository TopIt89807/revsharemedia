const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientsSchema = new Schema({
    firstName: {
        type: String,
        isRequired: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        isRequired: true,
        unique: true,
    },
    phone: {
        type: String,
        isRequired: true,
        unique: true,
    },
    streetAddress: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    country: {
        type: String
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
});

module.exports = mongoose.model('clients', ClientsSchema);