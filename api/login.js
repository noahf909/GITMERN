const express = require('express');
const router = express.Router();
const Login = require('../models/Login'); // Assuming you have a Login model
const cors = require('cors');

// POST - Add a new customer
router.post('/', async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.save();
    res.status(201).json(login);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add login credentials' });
  }
});

// GET - Fetch all customers
router.get('/', async (req, res) => {
  try {
    const login = await Login.find();
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch login credentials' });
  }
});

module.exports = router;