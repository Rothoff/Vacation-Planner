import React, { useState } from 'react';
import StapleChart from '../components/Chartcomponents/StapleChart';
import Selectlabels from '../components/Selectbar/Selectlabels';
import EmployeesOnVacation from '../components/Chartcomponents/VacationFilter'
import SelectMonth from '../components/Boxes/SelectMonth';
import PieChart from '../components/Chartcomponents/PieChart';


const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [week, setWeek] = useState(null);

  const onChangeSelection = (teamId) => {
    setTeam(teamId)
  }
  const onChangeSelection2 = (weekId) => {
    setWeek(weekId)
  }

  return (
    <div className='dashboard'>
      <StapleChart/>
          <Selectlabels onChange={onChangeSelection}/>
          <SelectMonth onChange={onChangeSelection2}/>
         <EmployeesOnVacation team={team}/>
         <PieChart week={week} team={team}/>
    </div>
    
  );
};

export default Dashboard;