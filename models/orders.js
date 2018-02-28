const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    clientID: {
        type: Schema.Types.ObjectId,
        ref: 'clients',
        isRequired: true,
    },
    orderProduct: {
        type: String,
        isRequired: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
        isRequired: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = mongoose.model('orders', OrdersSchema);