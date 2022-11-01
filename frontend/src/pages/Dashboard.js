import React, { useState } from 'react';
import StapleChart from '../components/ChartComponents/StapleChart';
import Selectlabels from '../components/Selectbar/SelectTeam';
import EmployeesOnVacation from '../components/ChartComponents/VacationCalendar'
import SelectMonth from '../components/Selectbar/SelectMonth';
import PieChart from '../components/ChartComponents/PieChart';
import EmployeesInAndOut from '../components/ChartComponents/EmployeesInAndOut';


const Dashboard = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [team, setTeam] = useState(null);
  const [weekId, setWeekId] = useState(null);
  const [month, setMonth] = useState(null);
  const [vacDays, setVacDays] = useState(null);

  const onChangeSelection = (teamId, employeeName) => {
    setTeam(teamId)
    setEmployeeName(employeeName)
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
      <div id="topDiv">
        <StapleChart onChange={onChangeSelection} team={team} />
      </div>
      <div id="middleTopDiv">
        <Selectlabels onChange={onChangeSelection} />
        <SelectMonth onChange={onChangeSelection2} />
      </div>
      <div id="middleBottomDiv">
        <EmployeesOnVacation onChange={onChangeSelection3} team={team} weekId={weekId} month={month} employeeName={employeeName} />
      </div>
      <div id="bottomDiv">
      <div id="pieChartDiv"> <PieChart week={weekId} team={team} month={month} vacDays={vacDays} /></div>
      <div id="inOutDiv"><EmployeesInAndOut week={weekId} team={team} /></div>
      </div>
    </div>

  );
};

export default Dashboard;