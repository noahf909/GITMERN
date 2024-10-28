const Order = require("../models/Order");
const Customer = require("../models/Customer");

//get all orders
const getOrders = async () => {
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        throw new Error("Failed to fetch orders");
    }
};

//get an order by id
const getOrderById = async (id) => {
    try {
        const order = await Order.findById(id);
        return order;
    }
    catch (error) {
        throw new Error("Failed to fetch order");
    }
};

//get all orders by customer id
const getOrdersByCustomer = async (customerId) => {
    try {
        const orders = await Order.find({ customer: customerId });
        return orders;
    } catch (error) {
        throw new Error("Failed to fetch orders");
    }
};

//add a new order
const addOrder = async (order) => {
    try {
        const newOrder = new Order(order);
        await newOrder.save();
        //add the order to the customer's list of orders
        const customer = await Customer.findById(order.customer);
        customer.orders.push(newOrder);
        return newOrder;
    } catch (error) {
        throw new Error("Failed to add order");
    }
};

//update an order by id
const updateOrder = async (id, order) => {
    try {
        await Order.findByIdAndUpdate(id, order);
        const updatedOrder = await Order.findById(id);
        return updatedOrder;
    }
    catch (error) {
        throw new Error("Failed to update order");
    }
};

//delete an order by id
const deleteOrder = async (id) => {
    try {
        const order = await Order.findByIdAndDelete(id);
        //delete the order from the customer's list of orders
        const customer = await Customer.findById(order.customer);
        customer.orders = customer.orders.filter((orderId) => orderId.toString() !== id);
        return order;
    }
    catch (error) {
        throw new Error("Failed to delete order");
    }
};

//export functions
module.exports = { getOrders, getOrderById, getOrdersByCustomer, addOrder, updateOrder, deleteOrder };