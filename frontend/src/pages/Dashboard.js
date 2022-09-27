import React from 'react';
import TeamBoxes from '../components/Boxes/TeamBoxes';
import StapleChart from '../components/Chartcomponents/StapleChart';
import Selectlabels from '../components/Selectbar/Selectlabels';



const Dashboard = () => {
  return (
    <div className='dashboard'>
          <StapleChart/>
          <Selectlabels/>
          <TeamBoxes/>
    </div>
    
  );
};

export default Dashboard;