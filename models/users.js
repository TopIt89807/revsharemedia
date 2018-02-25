const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email: {
        type: String,
        isRequired: true,
        unique: true,
    },
    password: {
        type: String,
        isRequired: true,
    },
    employeeType: {
        type: Number,
        isRequired: true,
    },
    state: {
        type: Boolean,
        isRequired: true,
    },
    lastLogin: {
        type: Date,
        Default: Date.now
    },
    lastIP: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        isRequired: true,
    },
    reportsTo: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
});

module.exports = mongoose.model('users', UsersSchema);