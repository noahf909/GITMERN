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

// POST - Customer login
router.post("/login", async (req, res) => {
  console.log("Login route hit");  
  const { email, password } = req.body;
  try {
      const customer = await getCustomerByLogin(email, password);
      if (customer) {
          res.status(200).json({ message: "Sign-in successful", customer });
      } else {
          res.status(401).json({ error: "Invalid email or password" });
      }
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
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