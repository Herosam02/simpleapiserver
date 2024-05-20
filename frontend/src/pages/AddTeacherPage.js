import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import AddSidebar from '../components/Sidebar/AddSidebar.js';
import Header from '../components/Header/Header.js';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaUserPlus, FaHatCowboy } from 'react-icons/fa'; // Correct import statement
import './AddTeacherPage.css';
import api from '../api.js';

const AddTeacherForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        qualifications: '',
        contactNumber: '', // Corrected field name
        email: '',
        password: '',
        address: '',
        hireDate: '', // Corrected field name
        classes_taught: '',
        teacher_subjects: '',
        teacherImage: null, 
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    
    const history = useNavigate (); // Initialize useHistory

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const formDataWithImages = new FormData();
            for (const key in formData) {
                formDataWithImages.append(key, formData[key]);
            }
            const response = await api.post('/api/teachers/', formDataWithImages, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('API response:', response.data);
            alert('Teacher profile added successfully!');
            // Redirect to teacher profile page
            history.push(`/teacher/${response.data._id}/profile`);
            setFormData({
                ...formData,
                name: '',
                qualifications: '',
                contactNumber: '',
                email: '',
                password: '',
                address: '',
                hireDate: '',
                classes_taught: '',
                teacher_subjects: '',
                teacherImage: null, 
            });
            setError(null);
        } catch (error) {
            console.error('Error adding teacher profile:', error);
            setError('Failed to add teacher profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Header />
             {/* Second Navbar */}
        <div className="navbar-container second-navbar">
            <div className="header">
                {/* Logo */}
                <div className="navbar-logo">ADD TEACHER</div>
                {/* Dropdown for Add Secretary */}
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaUserPlus /> Secretary
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to="/add-secretary">Add New Secretary</Link>
                        {/* Add more sublinks as needed */}
                    </div>
                </div>
                {/* Dropdown for Add Accountant */}
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaUserPlus /> Accountant
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to="/add-accountant">Add New Accountant</Link>
                        {/* Add more sublinks as needed */}
                    </div>
                </div>
                {/* Dropdown for Add Teacher */}
                <div className="dropdown">
                    <button className="dropbtn">
                    <FaChalkboardTeacher /> Teacher
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to="/add-teacher">Add New Teacher</Link>
                        <Link to="/add-student">Get All Teachers</Link>
                        <Link to="/add-student">Edit Teachers</Link>
                        <Link to="/add-student">Delete Teachers</Link>
                        {/* Add more sublinks as needed */}
                    </div>
                </div>
                {/* Dropdown for Add Student */}
                <div className="dropdown">
                    <button className="dropbtn">
                        <FaHatCowboy /> Student
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to="/add-student">Add New Student</Link>
                        <Link to="/add-student">Get All Student</Link>
                        <Link to="/add-student">Edit Student</Link>
                        <Link to="/add-student">Delete Student</Link>
                        {/* Add more sublinks as needed */}
                    </div>
                </div>
            </div>
        </div>
            {/* End of Second Navbar */}
            <AddSidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header"></div>
                    <div className="page-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-container">
                                            <form className="custom-mt-form" id="teacherForm" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Qualifications</label>
                                                            <input type="text" className="form-control" name="qualifications" value={formData.qualifications} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Contact Number</label>
                                                            <input type="text" className="form-control" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email</label>
                                                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Password</label>
                                                            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Address</label>
                                                            <textarea className="form-control" name="address" value={formData.address} onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label>Hire Date</label>
                                                            <input type="date" className="form-control" name="hire_date" value={formData.hire_date} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Classes Taught</label>
                                                            <input type="text" className="form-control" name="classes_taught" value={formData.classes_taught} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Teacher Subjects</label>
                                                            <input type="text" className="form-control" name="teacher_subjects" value={formData.teacher_subjects} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="page-title ml-3">Image Upload</div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Teacher Image</label>
                                                                <input type="file" name="teacherImage" accept="image/*" className="form-control" onChange={handleFileChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <button type="submit" className="btn btn-primary2" disabled={isSubmitting}>
                                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTeacherForm;