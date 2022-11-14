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

export const getFridayFromWeekNum = (weekNum, year) => {
  const friday = new Date(year, 0, (1 + (weekNum ) * 7));
  while (friday.getDay() !== 5) {
    friday.setDate(friday.getDate() - 1);
  }
  return friday;
}

console.log(getFridayFromWeekNum(51,2022))


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
  var year = new Date().getFullYear();
  const { team } = props;
  const { week } = props;
  let backFromVacation = <WestIcon sx={{ color: 'blue' }} />
  let goingOnVacation = <EastIcon sx={{ color: 'red' }} />
  const [employeesOnVacation, setEmployeesOnVacation] = useState([]);
  const collection = [];




  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployeesOnVacation(result);
      }
      )
  }, [])

  function employeesOnvacationInTeam(weekID, teamID) {
    const empsOnVacation = [];
    employeesOnVacation.map(employeesOnVacationFullWeek => {
      if (employeesOnVacationFullWeek.week_number === weekID && employeesOnVacationFullWeek.employee.team.id === teamID && (employeesOnVacationFullWeek.text.includes("x") || employeesOnVacationFullWeek.text.includes("X"))) {
        empsOnVacation.push([employeesOnVacationFullWeek.employee.first_name + employeesOnVacationFullWeek.employee.last_name])
      }
    })
    return empsOnVacation;
  }

  function employeesOnVacationLastWeek(teamID, weekNumber) {
    const names = employeesOnvacationInTeam((weekNumber - 1), teamID).filter(item => !employeesOnvacationInTeam(weekNumber, teamID).includes(item))
    return names;
  }


  function employeesOnVacationNextWeek(teamID, weekId) {
    const names = employeesOnvacationInTeam((weekId + 1), teamID).filter(item => !employeesOnvacationInTeam(weekId, teamID).includes(item))
    return names;
  }
  var dateOnVacation = 0;
  var dateBackFromVacation = 0;
  var monthOnVacation = 0;
  var dayOnVacation = 0;
  var dayBackFromVacation = 0;

  employeesOnVacation.map(employeesInVacationTable => {
   
    var textColumnInTable = employeesInVacationTable.text;
    var name = employeesInVacationTable.employee.first_name + employeesInVacationTable.employee.last_name;
   
    const sunday = getSundayFromWeekNum(employeesInVacationTable.week.week_number, year);
    sunday.setDate(sunday.getDate())
    const monday = new Date(sunday);
    monday.setDate(monday.getDate() - 6)

    monthOnVacation = getFridayFromWeekNum((week), year);
    const splitFirstDate = textColumnInTable.split(/[-,:e?" "]/)[0]
    const splitSecondDate = textColumnInTable.split(/[-,:e?" "]/).pop()
    var satDate = new Date(year, (monthOnVacation.getMonth()), (monthOnVacation.getDate() + 1))
    var saturday = satDate.getFullYear() + "-" + (satDate.getMonth() + 1) + "-" + satDate.getDate();


    if (employeesInVacationTable.week.week_number === week && employeesInVacationTable.employee.team.id === team) {
      if ((!textColumnInTable.includes("x") && !textColumnInTable.includes("X")) && !textColumnInTable.includes("Mngr") && !textColumnInTable.includes("mngr") && !textColumnInTable.includes("PO")) {
        if (textColumnInTable.includes("-") || textColumnInTable.includes(",") || textColumnInTable.includes(":e") || textColumnInTable.includes("?") || textColumnInTable.includes(" ")) {
          dayOnVacation = new Date(year, (monthOnVacation.getMonth()), splitFirstDate)
          if (splitSecondDate.length === 0) {
            dayBackFromVacation = new Date(year, (monthOnVacation.getMonth()), (dayOnVacation.getDate() + 1))
            dateOnVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
            dateBackFromVacation = dayBackFromVacation.getFullYear() + "-" + (dayBackFromVacation.getMonth()) + "-" + dayBackFromVacation.getDate();
              if (dateBackFromVacation === saturday) {
                collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
                  } else {
                  collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
                  collection.push(createData([name], [backFromVacation], [dateBackFromVacation]))
                }
          } else {
            dayBackFromVacation = new Date(year, (monthOnVacation.getMonth()), splitSecondDate)
            dateOnVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
            dateBackFromVacation = dayBackFromVacation.getFullYear() + "-" + (dayBackFromVacation.getMonth() + 1) + "-" + (dayBackFromVacation.getDate() + 1);
            if (dateBackFromVacation === saturday) {
              collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
            } else {
              if (dayOnVacation.getDate() > dayBackFromVacation.getDate())
                dateBackFromVacation = dayBackFromVacation.getFullYear() + "-" + (dayBackFromVacation.getMonth()) + "-" + (dayBackFromVacation.getDate());
              collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
              collection.push(createData([name], [backFromVacation], [dateBackFromVacation]))
            }
          }
        } else {
          dayOnVacation = new Date(getDateOfWeek((week + 1), year, textColumnInTable));
          dayBackFromVacation = new Date(getDateOfWeek((week + 1), year, (textColumnInTable + 1)));
          dateOnVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
          dateBackFromVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + (dayOnVacation.getDate() + 1);
          if (dateBackFromVacation === saturday) {
            collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
          } else {
            collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
            collection.push(createData([name], [backFromVacation], [dateBackFromVacation]))
          }
        }
      } else if ((textColumnInTable.includes("x") || textColumnInTable.includes("X")) && !textColumnInTable.includes("Mngr") && !textColumnInTable.includes("mngr") && !textColumnInTable.includes("PO")) {
        if (week === 1) {
          dayOnVacation = new Date(monday)
          dateOnVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
          collection.push(createData([name], [goingOnVacation], [dateOnVacation]))
        }
      }
    }
    year = new Date().getFullYear();
    return collection;
  })
  
  employeesOnVacationLastWeek(team, week).map(lw => {
    if (!(employeesOnVacationLastWeek(team, week).length === 0)) {
      const sunday = getSundayFromWeekNum((week), year);
      const monday = new Date(sunday);
      monday.setDate(monday.getDate() - 6)
      dayOnVacation = new Date(monday)
      dateBackFromVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
      collection.push(createData([lw], [backFromVacation], [dateBackFromVacation]))
    }
    return collection;
  })
  employeesOnVacationNextWeek(team, week).map(nw => {
    if (!(employeesOnVacationNextWeek(team, week).length === 0)) {
      const sunday = getSundayFromWeekNum(week, year);
      const friday = new Date(sunday);
      friday.setDate(friday.getDate() - 2)
      dayOnVacation = new Date(friday)
      dateBackFromVacation = dayOnVacation.getFullYear() + "-" + (dayOnVacation.getMonth() + 1) + "-" + dayOnVacation.getDate();
      collection.push(createData([nw], [goingOnVacation], [dateBackFromVacation]))
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