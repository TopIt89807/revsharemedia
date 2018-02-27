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
    employeeType: { //1: Admin, 2: Manager, 3: Sales, 4:Support
        type: Number,
        isRequired: true,
    },
    state: { //true: enabled, false:disabled
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
        isRequired: true,
    },
    removed: {
        type: Boolean
    }
});

module.exports = mongoose.model('users', UsersSchema);