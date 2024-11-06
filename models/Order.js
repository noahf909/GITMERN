const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    //list of products in the order
    products: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          size: String, // The selected size, e.g., "Medium"
          quantity: Number, // The quantity of this product in the selected size
        },
      ],
    total: Number, 
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    address: String,
    deliveryTime: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);