import React, {useState} from 'react'
import api from '../../api';
import '../../index.css'
import {Link, useNavigate} from 'react-router-dom'

function ProductForm () {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append('name', formData.name);
            formDataWithImage.append('description', formData.description);
            formDataWithImage.append('price', formData.price);
            formDataWithImage.append('quantity', formData.quantity);
            formDataWithImage.append('image', formData.image);

            await api.post('/api/products', formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Product created successfully!');

            setFormData({
                name: '',
                description: '',
                price: '',
                quantity: '',
                image: null,
            })
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again.')
        }
        
    }
    return(
        
        <>
            <div className='form-container'>
                <h1>ProductForm</h1>

                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' value={FormData.name} onChange={handleChange} id='name' name='name' required/>
                    </div>
                    <div style={{ display: 'flex'}} className='form-group'>
                        <label htmlFor='description'>Description:</label>
                        <textarea type='text' value={FormData.description} onChange={handleChange} id='descrption' name='description' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price'>Price:</label>
                        <input type='number' value={FormData.Price} onChange={handleChange}  id='price' name='price' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='quantity'>Quantity:</label>
                        <input type='number' value={FormData.Quantity} onChange={handleChange} id='quantity' name='quantity' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='image'>Image:</label>
                        <input type='file' value={FormData.Image} onChange={handleImageChange} id='image' name='image' required/>
                        
                        <button type='submit' className='submit-button'>Add Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProductForm;