import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import '../index.css';

function OrderPage(){
    const {orderId} = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if(!orderId) {
                setLoading(false);
                setError('Order Id is not provided');
                return;
            }

            try{
                const response = await api.get(`/orders/${orderId}`);
                const orderData = response.data.order;
                const productsWithDetails = await fetchProductDetails(orderData.products);
                setOrder.products(orderData);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch order details');
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const fetchProductDetails = async (products) => {
        const productDetails = [];

        try{
            for (const product of products) {
                const response = await api.get(`/api/products/${product.product}`);
                const fetchedProduct = response.data;
                productDetails.push({
                    _id: fetchedProduct._id,
                    name: fetchedProduct.name,
                    price: fetchedProduct.price,
                    quantity: product.quantity,
                    image: getImageUrl(fetchedProduct.image)
                });
            }
        } catch (error) {
            console.error('Failed to fetch product details:', error);
        }
        return productDetails;
    }


    const getImageUrl = (imageName) => {
        const SERVER_URL = 'http://localhost:3000';
        return `${SERVER_URL}/uploads/${imageName}`;
    };

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>Error: {error}</div>;
    }

    return(
        <div className='order-details-container'>
            <h2>Order Details</h2>
            <p className='order-id'>Order ID: <span style={{ color: 'red'}}>{orderId}</span></p>
            {order && (
                <div>
                    <p className='shipping-address'>Shipping Address {order.shippingAddress && `${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}`}</p>
                    <h3 className='products-header'>Product Ordered</h3>
                    <ul className='product-list'>
                        {order.products.map((product, index) => (
                            <li key={index} className='product-item'>
                                <p className='product-name'>Name: {product.name}</p>
                                <p className='product-name'>Price: {product.price}</p>
                                <p className='order-name'>Quantity: {product.quantity}</p>

                                {product.image && <img src={product.image} alt={product.name} className='product-image' />}
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${order.totalPrice}</p>
                    {order.paymentMethod && <p className='payment-method'>Payment Method: {order.paymentMethod}</p>}
                </div>
            )}
        </div>
    );
}

export default OrderPage;