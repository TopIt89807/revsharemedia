const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentsSchema = new Schema({
    orderID: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        isRequired: true,
    },
    amount: {
        type: Number,
        isRequired: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        isRequired: true,
    },
    paymentState: { //COMPLETED, REFUNDED, REVERSED
        type: String,
        enum: ['COMPLETED', 'REFUNDED', 'REVERSED'],
        isRequired: true,
    },
    paymentType: { //card, paypal, ACH
        type: String,
        enum: ['card', 'stripe'],
        isRequired: true,
    },
    transactionID: {
        type: String,
        isRequired: true,
    },
    parentTransactionID: {
        type: String,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    // clientID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'clients',
    //     isRequired: true,
    // },
});

module.exports = mongoose.model('payments', PaymentsSchema);