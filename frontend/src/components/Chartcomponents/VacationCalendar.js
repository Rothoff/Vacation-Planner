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
      
      console.log(year)
      const sunday = getSundayFromWeekNum(emps.week.week_number, year);
      sunday.setDate(sunday.getDate() + 1)
      const monday = new Date(sunday);
      monday.setDate(monday.getDate() - 7)
      let text = emps.text;
      console.log("SUNDAY DATE:", sunday)
      console.log("monday DATE", monday)
      if(sunday.getMonth()<monday.getMonth()){
        sunday.setDate(getSundayFromWeekNum(emps.week.week_number,year+1))
        year+=1;
      }else{
        year = (new Date().getFullYear())
      }

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
          if (sunday.getDate() < 6 ) { //if this weeks sundays date is < 6, sunday is next month (correct month)
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
        const afterSplitFirstDate = text.split(/[-,:e?" "]/)[0] //first number =  first date
        const afterSplitSecondDate = text.split(/[-,:e?" "]/).pop() //second number = second date
        sunday.setDate(Number(afterSplitSecondDate) + Number(1)) //adding +1 on second date because of google chart

        if (afterSplitSecondDate !== "") {
          if (afterSplitFirstDate === "") {
            monday.setDate(afterSplitSecondDate);
            sunday.setMonth(monday.getMonth());
          } else if (afterSplitSecondDate < afterSplitFirstDate) { //second date is smaller = next month
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

      //pushing data to calendar
      if (weekId === emps.week.id && month === null) {
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])

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
    if (weekId !== null) {
      let year = (new Date().getFullYear())
      var lastDay = getSundayFromWeekNum((weekId), year);
      lastDay.setDate(lastDay.getDate() + 1)
      var firstDay = new Date(lastDay);
      firstDay.setDate(firstDay.getDate() - 7)
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
      var firstDay = new Date(date.getFullYear(), month - 1, 1);
      var lastDay = new Date(date.getFullYear(), month, 1);
      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
        // collection.push([emp, "@office", firstDay, lastDay])
      })
      if (employeeName !== null) { // holding up month
        collection.push(["x", "", firstDay, firstDay])
        collection.push(["x", "", lastDay, lastDay])
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
       if(!coll[1].includes("PO") && !coll[1].includes("Mngr")){
        var diffTime = Math.abs(coll[3] - coll[2]);
        var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diff === 7) {
          diff -= 2
        } else if (diff === 6) {
          diff -= 2
        }
        daysDiff += diff
      }})
      setVacDays(daysDiff)
      onChange(daysDiff)
    } else if (month !== null && weekId === null) {
      collection.map(coll => {
        if(!coll[1].includes("PO")&&!coll[1].includes("Mngr")){
        var diffTime = Math.abs(coll[3] - coll[2]);
        var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diff === 7) {
          diff -= 2
        } else if (diff === 6) {
          diff -= 2
        }
        daysDiff += diff
      }})
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