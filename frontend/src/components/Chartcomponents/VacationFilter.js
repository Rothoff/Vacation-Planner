import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Paper, Button } from '@mui/material';
import { Chart } from "react-google-charts";

const getSundayFromWeekNum = (weekNum, year) => {
  const sunday = new Date(year, 0, (1 + (weekNum - 1) * 7));
  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate()-1);
  }
  return sunday;
}

console.log(getSundayFromWeekNum(10, 2021))

export const data = [
  [
    { type: "string", id: "name" },
    { type: "string", id: "text" },
    { type: "date", id: "start" },
    { type: "date", id: "end" },
  ],
 
];

function EmployeesOnVacation(props) {
  const { team } = props;
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

  const [employees, setEmployees] = useState([])
  const [results, setResults] = useState([])
  const collection = []

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



  {results.map(emps => {
    collection.push([emps.employee.first_name, emps.text, new Date(2022, 6, 7),  new Date(2022, 6, 9) ])
  })
  }

  return (
<div class = "center"><Chart chartType="Timeline" data={collection} width="90%" height="400px"/>
  </div>
 
  );

}

export default EmployeesOnVacation;

