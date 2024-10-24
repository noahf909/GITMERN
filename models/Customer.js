const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String,
  password: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
