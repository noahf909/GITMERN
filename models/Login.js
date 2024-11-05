const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', loginSchema);