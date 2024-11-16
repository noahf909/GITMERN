const Customer = require('../models/Customer');

//get all customers
const getCustomers = async () => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (error) {
        throw new Error("Failed to fetch customers");
    }
};

//get a customer by login
const getCustomerByLogin = async (email, password) => {
    try {
        console.log("Searching for customer with email:", email, "and password:", password);  // Log email and password
        const customer = await Customer.findOne({ email, password });
        console.log("Customer found:", customer);  // Log the result
        return customer;
    } catch (error) {
        throw new Error("Failed to fetch customer");
    }
};

//add a new customer
const addCustomer = async (customer) => {
    try {
        const newCustomer = new Customer(customer);
        await newCustomer.save();
        return newCustomer;
    } catch (error) {
        throw new Error("Failed to add customer");
    }
};

//get a customer by id
const getCustomerById = async (id) => {
    try {
        const customer = await
        Customer.findById(id);
        return customer;
    }
    catch (error) {
        throw new Error("Failed to fetch customer");
    }
};

//update a customer by id
const updateCustomer = async (id, customer) => {
    try {
        await Customer.findByIdAndUpdate(id, customer);
        const updatedCustomer = await Customer.findById(id);
        return updatedCustomer;
    } catch (error) {
        throw new Error("Failed to update customer");
    }
};

//delete a customer by id
const deleteCustomer = async (id) => {
    try {
        const customer = await
        Customer.findByIdAndDelete(id);
        return customer;
    }
    catch (error) {
        throw new Error("Failed to delete customer");
    }
};

//export functions
module.exports = { getCustomers, getCustomerByLogin ,addCustomer, getCustomerById, updateCustomer, deleteCustomer };