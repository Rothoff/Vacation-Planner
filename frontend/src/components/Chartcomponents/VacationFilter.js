import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Paper, Button } from '@mui/material';

function EmployeesOnVacation(props) {
  const { team } = props;
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

  const [employees, setEmployees] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployees(result);
      }
      )
  }, [])


  useEffect(() => {

    const filterResults = (employees.filter(o => o.employee.team.id === team));
    setResults(filterResults);
    results.map(names => console.log(names.employee.first_name));
  }, [team]) // <-- here put the parameter to listen

  let ids = 0;

  return (

    <Container>


      <Paper elevation={3} style={paperStyle}>

        {results.map(emps => {
          return <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={ids++}>
            Week:{emps.week.week_number}<br />
            Name:{emps.employee.first_name + " " + emps.employee.last_name}<br />
            Text:{emps.text}<br />
            Team:{emps.employee.team.team_name}
          </Paper>
        })
        }
      </Paper>


    </Container>
  );

}



export default EmployeesOnVacation;

