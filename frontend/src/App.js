import './App.css';
import Employee from './components/Employee'
import MyAppBar from './components/MyAppbar'
import StapleChart from './components/Chart.jsx'
import React from 'react'

function App() {
  return (
    <div className="App">

      <MyAppBar />
      <StapleChart/>

    </div>
  );
}

export default App;
