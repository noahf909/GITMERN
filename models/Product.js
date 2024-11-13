const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  description: String,
  quantity: Number,
  frontImageUrl: String,
  backImageUrl: String,
  sizes: [
    {
      size: String,
      quantity: Number,
      _id: String
    },  
  ], 
});

module.exports = mongoose.model('Product', productSchema);
