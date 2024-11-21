require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product'); // Import the Product model

// Controller to create a payment intent
const createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // Amount in cents
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller to save the order after successful payment and update quantity in product collection
const saveOrder = async (req, res) => {
    const { userId, products, total, address } = req.body;

    try {
        // Create the order
        const newOrder = new Order({
            products: products.map((p) => ({
                product: p.product,
                size: p.size,
                quantity: p.quantity,
            })),
            total,
            address,
            customer: userId || null,
        });

        // Save the order to the database
        await newOrder.save();

        // Update product quantities
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).send({ error: `Product with ID ${item.product} not found` });
            }

            // Find the matching size in the product's sizes array
            const sizeIndex = product.sizes.findIndex((s) => s.size === item.size);
            if (sizeIndex === -1) {
                return res.status(400).send({ error: `Size ${item.size} not found for product ${product.name}` });
            }

            // Check if enough quantity is available
            if (product.sizes[sizeIndex].quantity < item.quantity) {
                return res.status(400).send({ error: `Insufficient stock for ${product.name}, size ${item.size}` });
            }

            // Reduce the quantity
            product.sizes[sizeIndex].quantity -= item.quantity;

            // Save the updated product
            await product.save();
        }

        // If user is logged in, update their orders list
        if (userId) {
            const customer = await Customer.findById(userId);
            if (customer) {
                customer.orders.push(newOrder._id);
                await customer.save();
            }
        }

        res.status(201).send(newOrder);
    } catch (error) {
        console.error("Error saving order:", error.message);
        res.status(500).send({ error: error.message });
    }
};



// Export the controllers
module.exports = {
  createPaymentIntent,
  saveOrder,
};
