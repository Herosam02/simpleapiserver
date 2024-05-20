const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try{
        const { product, totalPrice, shippingAddress, paymentMethod } = req.body;

        if (!Array.isArray(products) || !products.every(item => typeof item === 'object')) {
            return res.status(400).json({ error: 'Invalid products array format' });
        }

        const isValidProduct = product.every(item => 
            item.productId && typeof item.productId === 'string' &&
            item.quantity && typeof item.quantity === 'number'
        );

        if (!isValidProduct) {
            return res.status(404).json({ error: 'Invalid product object format' });
        }

        const order = await Order.create({ products, totalPrice, shippingAddress, paymentMethod });
        res.status(201).json({ message: 'Order created successfully', orderId: order._id, order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.getOrderById = async (req, res) => {
    try{
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

exports.updateOrder = async (req, res) => {
    try{
        const orderId = req.params.orderId;
        const updates = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' })
    }
};

exports.processOrder = async (req, res) => {
    try{
        const { cart, totalPrice, shippingAddress, paymentMethod} = req.body;

        if (!Array.isArray(cart) || typeof totalPrice !== 'number' || typeof shippingAddress !== 'object') {
            return res.status(404).json({ error: 'Invalid request payload' });
        }
        const productIds = cart.map(item => item.productId);

        const products = [];
        for (const productId of productIds) {
            const product = await Product.findById(productId);
            if(!product) {
                return res.status(400).json({ error: `Product with ID ${productId} not found`});
            }
            product.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: cart.find(item => item.productId === productId).quantity,
                image: product.image,
            });
        }

        const Order = new Order({
            products,
            totalPrice,
            shippingAddress,
            paymentMethod,
        });

        await Order.save()

        res.status(201).json({ message: 'Order processed successfully', orderId: Order._id });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ message: 'Error processing order' });
    }
};