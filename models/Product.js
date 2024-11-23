const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  description: String,
  quantity: Number, //Quantity should be reflected via sizes only. However, removing this will likely cause issues in other files
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
