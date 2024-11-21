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
        // Create the new order
        const newOrder = new Order({
            products: order.products.map((p) => ({
                product: p.product,
                size: p.size,
                quantity: p.quantity,
            })),
            total: order.total,
            address: order.address,
            customer: order.customer || null, // Handle guest orders by setting customer to null
            deliveryTime: order.deliveryTime || null, // Optional delivery time
        });

        // Save the new order to the database
        await newOrder.save();

        // If the customer is logged in, associate the order with the customer
        if (order.customer) {
            const customer = await Customer.findById(order.customer);
            if (!customer) {
                throw new Error("Customer not found");
            }
            customer.orders.push(newOrder._id); // Add the order ID to the customer's list of orders
            await customer.save(); // Save the updated customer
        }

        return newOrder;
    } catch (error) {
        console.error("Error adding order:", error.message);
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