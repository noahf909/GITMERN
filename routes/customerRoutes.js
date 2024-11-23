

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
// router.get("/:email/:password", async (req, res) => {
//     try {
//         const customer = await getCustomerByLogin(req.params.email, req.params.password);
//         res.send(customer);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

router.post("/login", async (req, res) => {
    const { email, password } = req.body; // Get email and password from the request body
    try {
        // Call the controller function to check if the customer exists with the provided credentials
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

// Post get customer by login


module.exports = router;