import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import api from '../../api'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import Svg from '../Images/download.jpg'
import { BiSubdirectoryRight } from "react-icons/bi";
import { VscDiffRenamed } from "react-icons/vsc";
import { FcDepartment } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import { FaHome, FaUsers, FaUser, FaSchool,  FaChalkboard ,FaCalendarAlt, FaListAlt, FaRegCalendarCheck, FaChalkboardTeacher, FaFileAlt, FaPhone, FaAddressCard, FaCalendar} from 'react-icons/fa';

const Sidebar = ({ toggleQuestionForm , toggleBulkUpload }) => {
    const [isExamsReordsSubMenuOpen, setIsExamsRecordsSubMenuOpen] = useState(false);
    const [isStudentsSubMenuOpen, setIsStudentsSubMenuOpen] = useState(false);
    const [isAppsSubMenuOpen, setIsAppsSubMenuOpen] = useState(false);
    const [isQuestionsSubMenuOpen, setIsQuestionsSubMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        contactNumber: '',
        email: '',
        address: '',
        hireDate: ''
    })

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        api.post('/api/sidebarlist', formData)
        .then(response => {
            console.log('User item added successfully');

            navigate('/sidebarlist')
        })
        .catch (error => {
            console.error('Error adding user item:', error);
        }) 
    }

    const toggleSubMenu = (setter) => {
        setter((prevState) => !prevState);
    };

    return (
        <>
                    <Header />
                    
                        <section style={{ marginBottom: '270px'}}>
                            <form className="registration-form" onSubmit={handleSubmit}>
                            <div className="inputname registration">
                                <label className="inputname-text"><VscDiffRenamed />Name</label>
                                <input type="text" name="name" onChange={handleChange}/>
                            </div>
                            <div className="inputdepertment registration">
                                <label className="inputdepartment-text"><FcDepartment />department</label>
                                <input type="text" name="department" onChange={handleChange}/>
                            </div>
                                <div className="inputdate registration">
                                    <label className="inputdate-text"><FaCalendar />Hire_date</label>
                                    <input type="date" name="date" onChange={handleChange}/>
                                </div>
            
                                <div className="inputnumber registration">
                                    <label className="inputnumber-text"><FaPhone />contact-number</label>
                                    <input type="tel" name="number" onChange={handleChange}/>
                                </div>
            
                                <div className="inputemail registration">
                                    <label className="inputemail-text"><MdAlternateEmail />Email</label>
                                    <input type="email" name="email" onChange={handleChange}/>
                                </div>

                                <div className="inputaddress registration">
                                    <label className="inputaddress-text"><FaAddressCard />Address</label>
                                    <input type="text" name="address" onChange={handleChange}/>
                                </div>
                                <div className='input-button'>
                                    <button  type='submit'>Submit<BiSubdirectoryRight /></button>
                                </div>
                            </form>
                        </section>
                {/* Dropdown for Add Student */}
                
                <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <div className="header-left">
                        <Link to="/" className="logo">
                            <img src={Svg} width="40" height="40" alt="logo" />
                            <br />
                            <span className="text-uppercase">Preschool</span>
                        </Link>
                    </div>
                    <ul className="sidebar-ul">
                        <li className="menu-title">Menu</li>
                        <li className="menu-item-blue">
                            <Link to="/" className="menu-link">
                                <FaHome />
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className="submenu-container">
                            <div className="submenu-wrapper">
                                <div className="submenu" onClick={() => toggleSubMenu(setIsExamsRecordsSubMenuOpen)}>
                                    <Link to="#" className="menu-link">
                                        <FaListAlt />
                                        <span>Exams&Records</span>
                                        <span className="menu-arrow"></span>
                                    </Link>
                                    <ul className="list-unstyled" style={{ display: isExamsReordsSubMenuOpen ? 'block' : 'none' }}>
                                        <li><Link to="/" className="submenu-link"><span>View Exams List</span></Link></li>
                                        <li><Link to="/" className="submenu-link"><span>Create Exams</span></Link></li>
                                        <li><Link to="/" className="submenu-link"><span></span></Link></li>
                                        <li><Link to="/" className="submenu-link"><span></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="submenu-container">
                            <div className="submenu-wrapper">
                                <div className="submenu" onClick={() => toggleSubMenu(setIsStudentsSubMenuOpen)}>
                                    <Link to="#" className="menu-link">
                                        <FaChalkboard />
                                        <span>Academic Management</span>
                                        <span className="menu-arrow"></span>
                                    </Link>
                                    <ul className="list-unstyled" style={{ display: isStudentsSubMenuOpen ? 'block' : 'none' }}>
                                        <li><Link to="/create-classes" className="submenu-link"><span>Create Classes</span></Link></li>
                                        <li><Link to="/create-subjects" className="submenu-link"><span>Create Subjects</span></Link></li>
                                        <li><Link to="/add-subject-to-class" className="submenu-link"><span>Add Subject to Class</span></Link></li>
                                        <li><Link to="/assign-subject-to-teacher" className="submenu-link"><span>Assign Subject to Teacher</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="submenu-container">
                            <div className="submenu-wrapper">
                                <div className="submenu" onClick={() => toggleSubMenu(setIsQuestionsSubMenuOpen)}>
                                    <Link to="#" className="menu-link">
                                        <FaFileAlt />
                                        <span>Questions Bank</span>
                                        <span className="menu-arrow"></span>
                                    </Link>
                                    <ul className="list-unstyled" style={{ display: isQuestionsSubMenuOpen ? 'block' : 'none' }}>
                                    <li><Link to="/add-question" className="submenu-link"><span>Add Questions to Bank</span></Link></li>
                                        <li><Link to="/" className="submenu-link"><span>Bulk question Upload</span></Link></li>
                                        <li><Link to="/" className="submenu-link"><span>View Questions</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="submenu-container">
                            <div className="submenu-wrapper">
                                <div className="submenu" onClick={() => toggleSubMenu(setIsAppsSubMenuOpen)}>
                                    <Link to="#" className="menu-link">
                                        <FaFileAlt />
                                        <span>Apps&Notification</span>
                                        <span className="menu-arrow"></span>
                                    </Link>
                                    <ul className="list-unstyled" style={{ display: isAppsSubMenuOpen ? 'block' : 'none' }}>
                                        <li><Link to="/app1" className="submenu-link"><span>App 1</span></Link></li>
                                        <li><Link to="/app2" className="submenu-link"><span>App 2</span></Link></li>
                                        <li><Link to="/app3" className="submenu-link"><span>App 3</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="submenu-container">
                            <Link to="/calendar" className="menu-link">
                                <FaCalendarAlt />
                                <span>Calendar</span>
                            </Link>
                        </li>
                        <li className="submenu-container">
                            <Link to="/exam-list" className="menu-link">
                                <FaListAlt />
                                <span>Exam List</span>
                            </Link>
                        </li>
                        <li className="submenu-container">
                            <Link to="/holidays" className="menu-link">
                                <FaRegCalendarCheck />
                                <span>Holidays</span>
                            </Link>
                        </li>
                        <li className="submenu-container">
                            <Link to="/exam-list" className="menu-link">
                                <FaFileAlt />
                                <span>Events</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default Sidebar;