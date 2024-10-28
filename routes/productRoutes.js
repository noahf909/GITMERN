const express = require("express");
const router = express.Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");

//get all products
router.get("/", async (req, res) => {
    try {
        const products = await getProducts();
        res.send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get a product by id
router.get("/:id", async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        res.send(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//add a new product
router.post("/", async (req, res) => {
    try {
        const product = await addProduct(req.body);
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//update a product by id
router.put("/:id", async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        res.send(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//delete a product by id
router.delete("/:id", async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);
        res.send(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;