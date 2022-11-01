import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/SidebarComponents/Sidebar';
import { BrowserRouter, Routes} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { Employees, AddEmployee } from './pages/Employees';
import {SprintPlanner} from './pages/SprintPlanner';
function App() {
  return (
   
    <BrowserRouter>
      <Sidebar/>
        <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employees/addEmployee' element={<AddEmployee/>}/>
        <Route path='/sprintPlanner' element={<SprintPlanner/>}/>
        </Routes>
    </BrowserRouter>
    
    
  );
}
export default App;