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

function getDateOfWeek(w, y, d) {
  let date = new Date(y, 0, (1 + (w - 1) * 7)); // Elle's method
  date.setDate(d); // 0 - Sunday, 1 - Monday etc
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
  const { team } = props;
  const { week } = props;
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
  var dateOff = 0;
  var dateBack = 0;
  var month = 0;
  var dayOff = 0;
  var dayBack = 0;


  employees.map(emps2 => {
    var text = emps2.text;
    const sunday = getSundayFromWeekNum(emps2.week.week_number, 2022);
    sunday.setDate(sunday.getDate() + 1)
    const monday = new Date(sunday);
    monday.setDate(monday.getDate() - 7)
    if (emps2.week.id === week && emps2.employee.team.id === team) {
      if ((!text.includes("x") && !text.includes("X")) && !text.includes("Mngr") && !text.includes("mngr") && !text.includes("PO")) {
        if (text.includes("-") || text.includes(",") || text.includes(":e") || text.includes("?") || text.includes(" ")) {
          const afterSplitFirstDate = text.split(/[-,:e?" "]/)[0]
          const afterSplitSecondDate = text.split(/[-,:e?" "]/).pop()
          month = getSundayFromWeekNum((week + 14), 2022);
          var satDate = new Date(2022, (month.getMonth()), (month.getDate() - 1))
          var saturday = satDate.getFullYear() + "-" + (satDate.getMonth()) + "-" + satDate.getDate();
          dayOff = new Date(2022, (month.getMonth()), afterSplitFirstDate)
          if (afterSplitSecondDate.length === 0) {
            dayBack = new Date(2022, (month.getMonth()), (dayOff.getDate() + 1))
            dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth()) + "-" + dayOff.getDate();
            dateBack = dayBack.getFullYear() + "-" + (dayBack.getMonth()) + "-" + dayBack.getDate();
            if (dateBack === saturday) {
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
            } else {
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [backFromVacation], [dateBack]))
            }
          } else {
            dayBack = new Date(2022, (month.getMonth()), afterSplitSecondDate)
            dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
            dateBack = dayBack.getFullYear() + "-" + (dayBack.getMonth() + 1) + "-" + (dayBack.getDate() + 1);
            if (dateBack === saturday) {
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
            } else {
              if (dayOff.getDate() > dayBack.getDate())
                dateBack = dayBack.getFullYear() + "-" + (dayBack.getMonth() + 2) + "-" + (dayBack.getDate());
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
              collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [backFromVacation], [dateBack]))
            }
          }
        } else {
          month = getSundayFromWeekNum((week + 14), 2022);
          dayOff = new Date(getDateOfWeek((week + 15), 2022, text));
          satDate = new Date(2022, (month.getMonth()), (month.getDate() - 1))
          saturday = satDate.getFullYear() + "-" + (satDate.getMonth() + 1) + "-" + satDate.getDate();
          dayBack = new Date(getDateOfWeek((week + 15), 2022, (text + 1)));
          dateOff = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
          dateBack = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + (dayOff.getDate() + 1);
          if (dateBack === saturday) {
            collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
          } else {
            collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [goingOnVacation], [dateOff]))
            collection.push(createData([emps2.employee.first_name + emps2.employee.last_name], [backFromVacation], [dateBack]))
          }
        }
      } else if ((text.includes("x") || text.includes("X")) && !text.includes("Mngr") && !text.includes("mngr") && !text.includes("PO")) {
        if (week === 1) {
          const sunday = getSundayFromWeekNum((week + 14), 2022);
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
  
  employeesOnVacationLastWeek(team, week).map(lw => {
    if (!(employeesOnVacationLastWeek(team, week).length === 0)) {
      const sunday = getSundayFromWeekNum((week + 14), 2022);
      const monday = new Date(sunday);
      monday.setDate(monday.getDate() - 6)
      dayOff = new Date(monday)
      dateBack = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
      collection.push(createData([lw], [backFromVacation], [dateBack]))
    }
    return collection;
  })
  employeesOnVacationNextWeek(team, week).map(nw => {
    if (!(employeesOnVacationNextWeek(team, week).length === 0)) {
      const sunday = getSundayFromWeekNum(week + 14, 2022);
      const friday = new Date(sunday);
      friday.setDate(friday.getDate() - 2)
      dayOff = new Date(friday)
      dateBack = dayOff.getFullYear() + "-" + (dayOff.getMonth() + 1) + "-" + dayOff.getDate();
      collection.push(createData([nw], [goingOnVacation], [dateBack]))
    }
    return collection;
  })
  return (
      <TableContainer component={Paper}>
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