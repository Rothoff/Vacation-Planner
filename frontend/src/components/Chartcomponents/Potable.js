import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'blue',
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

function createData(week, name, text) {
  return { week, name, text};
}

export default function CustomizedTables() {
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

  employees.map(emps2 => {
    var text = emps2.text;
    
    if (text.includes("PO") || text.includes("po")) {
        var weekNr = emps2.week.id + 14
        collection.push(createData([ weekNr], [emps2.employee.first_name + emps2.employee.last_name], [emps2.employee.team.team_name]))
        collection.sort((a,b) => parseFloat (a.week) - parseFloat(b.week))
        return collection;
    }
   
   return null;
  });
  return (
    <TableContainer component={Paper} sx={{width:'100%'}}>
      <Table sx={{width:'40'}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Week</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collection.map((row) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {row.week}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.text}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}