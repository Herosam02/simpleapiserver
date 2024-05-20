const Product= require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

exports.getProductsById = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product)
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

exports.createProduct = async (req, res) => {
    try{
        const { name, description, price, quantity } = req.body;

        if (!req.file) {
            return res.status(404).json({ error: 'Product image is required' });
        }

        const image = req.file.filename;
        const product = await Product.create({ name, description, price, quantity, image});
        res.status(201).json({ message: 'Product created successful', product });
    } catch (error) {
        console.error('Error creating product:', error);

        if(error.code === 'ENOENT') {
            return res.status(404).json({ error: 'File not found or access denied' });

        }

        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successful', updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product Deleted successful', deleteProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
}

const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
    try{
        const { productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID'});
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }


        req.session.cart = req.session.cart || [];
        req.session.cart.push({ productId, quantity });

        res.status(200).json({ message: 'Product added to cart successfully'});
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};