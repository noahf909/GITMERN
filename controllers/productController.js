const Product = require("../models/Product");

//get all products
const getProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
};

//get a product by id
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        return product;
    }
    catch (error) {
        throw new Error("Failed to fetch product");
    }
};

//add a new product
const addProduct = async (product) => {
    try {
        const newProduct = new Product(product);
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw new Error("Failed to add product");
    }
}; 

//update a product by id
const updateProduct = async (id, product) => {
    try {
        await Product.findByIdAndUpdate(id, product);
        const updatedProduct = await Product.findById(id);
        return updatedProduct;
    }
    catch (error) {
        throw new Error("Failed to update product");
    }
};

//delete a product by id
const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        return product;
    }
    catch (error) {
        throw new Error("Failed to delete product");
    }
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };