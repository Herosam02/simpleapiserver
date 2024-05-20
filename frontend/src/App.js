import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import TaskForm from './components/Task/TaskForm'
import TaskList from './components/Task/TaskList'
import InventoryList from "./components/Inventory/InventoryList";
import AddInventoryForm from "./components/Inventory/AddInventryForm";
import ProductForm from "./components/Product/ProductForm";
import ProductList from "./components/Product/ProductList";
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import AddTeacherPage from './pages/AddTeacherPage'
import AddSidebar from "./components/Sidebar/AddSidebar";
import SidebarList from './components/Sidebar/SideberList';
import Newsidebar from "./SidebarPractising/newsidebar";
import AddNewSidebar from './SidebarPractising/Addnewsidebar'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/tasks' element={<TaskForm />} />
          <Route path='/taskList' element={<TaskList />} />
          <Route path='/inventory' element={<InventoryList />} />
          <Route path='/inventory/add' element={<AddInventoryForm />} />
          <Route path='/' element={<LoginForm />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/add' element={<ProductForm />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/sidebar3' element={<AddSidebar />} />
          <Route path='/sidebarlist' element={<SidebarList />} />
          <Route path='/header' element={<Header />} />
          <Route path='/addTeacherPage' element={<AddTeacherPage />} />
          <Route path='/newsidebar' element={<Newsidebar />} />
          <Route path='/addnewsidebar' element={<AddNewSidebar />} />
        </ Routes>
      </div>
      
    </Router>
  );
};

export default App;
