const express = require("express");
const router = express.Router();
const { getOrders, getOrderById, addOrder, updateOrder, deleteOrder, getOrdersByCustomer } = require("../controllers/orderController.js");

//get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await getOrders();
        res.send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get an order by id
router.get("/:id", async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);
        res.send(order);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//get all orders by customer id
router.get("/customer/:customerId", async (req, res) => {
    try {
        const orders = await getOrdersByCustomer(req.params.customerId);
        res.send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//add a new order
router.post("/", async (req, res) => {
    try {
        const order = await addOrder(req.body);
        res.send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//update an order by id
router.put("/:id", async (req, res) => {
    try {
        const order = await updateOrder(req.params.id, req.body);
        res.send(order);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//delete an order by id
router.delete("/:id", async (req, res) => {
    try {
        const order = await deleteOrder(req.params.id);
        res.send(order);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;