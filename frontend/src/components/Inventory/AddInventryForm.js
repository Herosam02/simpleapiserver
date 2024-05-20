import React, { useState } from 'react';
import api from '../../api';
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom';


function AddInventoryForm () {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: ''
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        api.post('/api/inventory', formData)
        .then(response => {
            console.log('Inventory item added successful');

            navigate('/inventory');
        })
        .catch(error => {
            console.error('Error adding inventory item:', error);
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Inventory Item</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Name' onChange={handleChange} style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '3px'}} />

                <input type='text' name='description' placeholder='Description' onChange={handleChange} style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '3px'}} />

                <input type='text' name='quantity' placeholder='Quantity' onChange={handleChange} style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '3px'}} />

                <input type='text' name='price' placeholder='Price' onChange={handleChange} style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '3px'}} />

                <button type='submit' style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', border: 'none', borderRadius: '3px'}} >Add New Inventory</button>
            </form>
        </div>
    )
}

export default AddInventoryForm;