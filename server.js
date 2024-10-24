const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set custom CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// MongoDB connection (replace with your MongoDB URI from Atlas)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const customerRoutes = require('./api/customers');
const productRoutes = require('./api/products');
const loginRoutes = require('./api/login')

// Use routes ()
/*
"Hey, whenever someone visits a web address that starts with /api/___, use the rules or functions I’ve defined in customerRoutes (customers.js) to decide what to do next."
*/
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/login', loginRoutes); 

// Start the Node + Express server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
