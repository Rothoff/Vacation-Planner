import React, { useState } from 'react';
import TeamBoxes from '../components/Boxes/TeamBoxes';
import StapleChart from '../components/Chartcomponents/StapleChart';
import Selectlabels from '../components/Selectbar/Selectlabels';
import EmployeesOnVacation from '../components/Chartcomponents/VacationFilter'
import { App } from '../components/Chartcomponents/GoogleChart';

const Dashboard = () => {
  const [team, setTeam] = useState(null);

  const onChangeSelection = (teamId) => {
    setTeam(teamId)
  }

  return (
    <div className='dashboard'>
      <StapleChart/>
          <Selectlabels onChange={onChangeSelection}/>
         <EmployeesOnVacation team={team}/>
    </div>
    
  );
};

export default Dashboard;