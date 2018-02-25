const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentsSchema = new Schema({
    amount: {
        type: Number,
        isRequired: true,
    },
    paymentType: {
        type: String,
        isRequired: true,
    },
    transactionID: {
        type: String,
        isRequired: true,
    },
    parentTransactionID: {
        type: String,
    },
    paymentStatus: {
        type: String,
        isRequired: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        isRequired: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: 0,
    },
    clientID: {
        type: Schema.Types.ObjectId,
        ref: 'clients',
        isRequired: true,
    },
});

module.exports = mongoose.model('payments', PaymentsSchema);