import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const SelectEmployeeTeam = ({ onChange }) => {
  const [team, setTeam] = useState('');
  const [allEmployees, setAllEmployees] = useState([])
  const [employeeName, setEmployeeName] = useState('');
  const [results, setResults] = useState([])
  const listOfEmployees = [];
  const [employees, setEmployees] = useState([]);
  const collection = [];


  let filterResults = [];


  const getSundayFromWeekNum = (weekNum, year) => {
    const sunday = new Date(year, 0, (1 + (weekNum + 1) * 7));
    while (sunday.getDay() !== 0) {
      sunday.setDate(sunday.getDate() - 1);
    }
    return sunday;
  }

  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
  };

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}




  /*-----*/
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'green',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
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

  function createData(week, employeeName, capacity) {
    return { week, employeeName, capacity };
  }

  useEffect(() => {
    fetch("http://localhost:8080/employee/all")
      .then(res => res.json())
      .then((allEmployeesResult) => {
        setAllEmployees(allEmployeesResult);
      }
      )
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployees(result);
      }
      )
  }, [])



  const startDate = new Date(2022, 5, 17);
  const endDate = new Date(2022, 5, 30);

  var startDateWeekNumber = startDate.getWeek();
  var endDateWeekNumber = endDate.getWeek();

  useEffect(() => {

    filterResults = (employees.filter(result => result.employee.team.id === team));
    filterResults = (filterResults.filter(results => results.week.week_number >= startDateWeekNumber && results.week.week_number <= endDateWeekNumber));
    setResults(filterResults)

  }, [team])

    let weekCapacity = "";
    let totalDaysOfweek = null;
    let vacDaysForWeek = null;
  
    const numbOfSprints = 4;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    let empId1 = "";
  results.map(emps2 => {
    const empId2 = emps2.employee.id;
    const weekNr = emps2.week.week_number;
    const text = emps2.text;
    const sundayAsDate = getSundayFromWeekNum(weekNr,2022);
    const sundayAsNumber = sundayAsDate.getDate()-1;
    const mondayAsDate = new Date(sundayAsDate);
    mondayAsDate.setDate(mondayAsDate.getDate() - 7)
    const mondayAsNumber = mondayAsDate.getDate();

    
    console.log("ID 1: ", empId1)
    console.log("ID 2: ", empId2)
    if (empId1 != empId2){
      vacDaysForWeek = 0;
    }

    if (isNaN(text)) {
      if (text.includes("x") || text.includes("X")) {
        if (startDate.getDate() > sundayAsNumber-6 && startDate.getMonth() > (mondayAsDate.getMonth())){
        vacDaysForWeek += sundayAsNumber - startDate.getDate();
        } else if(endDate.getMonth() < sundayAsDate.getMonth()){
          vacDaysForWeek += endDate.getDate() - mondayAsNumber
        }else if(startDate.getDate()>mondayAsNumber){
          vacDaysForWeek += (sundayAsNumber)-startDate.getDate();
        }
        else{
          vacDaysForWeek += sundayAsNumber-(sundayAsNumber-5);
        } 
      }
    } else {

    }
   
    
    collection.push(createData([weekNr], [emps2.employee.first_name + emps2.employee.last_name], [vacDaysForWeek]))
    empId1 = empId2;
    return collection;

  });



  /*------*/




  const handleChange = (event) => {
    setTeam(event.target.value);

    return team;
  };


  return (
    <div id="team-employee-add-column">

      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel id="team-selector" >Team</InputLabel>
        <Select
          labelId="team-selector"
          id="team-selector"
          defaultValue={null}
          value={team}

          label="Team"
          onChange={handleChange}
        >
          <MenuItem value={null} className='center'>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Sipa</MenuItem>
          <MenuItem value={2}>Wild</MenuItem>
          <MenuItem value={3}>Em</MenuItem>
          <MenuItem value={4}>Arch</MenuItem>
          <MenuItem value={5}>Bull</MenuItem>
          <MenuItem value={6}>Hos</MenuItem>
          <MenuItem value={7}>Gama</MenuItem>
          <MenuItem value={8}>Jazz</MenuItem>
          <MenuItem value={9}>HoPD</MenuItem>
          <MenuItem value={10}>Best</MenuItem>
          <MenuItem value={11}>Wolf</MenuItem>
          <MenuItem value={12}>Edge</MenuItem>
          <MenuItem value={13}>Po</MenuItem>
        </Select>

      </FormControl>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ width: '40' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Week</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Capacity</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map((row) => (
              <StyledTableRow >
                <StyledTableCell align="center">{row.week}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.employeeName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.capacity}</StyledTableCell>

              </StyledTableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="success"
        value="2"
      >
        add
      </Button>


    </div>
  );
}
export default SelectEmployeeTeam;