import React, { useState } from 'react';
import StapleChart from '../components/Chartcomponents/StapleChart';
import Selectlabels from '../components/Selectbar/Selectlabels';
import EmployeesOnVacation from '../components/Chartcomponents/VacationFilter'
import SelectMonth from '../components/Selectbar/SelectMonth';
import PieChart from '../components/Chartcomponents/PieChart';
import EmployeesInAndOut from '../components/Chartcomponents/EmployeesInAndOut';


const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [weekId, setWeekId] = useState(null);
  const [month, setMonth] = useState(null);
  const [vacDays, setVacDays] = useState(null);

  const onChangeSelection = (teamId) => {
    setTeam(teamId)
  }
  const onChangeSelection2 = (weekId, monthId) => {
    setWeekId(weekId)
    setMonth(monthId)
  }

  const onChangeSelection3 = (vacDays) => {
    setVacDays(vacDays)
  }

  return (
    <div className='dashboard'>
      <StapleChart />
      <Selectlabels onChange={onChangeSelection} />
      <SelectMonth onChange={onChangeSelection2} />
      <EmployeesOnVacation onChange={onChangeSelection3} team={team} weekId={weekId} month={month} />
      <PieChart week={weekId} team={team} month={month} vacDays={vacDays} />
      <EmployeesInAndOut week={weekId} team={team}/>
    </div>

  );
};

export default Dashboard;