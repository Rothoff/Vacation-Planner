import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebarcomponents/Sidebar';
import { BrowserRouter, Routes} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { Employees, AddEmployee } from './pages/Employees';
import {Team, AddTeam } from './pages/Team';

function App() {
  return (
   
    <BrowserRouter>
      <Sidebar/>
        <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employees/addEmployee' element={<AddEmployee/>}/>
        <Route path='/team' element={<Team/>}/>
        <Route path='/team/addTeam' element={<AddTeam/>}/>
        </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
