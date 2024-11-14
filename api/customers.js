const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Assuming you have a Customer model

// POST - Add a new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add customer' });
  }
});

// GET - Fetch all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

module.exports = router;