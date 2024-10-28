

const express = require("express");
const router = express.Router();
const { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer, getCustomerByLogin } = require("../controllers/customerController.js");

//get all customers
router.get("/", async (req, res) => {
    try {
        const customers = await getCustomers();
        res.send(customers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get a customer by login
router.get("/:email/:password", async (req, res) => {
    try {
        const customer = await getCustomerByLogin(req.params.email, req.params.password);
        res.send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//add a new customer
router.post("/", async (req, res) => {
    try {
        const customer = await addCustomer(req.body);
        res.send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get a customer by id
router.get("/:id", async (req, res) => {
    try {
        const customer = await getCustomerById(req.params.id);
        res.send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//update a customer by id
router.put("/:id", async (req, res) => {
    try {
        const customer = await updateCustomer(req.params.id, req.body);
        res.send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//delete a customer by id
router.delete("/:id", async (req, res) => {
    try {
        const customer = await deleteCustomer(req.params.id);
        res.send(customer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;