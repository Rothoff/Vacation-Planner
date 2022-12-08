import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/SidebarComponents/Sidebar.js';
import { BrowserRouter, Routes} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { Leaders } from './pages/Leaders';

import {SprintPlanner} from './pages/SprintPlanner';
function App() {
  return (
   
    <BrowserRouter>
      <Sidebar/>
        <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/leaders' element={<Leaders/>}/>ß
        <Route path='/sprintPlanner' element={<SprintPlanner/>}/>
        </Routes>
    </BrowserRouter>
    
    
  );
}
export default App;