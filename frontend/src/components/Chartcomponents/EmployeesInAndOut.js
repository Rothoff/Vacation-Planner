import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

export const getSundayFromWeekNum = (weekNum, year) => {
  var sunday = 0;

  if (weekNum <= 2) {
    sunday = new Date(year, 0, (1 + (weekNum + 1) * 7));
  } else {
    sunday = new Date(year, 0, (1 + (weekNum) * 7));
  }
  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
}

export const getFridayFromWeekNum = (weekNum, year) => {
  const friday = new Date(year, 0, (1 + (weekNum ) * 7));
  while (friday.getDay() !== 5) {
    friday.setDate(friday.getDate() - 1);
  }
  return friday;
}

function getMondayfromWeekAndYear(w, y) {
  let date = new Date(y, 0, (1 + (w) * 7));
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() - 1);
  }
  return date
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function createData(name, inOrOut, date) {
  return { name, inOrOut, date };
}
export default function CustomizedTables(props) {
  var year = new Date().getFullYear();
  const { team } = props;
  const { week } = props;
  let backFromVacation = <WestIcon sx={{ color: 'blue' }} />
  let goingOnVacation = <EastIcon sx={{ color: 'red' }} />
  const [employeesOnVacation, setEmployeesOnVacation] = useState([]);
  const collection = [];
  var dateBackFromVacation = 0;
  var monthOnVacation = 0;
  var dayOnVacation = 0;
  var dayBackFromVacation = 0;

  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployeesOnVacation(result);
      }
      )
  }, [])
  
  function employeesOnvacationInTeam(weekID, teamID) {
    var empsOnVacation = [];
    employeesOnVacation.map(employeesOnVacationFullWeek => {
      if (employeesOnVacationFullWeek.week.week_number === weekID && employeesOnVacationFullWeek.employee.team.id === teamID){
      if (employeesOnVacationFullWeek.text.includes("x") || employeesOnVacationFullWeek.text.includes("X")) {
        empsOnVacation.push(employeesOnVacationFullWeek.employee.first_name + employeesOnVacationFullWeek.employee.last_name)
      }
    }
    })
    return empsOnVacation;
  } 

  function employeesOnVacationLastWeek(teamID, weekNumber) {
    var lastWeekId = weekNumber - 1;
    if (weekNumber == 1) {
      lastWeekId = 52;
    }
    const names = employeesOnvacationInTeam(lastWeekId, teamID).filter(item => !employeesOnvacationInTeam(weekNumber, teamID).includes(item))
    return names;
  }

  function employeesOnVacationNextWeek(teamID, weekId) {
    var nextWeekId = weekId + 1;
    if (weekId === 52){
      nextWeekId = 1;
    } 
    const names = employeesOnvacationInTeam(nextWeekId, teamID).filter(item => !employeesOnvacationInTeam(weekId,team).includes(item))
    return names;
  }

  function checkIfSaturday(year, week, day){
   var month = getFridayFromWeekNum(week, year);
    var satDate = new Date(year, (month.getMonth()), (month.getDate() + 1))
    
    if (day === satDate.getDate()){
      return true;
    } else {
      return false;
    }
  }

  function checkIfTurnOfTheMonth(startDate, endDate){
    if(startDate > endDate){
      return true;
    } else {
      return false;
    }
  }

  function checkWhatYear(startDateOfweek,endDateOfWeek, goingOnVacationDate, backFromVacationDate){
    const startYear = startDateOfweek.split(/[-]/)[0];
    const endYear = endDateOfWeek.split(/[-]/)[0];
    var year = 0;

    if (startYear === endYear){
      year = startYear;
    } else if (goingOnVacationDate > backFromVacationDate && endYear > startYear){
      year = endYear;
    }
    return year;
  }

  function goingOnVacationDate(goingOnVacationDate, backFromVacationDate,startDateOfweek, endDateOfWeek){
    const startYear = startDateOfweek.split(/[-]/)[0];
    var startMonth = startDateOfweek.split(/[-]/)[1];
    var startDay = startDateOfweek.split(/[-0]/)[2]

    const endYear = endDateOfWeek.split(/[-]/)[0];
    const endMonth = endDateOfWeek.split(/[-0]/)[1];

   /* if (startMonth.includes("0")) {
      startMonth = startMonth.substring(1);
    } if (startDay.includes("0")){
      startDay = startDay.substring(1);
    }*/

    var finalDate = 0;

    if(goingOnVacationDate < backFromVacationDate && goingOnVacationDate >= startDay){
      finalDate =  startYear + "-" + startMonth + "-" + goingOnVacationDate
    } else if(goingOnVacationDate < backFromVacationDate && goingOnVacationDate < startDay){
        finalDate = endYear + "-" + endMonth + "-" + goingOnVacationDate
    } else if(goingOnVacationDate > backFromVacationDate && goingOnVacationDate >= startDay){
      finalDate =  startYear + "-" + startMonth + "-" + goingOnVacationDate
    }
    return finalDate;
  }
  
  function backFromVacationDate(goingOnVacationDate, backFromVacationDate,startDateOfweek, endDateOfWeek){
    const startYear = startDateOfweek.split(/[-]/)[0];
    var startMonth = startDateOfweek.split(/[-]/)[1];

    const endYear = endDateOfWeek.split(/[-]/)[0];
    var endMonth = endDateOfWeek.split(/[-]/)[1];

   /* if (startMonth.includes("0")) {
      startMonth = startMonth.substring(1);
    } if (endMonth.includes("0")){
      endMonth = endMonth.substring(1);
    }*/

    var finalDate = 0;

    if(checkIfTurnOfTheMonth(goingOnVacationDate,backFromVacationDate)){
        finalDate = endYear + "-" + endMonth + "-" + backFromVacationDate
    } else {
      finalDate = startYear + "-" + startMonth + "-" + backFromVacationDate
    }
    return finalDate;
  }  

  function vacationForOneDay(week,goingOnVac,name, startDate, endDate){
    const dateGo = parseInt(goingOnVac);
    const dateBack = dateGo + 1;
    let dateBackFromVacation = 0;
    let dateOnVacation = 0;
    let year = checkWhatYear(startDate,endDate,dateGo,dateBack);

    monthOnVacation = getFridayFromWeekNum((week), year);
    dayOnVacation = new Date(year, (monthOnVacation.getMonth()), dateGo)
    dayBackFromVacation = new Date(year, (monthOnVacation.getMonth()), dateBack)

    dateOnVacation = goingOnVacationDate(dayOnVacation.getDate(), dayBackFromVacation.getDate(), startDate, endDate)
    dateBackFromVacation = backFromVacationDate(dayOnVacation.getDate(), dayBackFromVacation.getDate(), startDate, endDate)
    
    if (checkIfSaturday(year, week, dayBackFromVacation.getDate())) {
      collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
    } else {
      collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
      collection.push(createData([name], [backFromVacation], [dateBackFromVacation]))
    }  
  }

  function vacationForMoreThanOneDay( week, goingOnVac, backDate,name, startDate, endDate){
    const dateGo = parseInt(goingOnVac);
    const dateBack = parseInt(backDate);
    let dateBackFromVacation = 0;
    let dateOnVacation = 0;
    let year = checkWhatYear(startDate,endDate,dateGo,dateBack);

    monthOnVacation = getFridayFromWeekNum((week), year);
    dayOnVacation = new Date(year, monthOnVacation.getMonth(), dateGo);
    dayBackFromVacation = new Date(year, monthOnVacation.getMonth(), (dateBack + 1));

    dateOnVacation = goingOnVacationDate(dayOnVacation.getDate(), dayBackFromVacation.getDate(), startDate, endDate)
    dateBackFromVacation = backFromVacationDate(dayOnVacation.getDate(), dayBackFromVacation.getDate(), startDate, endDate)

    if (checkIfSaturday(year, week, dayBackFromVacation.getDate())) {
      collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
    } else {
      collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
      collection.push(createData([name], [backFromVacation], [dateBackFromVacation]))
    }
  }

  function checkIfIncludes(text){
    const conditions = ["-", ",", ":e", ",","?", " "];
    const checkConditions = conditions.some(el => text.includes(el));
    if(checkConditions){
      return true;
    } else {
      return false;
    }
  }

  function checkIfVacationDiffTimess(text) {
    var splitText = text.split(/[,]/);
    
    for (let i = 0; i < splitText.length - 1; i++) {
      if ((parseInt(splitText[i]) + 1) == parseInt(splitText[i + 1])) {
        return false;
      } else {
        return true;
      }
    }
  }

function vacationTwoDiffTimes(text,name, week, startDate,endDate) {
      var tex = text.split(/[,-]/)
      var dateGo = 0;
      var dateBack = 0;
      if(tex.length > 2 )
      for (let index = 0; index < (tex.length - 1); index++) {
        if((parseInt(tex[index]) + 1) == parseInt(tex[index + 1])){
          dateGo = tex[index];
          dateBack = tex[index + 1];
          vacationForMoreThanOneDay(week,dateGo,dateBack, name, startDate,endDate)
        } else {
          dateGo = tex[index];
          vacationForOneDay(week,dateGo, name, startDate, endDate)
      }
    }
  }

  employeesOnVacation.map(employeesInVacationTable => {
    var textColumnInTable = employeesInVacationTable.text;
    var name = employeesInVacationTable.employee.first_name + employeesInVacationTable.employee.last_name;
    let splitFirstDate = textColumnInTable.split(/[-,:e?" "]/)[0]
    let splitSecondDate = textColumnInTable.split(/[-,:e?" "]/).pop()

    if (employeesInVacationTable.week.week_number === week && employeesInVacationTable.employee.team.id === team) {
      if (checkIfVacationDiffTimess(employeesInVacationTable.text)) {
       vacationTwoDiffTimes(employeesInVacationTable.text, name, week, employeesInVacationTable.week.start_date, employeesInVacationTable.week.end_date)
      }
      if (checkIfIncludes(textColumnInTable) && !(splitSecondDate.length === 0) && !(checkIfVacationDiffTimess(employeesInVacationTable.text)) ) {   
        vacationForMoreThanOneDay(week,splitFirstDate,splitSecondDate,name, employeesInVacationTable.week.start_date, employeesInVacationTable.week.end_date);
        } else if(!(isNaN(textColumnInTable))) {
            vacationForOneDay(week,textColumnInTable,name, employeesInVacationTable.week.start_date, employeesInVacationTable.week.end_date);
      } 
    } 
  })

  employeesOnVacationLastWeek(team, week).map(lw => {
    if (!(employeesOnVacationLastWeek(team, week).length === 0)) {
      var weekNumberThisWeek = week;
      var weekNumberLastWeek = 0;
      var year = 0;
      if (weekNumberThisWeek === 1) {
        weekNumberLastWeek = 52;
      } else {
       weekNumberLastWeek = week - 1;
      }
      if(weekNumberThisWeek < weekNumberLastWeek || weekNumberThisWeek <= 3){
        year = new Date().getFullYear() + 1;
      } else {
        year = new Date().getFullYear();
      }
      
      const monday = getMondayfromWeekAndYear(week, year);
      dayOnVacation = new Date(monday)

      dateBackFromVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
      collection.push(createData([lw], [backFromVacation], [dateBackFromVacation]))
    }
  })

  employeesOnVacationNextWeek(team, week).map(nw => {
    if (!(employeesOnVacationNextWeek(team, week).length === 0)) {
      var weekNumberThisWeek = week;
      var weekNumberNextWeek = 0;
      var year = 0;

      if (weekNumberThisWeek === 52) {
        weekNumberNextWeek = 1;
      } 
      if(weekNumberThisWeek < weekNumberNextWeek){
        year = new Date().getFullYear() + 1;
      } else {
        year = new Date().getFullYear();
      }
      const friday = getFridayFromWeekNum(week, year);
      dayOnVacation = new Date(friday)
      dateBackFromVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
      collection.push(createData([nw], [goingOnVacation], [dateBackFromVacation]))
    }

  })
  return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map((row) => (
              <StyledTableRow >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.inOrOut}</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}