import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus, FaChalkboardTeacher, FaHatCowboy } from 'react-icons/fa'; // Import appropriate icons
import './Header.css';

export const secondNavbar = () => {
  return (
    <div className="navbar-container second-navbar">
            <div className="header">
                {/* Logo */}
                <div className="navbar-logo">ADMIN DASHBOARD</div>
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
  );
}

const Header = ({ user, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* First Navbar Container */}
      <div className="navbar-container">
        <div className="header">
          <div className="navbar-left">
            {/* Search Bar */}
            <div className="top-nav-search">
              <Link to="" className="responsive-search">
                <i className="fa fa-search"></i>
              </Link>
              <form action="search.html">
                <input className="form-control search-input" type="text" placeholder="Search here" />
                <button className="btn search-btn" type="submit">Search</button>
              </form>
            </div>
            {/* Logo */}
            <Link id="mobile_btn" className="mobile_btn float-left" to="#sidebar"><i className="fas fa-bars" aria-hidden="true"></i></Link>
            <Link id="toggle_btn" className="float-left" to="">
              <img src="assets/img/sidebar/icon-21.png" alt="" />
            </Link>
          </div>

          <div className="navbar-right">
            {/* User Profile or Login Link */}
            {user ? (
              <div className="user-profile" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                <img src={user.image} alt="User" className="user-image" />
                <span className="user-name">{user.name}</span>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/" className="login-link">Login</Link>
            )}
            
          </div>
        </div>
      </div>
        <div className="navbar-container second-navbar">
            <div className="header">
                {/* Logo */}
                <div className="navbar-logo">ADD NON-ACADEMIC STAFF</div>
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
      
    </>
  );
}

export default Header;
