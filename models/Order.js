const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    //list of products in the order
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: Number,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    address: String,
    deliveryTime: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);