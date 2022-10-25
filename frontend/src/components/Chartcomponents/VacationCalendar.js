import React from 'react';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";



export const getSundayFromWeekNum = (weekNum, year) => {
  const sunday = new Date(year, 0, (1 + (weekNum + 1) * 7));
  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
}

export const data = [
  [
    { type: "string", id: 'namez' },
    { type: "string", id: "text" },
    { type: "date", id: "start" },
    { type: "date", id: "end" },
  ],
];

const EmployeesOnVacation = (props) => {
  const { team, weekId, month, employeeName} = props;
  const [employees, setEmployees] = useState([])
  const [results, setResults] = useState([])
  const [allEmployeesResult, setAllEmployeesResult] = useState([])
  const [allEmployees, setAllEmployees] = useState([])
  const [vacDays, setVacDays] = useState('')
  const collection = []
  const empsNamesArr = [];
  const onVacationArr = [];
  const { onChange } = props;
  

  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployees(result);
      }
      )
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/employee/all")
      .then(res => res.json())
      .then((allEmployeesResult) => {
        setAllEmployees(allEmployeesResult);
      }
      )
  }, [])

  useEffect(() => {
    if (employeeName === null) {
      const filterResults = (employees.filter(result => result.employee.team.id === team));
      setResults(filterResults);
    } else {
      let firstName = employeeName.split(" ")[0] + (" ")
      let lastName = employeeName.split(" ")[1]
      const filterResults2 = (employees.filter(result => result.employee.first_name === firstName && result.employee.last_name === lastName))
      setResults(filterResults2);
    }
  }, [team, employeeName]) // <-- here put the parameter to listen

  useEffect(() => {
    const filterResults2 = (allEmployees.filter(o => o.team.id === team));
    setAllEmployeesResult(filterResults2);
  }, [team])

  /* First row doesnt show for some reason */
  collection.push(['first row', 'Vacation', new Date(2021, 5, 1), new Date(2021, 5, 1)],)

  {
    results.map(emps => {
      const sunday = getSundayFromWeekNum(emps.week.week_number, 2022);
      sunday.setDate(sunday.getDate() + 1)
      const monday = new Date(sunday);
      monday.setDate(monday.getDate() - 7)
      var text = emps.text;

      if (!text.includes(",") && !text.includes("-") && !text.includes("Mngr") && !text.includes("PO")) {
        if (isNaN(text)) {
          //Here goes ":E", "?"
          if (text = "X" || "x") {
            text = "vac"
          }
        } else {
          monday.setDate(text)
          sunday.setDate(monday.getDate() + 1)
          if (monday.getMonth() === sunday.getMonth()) {
          } else if (sunday.getDate() < 6) {
            monday.setMonth(sunday.getMonth())
          } else {
            sunday.setMonth(monday.getMonth())
          }
          text = "vac"
        }
      } else if (text.includes("Mngr")) {
        text = "Mngr"
      } else if (text.includes("PO")) {
        text = "PO"
      } else {
        const afterSplitFirstDate = text.split(/[-,:e?" "]/)[0]
        const afterSplitSecondDate = text.split(/[-,:e?" "]/).pop()
        sunday.setDate(Number(afterSplitSecondDate) + Number(1))

        if (afterSplitSecondDate !== "") {
          if (afterSplitFirstDate === "") {
            monday.setDate(afterSplitSecondDate);
            sunday.setMonth(monday.getMonth());
          } else if (afterSplitSecondDate < afterSplitFirstDate) {
            monday.setDate(afterSplitFirstDate);
            sunday.setMonth(monday.getMonth() + 1);
          } else {
            monday.setDate(afterSplitFirstDate);
            if (monday.getMonth() !== sunday.getMonth()) {
              if (monday.getDate() > 23) {
                sunday.setMonth(monday.getMonth());
              } else {
                monday.setMonth(sunday.getMonth());
              }
            }

          }
        } else {
          monday.setDate(afterSplitFirstDate);
        }
        text = "vac";
      }

      if (weekId === emps.week.id && month === null) {
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        if (employeeName == !null) {
          collection.push(["asdasd", "asdasd", monday, sunday])
        }
      } else if (month === monday.getMonth() + 1 && weekId == null) {
        if (sunday.getMonth() === month) {
          var date = new Date();
          var lastDay = new Date(date.getFullYear(), month, 1);
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, lastDay])
        } else {
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        }

      } else if (month === sunday.getMonth() + 1 && weekId === null) {
        if (monday.getMonth() !== (month - 1)) {
          var date = new Date();
          var firstDay = new Date(date.getFullYear(), month - 1, 1)
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, firstDay, sunday])
        } else {
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        }

      } else if (weekId === null && month === null) {
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])

      }
    })

    //array with all employees in {team}
    allEmployeesResult.map(emp => {
      empsNamesArr.push(emp.first_name + " " + emp.last_name);
    })

    //mapping collection and adding the names for specific week/month to a new array
    collection.map(coll => {
      onVacationArr.push(coll[0]);
    })

    //array with employees that's not on vacation
    var empsNotOnVacation = empsNamesArr.filter(item => !onVacationArr.includes(item));

    if (weekId !== null) {
      var lastDay = getSundayFromWeekNum((weekId + 14), 2022);
      lastDay.setDate(lastDay.getDate() + 1)
      var firstDay = new Date(lastDay);
      firstDay.setDate(firstDay.getDate() - 7)
      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
        // collection.push([emp, "@office", firstDay, lastDay])
            }
      )
      if(employeeName!== null){
        collection.push(["Week: " + (weekId+Number(14)),"", firstDay, firstDay])
        collection.push(["Week: " +  (weekId+Number(14)), "", lastDay, lastDay])
      }
    } else if (month !== null) {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), month - 1, 1);
      var lastDay = new Date(date.getFullYear(), month, 1);
      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
        // collection.push([emp, "@office", firstDay, lastDay])
      })
      if(employeeName!== null){
        collection.push(["x","", firstDay, firstDay])
        collection.push(["x","", lastDay, lastDay])
      }
    }
  }

  var options = {
    colors: ['#e0440e', '#e6693e']
  };

  let daysDiff = 0;
  //--------------DATA FOR PIE CHART-----------------
  useEffect(() => {
    if (weekId !== null && month === null) {
      collection.map(coll => {
        var diffTime = Math.abs(coll[3] - coll[2]);
        var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diff === 7) {
          diff -= 2
        } else if (diff === 6) {
          diff -= 2
        }
        daysDiff += diff
      })
      setVacDays(daysDiff)
      onChange(daysDiff)
    } else if (month !== null && weekId === null) {
      collection.map(coll => {
        var diffTime = Math.abs(coll[3] - coll[2]);
        var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diff === 7) {
          diff -= 2
        } else if (diff === 6) {
          diff -= 2
        }
        daysDiff += diff
      })
      setVacDays(daysDiff)
      onChange(daysDiff)
    }
  }, [weekId, month]);
  //----------------PIE CHART-------------------


  return (
    <div id="parentChart">
      <div></div>
      <div id="googleChart"><Chart chartType="Timeline" data={collection} options={options} width="90%" height="400px" />
      </div>
      <div></div>
    </div>
  );

}

export default EmployeesOnVacation;