import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Paper, Button } from '@mui/material';
import { Chart } from "react-google-charts";
import { ClassSharp } from '@mui/icons-material';

export const getSundayFromWeekNum = (weekNum, year) => {
  const sunday = new Date(year, 0, (1 + (weekNum + 1) * 7));
  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
}


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
  }, [team]) // <-- here put the parameter to listen

  /* First row doesnt show for some reason */
  collection.push(['first row', 'Vacation', new Date(2021, 3, 1), new Date(2022, 5, 4)],)

  {
    results.map(emps => {
      const sunday = getSundayFromWeekNum(emps.week.week_number, 2022);
      console.log(emps.employee.first_name);
      const monday = new Date(sunday);
      monday.setDate(monday.getDate() - 6)
      var text = emps.text;
      if (!text.includes(",") && !text.includes("-") && !text.includes("Mngr")) {
        if (isNaN(text)) {
          if (text = "X" || "x") {
            text = "vac"
          }
        } else {
          sunday.setDate(text)
          monday.setDate(text)
          if (monday.getMonth() == sunday.getMonth()) {
          } else {
            sunday.setMonth(monday.getMonth())
          }
        }
      } else if (text.includes("Mngr")) {
        text = "Mngr"
      } else {
        const afterSplitFirstDate = text.split(/[-,:e?" "]/)[0]
        const afterSplitSecondDate = text.split(/[-,:e?" "]/).pop()
        sunday.setDate(afterSplitSecondDate);
        if (!afterSplitSecondDate == "") {
          if (afterSplitFirstDate == "") {
            monday.setDate(afterSplitSecondDate);
            sunday.setMonth(monday.getMonth());
          } else if (afterSplitSecondDate < afterSplitFirstDate) {
            monday.setDate(afterSplitFirstDate);
            sunday.setMonth(monday.getMonth() + 1);
            sunday.setDate(afterSplitSecondDate);
          } else {
            monday.setDate(afterSplitFirstDate);
            if (monday.getMonth() != sunday.getMonth()) {
               monday.setMonth(sunday.getMonth());
             
            }
          }
        } else {
          monday.setDate(afterSplitSecondDate);
        }
      }

      collection.push([emps.employee.first_name, text, monday, sunday])
    })
  }


  return (
    <div id="parentChart">
      <div></div>
      <div id="googleChart"><Chart chartType="Timeline" data={collection} width="90%" height="400px" />
      </div>
      <div></div>
    </div>
  );

}

export default EmployeesOnVacation;

