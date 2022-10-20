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
  const sunday = new Date(year, 0, (1 + (weekNum + 1) * 7));
  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
}
export const getSaturdayFromWeekNum = (weekNum, year) => {
  const saturday = new Date(year, 0, (1 + (weekNum + 1) * 7));
  while (saturday.getDay() !== 0) {
    saturday.setDate(saturday.getDate() - 2);
  }
  return saturday;
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
 // const { team } = props;
 // const { week } = props;
  let backFromVacation = <WestIcon sx={{ color: 'blue' }} />
  let goingOnVacation = <EastIcon sx={{ color: 'red' }} />
  const [employees, setEmployees] = useState([]);
  const collection = [];
  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployees(result);
      }
      )
  }, [])
  /**
  function allEmployeesInTeamID(teamID) {
    const [allEmployees, setAllEmployees] = useState([]);
    const employeesInTeam = [];
    useEffect(() => {
      fetch("http://localhost:8080/employee/alls/" + teamID)
        .then(res => res.json())
        .then((allEmployeesResult) => {
          setAllEmployees(allEmployeesResult);
        }
        )
    }, [])
    allEmployees.map(emp => {
      employeesInTeam.push(emp)
    })
    return employeesInTeam;
  }*/
  function employeesOnvacationInTeam(weekID, teamID) {
    const employeesOnVacation = [];
    employees.map(emps1 => {
      if (emps1.week.id === weekID && emps1.employee.team.id === teamID && (emps1.text.includes("x") || emps1.text.includes("X"))) {
        employeesOnVacation.push(emps1.employee.first_name + emps1.employee.last_name)
      }
    })
    return employeesOnVacation;
  }
  function employeesOnVacationLastWeek(teamID, weekId) {
    const names = employeesOnvacationInTeam((weekId - 1), teamID).filter(item => !employeesOnvacationInTeam(weekId, teamID).includes(item))
    return names;
  }
  function employeesOnVacationNextWeek(teamID, weekId) {
    const names = employeesOnvacationInTeam((weekId + 1), teamID).filter(item => !employeesOnvacationInTeam(weekId, teamID).includes(item))
    return names;
  }
  var team = 5;
  var week = 11;
  var dateOff = 0;
  var dateBack = 0;
  var month = 0;
  var dayOff = 0;
  var dayBack = 0;
  employees.map(emps2 => {
    var text = emps2.text;
    if (emps2.week.id === week && emps2.employee.team.id === team) {
      if ((!text.includes("x") && !text.includes("X")) && !text.includes("Mngr") && !text.includes("mngr") && !text.includes("PO")) {
        if (text.includes("-") || text.includes(",") || text.includes(":e") || text.includes("?") || text.includes(" ")) {
          const afterSplitFirstDate = text.split(/[-,:e?" "]/)[0]
          const afterSplitSecondDate = text.split(/[-,:e?" "]/).pop()
          month = getSundayFromWeekNum(emps2.week.week_number, 2022);
          var satDate = new Date(2022, (month.getMonth()), (month.getDate() - 1))
          var saturday = satDate.getFullYear() + "-" + (satDate.getMonth() + 1) + "-" + satDate.getDate();
          dayOff = new Date(2022, (month.getMonth()), afterSplitFirstDate)
          if(afterSplitSecondDate.length === 0){
            dayBack = new Date(2022, (month.getMonth()), dayOff.getDate() + 1)
            dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
            dateBack = dayBack.getFullYear() + "-" + (dayBack.getMonth() + 1) + "-" + dayBack.getDate();
            if(dateBack === saturday) {
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
            } else {
            collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
            collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [backFromVacation], [dateBack]))
            }
          } else {
          dayBack = new Date(2022, (month.getMonth()), afterSplitSecondDate)
          dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
          dateBack = dayBack.getFullYear() + "-" + (dayBack.getMonth() + 1) + "-" + (dayBack.getDate());
          if(dateBack === saturday) {
            collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
          } else {
            if(dayOff.getDate() > dayBack.getDate())
            dateBack = dayBack.getFullYear() + "-" + (dayBack.getMonth() + 2) + "-" + (dayBack.getDate());
          collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
          collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [backFromVacation], [dateBack]))
          }
          }
        } else {
          month = getSundayFromWeekNum(emps2.week.week_number, 2022);
          satDate = new Date(2022, (month.getMonth()), (month.getDate() - 1))
          saturday = satDate.getFullYear() + "-" + (satDate.getMonth() + 1) + "-" + satDate.getDate();
          dayOff = new Date(2022, (month.getMonth()), text)
          dayBack = new Date(2022, (month.getMonth() + 1), text + 1)
          dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1)+ "-" + dayOff.getDate();
          dateBack = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1)+ "-" + (dayOff.getDate() + 1);
            if(dateBack === saturday) {
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
                }  else {
                  collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
                  collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [backFromVacation], [dateBack]))
            }
         }
      }
      if ((text.includes("x") || text.includes("X")) && !text.includes("Mngr") && !text.includes("mngr") && !text.includes("PO")) {
        console.log(emps2.employee.first_name + emps2.employee.last_name + " Ledig denna vecka  " + emps2.text)
        if (week === 1) {
          const sunday = getSundayFromWeekNum(emps2.week.week_number, 2022);
          const monday = new Date(sunday);
          monday.setDate(monday.getDate() - 6)
          dayOff = new Date(monday)
          dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
          collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
        }
      }
    }
    return collection;
  })
  employeesOnVacationLastWeek(team, week).map(NW => {
    if ((!employeesOnVacationLastWeek(team, week).length === 0)) {
      const sunday = getSundayFromWeekNum(week + 14, 2022);
      const monday = new Date(sunday);
      monday.setDate(monday.getDate() - 6)
      dayOff = new Date(monday)
      dateBack = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
      collection.push(createData([NW], [backFromVacation], [dateBack]))
    }
    return collection;
  })
  employeesOnVacationNextWeek(team, week).map(LW => {
    if (!(employeesOnVacationNextWeek(team, week).length === 0)) {
      const sunday = getSundayFromWeekNum(week + 14, 2022);
      const friday = new Date(sunday);
      friday.setDate(friday.getDate() - 2)
      dayOff = new Date(friday)
      dateBack = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
      collection.push(createData([LW], [goingOnVacation], [dateBack]))
    }
    return collection;
  })
  return (
    <div className='center'>
      <TableContainer component={Paper} sx={{ width: 500 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">In or Out</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map((row) => (
              <StyledTableRow key={row.name}>
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
    </div>
  );
}