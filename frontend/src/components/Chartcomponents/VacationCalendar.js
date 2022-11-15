import React from 'react';
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
//imports from fetch file

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
  const { team, weekId, month, employeeName } = props;
  const [employees, setEmployees] = useState([])
  const [results, setResults] = useState([])
  const [allEmployeesResult, setAllEmployeesResult] = useState([])
  const [allEmployees, setAllEmployees] = useState([])
  const [vacDays, setVacDays] = useState('')
  const [weekData, setWeekData] = useState([])
  const collection = [];
  const empsNamesArr = [];
  const onVacationArr = [];
  const { onChange } = props;
  let filterResults = [];



  //Should be moved out to seperate file?
  useEffect(() => {
    fetch("http://localhost:8080/vacation/all")
      .then(res => res.json())
      .then((result) => {
        setEmployees(result);
      }
      )
  }, [])

  //Should be moved out to seperate file?
  useEffect(() => {
    fetch("http://localhost:8080/employee/all")
      .then(res => res.json())
      .then((allEmployeesResult) => {
        setAllEmployees(allEmployeesResult);
      }
      )
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/weeks")
      .then(res => res.json())
      .then((results) => {
        setWeekData(results);
      }
      )
  }, [])




  //pushing data from fetch depending on if user wants to sort on full team or just one employee
  useEffect(() => {
    if (employeeName === null) { //only members in choosed team will be mapped
      filterResults = (employees.filter(result => result.employee.team.id === team));
      setResults(filterResults);
    } else { //only one employees vacation data will be mapped
      let firstName = employeeName.split(" ")[0] + (" ")
      let lastName = employeeName.split(" ")[1]
      filterResults = (employees.filter(result => result.employee.first_name === firstName && result.employee.last_name === lastName))
      setResults(filterResults);
    }
  }, [team, employeeName]) // listening for changes in team and employeenamee props

  useEffect(() => {
    filterResults = (allEmployees.filter(o => o.team.id === team));
    setAllEmployeesResult(filterResults);
  }, [team])

  // First row doesnt show for some reason, so we need to push an empty row
  collection.push(['first row', 'Vacation', new Date(2021, 5, 1), new Date(2021, 5, 1)],)
  let year = (new Date().getFullYear())
  {
    results.map(emps => {

      let sunday = new Date(emps.week.end_date);
      let monday = new Date(emps.week.start_date);
      let text = emps.text;

      //Checking user input
      if (!text.includes(",") && !text.includes("-") && !text.includes("Mngr") && !text.includes("PO")) {
        if (isNaN(text)) {
          //Here goes "X", ":E", "?"
          if (text = "X" || "x") {
            text = "vac"
          }
          //If input text is only one number
        } else {
          monday.setDate(text) //first date = user input
          sunday.setDate(monday.getDate() + 1) //second date is the next day
          if (sunday.getDate() < 6) { //if this weeks sundays date is < 6, sunday is next month (correct month)
            monday.setMonth(sunday.getMonth()) //Thats why we have to set mondays (firstdate) month to the correct month
          } else { // otherwise mondays month is correct
            sunday.setMonth(monday.getMonth())
          }
          text = "vac"
        }
      } else if (text.includes("Mngr")) {
        text = "Mngr"
      } else if (text.includes("PO")) {
        text = "PO"
      } else { //here goes the rest, for example "2-5", "15,16"
        //Splitting "2-5" to [2, - ,5]

        let textArray = text.split(/[-,:e?]/);
        let singleDate = 0;

        if (!text.includes("-")) {
          for (let i = 0; i < textArray.length; i++) {
            let firstDate = textArray[i].trim()
            if (parseInt(textArray[i + 1])) {
              if (parseInt(firstDate) + 1 !== parseInt(textArray[i + 1])) {
                //push first date
                singleDate = firstDate;
              }
            }

          }

          if (singleDate) {
            const monday2 = new Date(emps.week.start_date)
            const sunday2 = new Date(emps.week.start_date)

            monday2.setDate(singleDate) //first date = user input
            sunday2.setDate(monday2.getDate() + 1) //second date is the next day
            text = "vac";

            if (weekId === emps.week.week_number && month === null) {
              collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday2, sunday2])

            } else if (month === monday.getMonth() + 1 && weekId == null) {
              if (sunday.getMonth() === month) {
                var date = new Date();

                if (date.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
                  if (month === 1) {
                    date.setFullYear(date.getFullYear() + 1)
                  }
                }

                var lastDay = new Date(date.getFullYear(), month, 1);
                collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday2, lastDay])
              } else {
                collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday2, sunday2])
              }
            } else if (weekId === null && month === null) {
              collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday2, sunday2])

            }
          }

          const index = textArray.indexOf(singleDate);
          if (index > -1) {
            textArray.splice(index, 1);
          }
        }
        const afterSplitFirstDate = textArray[0].trim() //first number =  first date
        const afterSplitSecondDate = textArray.pop().trim() //second number = second date
        sunday.setDate(Number(afterSplitSecondDate) + Number(1)) //adding +1 on second date because of google chart

        if (afterSplitSecondDate !== "") {
          if (afterSplitFirstDate === "") {
            monday.setDate(afterSplitSecondDate);
            sunday.setMonth(monday.getMonth());
          } else if (afterSplitSecondDate < afterSplitFirstDate) { //second date is smaller = next month
            monday.setDate(afterSplitFirstDate);
            sunday.setMonth(monday.getMonth() + 1);
            sunday.setFullYear(monday.getFullYear());
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
      if (sunday.getDate() > monday.getDate() && sunday.getFullYear() > monday.getFullYear()) {
        sunday.setFullYear(monday.getFullYear());
      }

      //pushing data to calendar
      if (weekId === emps.week.week_number && month === null) {
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])

      } else if (month === monday.getMonth() + 1 && weekId == null) {
        if (sunday.getMonth() === month) {
          var date = new Date();

          if (date.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
            if (month === 1) {
              date.setFullYear(date.getFullYear() + 1)
            }
          }

          var lastDay = new Date(date.getFullYear(), month, 1);
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, lastDay])
        } else {
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        }

      } else if (month === sunday.getMonth() + 1 && weekId === null) {
        if (monday.getMonth() !== (month - 1)) {
          var date = new Date();

          if (date.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
            if (month === 1) {
              date.setFullYear(date.getFullYear() + 1)
            }
          }
          var firstDay = new Date(date.getFullYear(), month - 1, 1)

          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, firstDay, sunday])
        } else {
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        }

      } else if (weekId === null && month === null) {
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])

      }
    }
    )

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

    //pushing employees that or not on vacation to google calendar to "hold up" whole week and month
    if (weekId !== null && weekId > 0 && weekId < 53) {

      const weekFilter = (weekData.filter(week => week.week_number === weekId))
      const firstDay = new Date(weekFilter[0].start_date);
      const lastDay = new Date(weekFilter[0].end_date);

      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
      })
      if (employeeName !== null) { //pushing empty row for employee filter to "hold up" week
        collection.push(["Week: " + (weekId), "", firstDay, firstDay])
        collection.push(["Week: " + (weekId), "", lastDay, lastDay])
      }

    } else if (month !== null) {
      var date = new Date();

      if (date.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
        if (month === 1) {
          date.setFullYear(date.getFullYear() + 1)
        }
      }
      const firstDay = new Date(date.getFullYear(), month - 1, 1);
      const lastDay = new Date(date.getFullYear(), month, 1);
      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
      })
      if (employeeName !== null) { // holding up month
        collection.push(["x", "", firstDay, firstDay])
        collection.push(["x", "", lastDay, lastDay])
      }
    } else {
      const dateArray = [];
      weekData.map(week => {

        dateArray.push((week.start_date))
        dateArray.push((week.end_date))
      })

      let firstDay = new Date(dateArray[0]);
      let lastDay = new Date(dateArray.pop());

      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
      })

    }
  }

  var options = {
    colors: ['#e0440e']
  };

  let daysDiff = 0;
  //--------------DATA FOR PIE CHART-----------------
  useEffect(() => {
    if (weekId !== null && month === null) {
      collection.map(coll => {
        if (!coll[1].includes("PO") && !coll[1].includes("Mngr") && !coll[1].includes("Today")) {
          var diffTime = Math.abs(coll[3] - coll[2]);
          var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diff === 7) {
            diff -= 2
          } else if (diff === 6) {
            diff -= 2
          }
          daysDiff += diff
        }
      })
      setVacDays(daysDiff)
      onChange(daysDiff)
    } else if (month !== null && weekId === null) {
      collection.map(coll => {
        if (!coll[1].includes("PO") && !coll[1].includes("Mngr")) {
          var diffTime = Math.abs(coll[3] - coll[2]);
          var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diff === 7) {
            diff -= 2
          } else if (diff === 6) {
            diff -= 2
          }
          daysDiff += diff
        }
      })
      setVacDays(daysDiff)
      onChange(daysDiff)
    }
  }, [weekId, month]);
  //----------------PIE CHART-------------------

  return (
    <div id="parentChart">
      <div id="googleChart"><Chart chartType="Timeline" data={collection} options={options} width="90%" height="40vh" />
      </div>
    </div>
  );

}

export default EmployeesOnVacation;