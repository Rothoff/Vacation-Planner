import { Today } from '@mui/icons-material';
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

const {
  getHolidays,
  getUpcomingHolidays,
  isHoliday,
  isPublicHoliday
} = require('swedish-holidays');
const todaysDate = new Date();
const tomorrowsDate = new Date()
tomorrowsDate.setDate(todaysDate.getDate() + 1)

// array of all holidays for a specific year
const holidaysThisYear = getHolidays();

Date.prototype.getWeek = function () {
  var day_miliseconds = 86400000,
    onejan = new Date(this.getFullYear(), 0, 1, 0, 0, 0),
    onejan_day = (onejan.getDay() == 0) ? 7 : onejan.getDay(),
    days_for_next_monday = (8 - onejan_day),
    onejan_next_monday_time = onejan.getTime() + (days_for_next_monday * day_miliseconds),
    // If one jan is not a monday, get the first monday of the year
    first_monday_year_time = (onejan_day > 1) ? onejan_next_monday_time : onejan.getTime(),
    this_date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0),// This at 00:00:00
    this_time = this_date.getTime(),
    days_from_first_monday = Math.round(((this_time - first_monday_year_time) / day_miliseconds));
  var first_monday_year = new Date(first_monday_year_time);

  return (days_from_first_monday >= 0 && days_from_first_monday < 364) ? Math.ceil((days_from_first_monday + 1) / 7) : 52;
}

export const data = [
  [
    { type: "string", id: 'name' },
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
  let holidays = [];
  let employeesArray = []

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
    fetch("http://localhost:8080/weeks")
      .then(res => res.json())
      .then((results) => {
        setWeekData(results);
      }
      )
  }, [])

  useEffect(() => {
    holidaysThisYear.map(hd => {
      let lastDayOfWeek = new Date(getSundayFromWeekNum(hd.date.getWeek(), new Date().getFullYear()));
      let firstDayOfWeek = new Date(lastDayOfWeek);
      firstDayOfWeek.setDate(lastDayOfWeek.getDate() - 7)

      if (todaysDate.getMonth() === 11 || todaysDate.getMonth() === 10 || todaysDate.getMonth() === 9) {
        if (hd.date.getMonth() < todaysDate.getMonth()) {

          if (firstDayOfWeek.getFullYear() === lastDayOfWeek.getFullYear()) {
            lastDayOfWeek.setFullYear(lastDayOfWeek.getFullYear() + 1)
            firstDayOfWeek.setFullYear(lastDayOfWeek.getFullYear())
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 7);
            if (firstDayOfWeek.getDay() <= 6) {
              firstDayOfWeek.setMonth(lastDayOfWeek.getMonth())
            }
            firstDayOfWeek.setDate(lastDayOfWeek.getDate() - 7)
          }
        }
      }
      const awaitWeekData = []
      if (weekData.length != 0) {
        weekData.map(wd => {
          awaitWeekData.push(wd)
        })
        const startDate = new Date(awaitWeekData[0].start_date)
        const endDate = new Date(awaitWeekData.pop().end_date)

        if (hd.date.getMonth() >= startDate.getMonth() || hd.date.getMonth() <= endDate.getMonth()) {
          holidays.push({
            name: hd.name,
            text: hd.date.getDate(),
            week: {
              week_number: hd.date.getWeek(),
              start_date: firstDayOfWeek,
              end_date: lastDayOfWeek
            }
          })
        }
      }
    })
  }, [team])


  useEffect(() => {
    holidays.map(hol => {
      allEmployees.map(emp => {
        employeesArray.push({
          employee: {
            id: emp.id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            team: {
              id: emp.team.id,
              team_name: emp.team.team_name
            }
          },
          id: "",
          text: "" + hol.text,
          type: "" + hol.name,
          week: {
            id: "",
            week_number: hol.week.week_number,
            start_date: hol.week.start_date,
            end_date: hol.week.end_date
          }
        })
      })
    })
  }, [team])

  //pushing data from fetch depending on if user wants to sort on full team or just one employee
  useEffect(() => {
    const concatArray = employees.concat(employeesArray)
    if (employeeName === null) { //only members in choosed team will be mapped
      filterResults = (concatArray.filter(result => result.employee.team.id === team));
      setResults(filterResults);
    } else { //only one employees vacation data will be mapped
      let firstName = employeeName.split(" ")[0] + (" ")
      let lastName = employeeName.split(" ")[1]
      filterResults = (concatArray.filter(result => result.employee.first_name === firstName && result.employee.last_name === lastName))
      setResults(filterResults);
    }
  }, [team, employeeName]) // listening for changes in team and employeenamee props

  useEffect(() => {
    filterResults = (allEmployees.filter(o => o.team.id === team));
    setAllEmployeesResult(filterResults);
  }, [team])

  // First row doesnt show for some reason, so we need to push an empty row
  collection.push(['first row', 'Vacation', new Date(2021, 5, 1), new Date(2021, 5, 1)],)

  //pushing todays date
  if (weekId === null && month === null && team != null) {
    collection.push((['Todays date', '', todaysDate, tomorrowsDate]))
  }

  {
    results.map(emps => {

      let monday = new Date(emps.week.start_date);
      let sunday = new Date(emps.week.end_date);
      let text = emps.text;
      let type = emps.type;

      //Checking user input
      if (!text.includes(",") && !text.includes("-") && !text.includes("Mngr") && !text.includes("PO")) {
        if (isNaN(text)) {
          //Here goes "X", ":E", "?"
          if (text = "X" || "x") {
            text = "vac"
            sunday.setDate(sunday.getDate() - 1)

          }
          //If input text is only one number
        } else {
          monday.setDate(text) //first date = user input
          sunday.setDate(monday.getDate() + 1) //second date is the next day

          if (sunday.getDate() <= 6) { //if this weeks sundays date is < 6, sunday is next month (correct month)

            if (monday.getFullYear() !== sunday.getFullYear()) {

              if (Number(text) < 6) {
                monday.setMonth(monday.getMonth() + 1)
                sunday.setMonth(sunday.getMonth() + 1)
              }
              sunday.setMonth(sunday.getMonth() - 1)
            } else {
              monday.setMonth(sunday.getMonth()) //Thats why we have to set mondays (firstdate) month to the correct month
            }
          } else { // otherwise mondays month is correct
            sunday.setMonth(monday.getMonth())
          }
          if (type) {
            text = type
          } else {
            text = "vac"
          }
        }
      } else if (text.includes("Mngr")) {
        text = "Mngr"
      } else if (text.includes("PO")) {
        text = "PO"
      } else { //here goes the rest, for example "2-5", "15,16"
        //Splitting "2-5" to [2, - ,5]

        const textArray = text.split(/[-,:e?]/);
        let singleDate = 0;

        //Checking if user inputs in same week is single dates.
        //Example: 1, 3, 5
        if (!text.includes("-")) {
          for (let i = 0; i < textArray.length; i++) {
            let firstDate = textArray[i].trim()
            if (parseInt(textArray[i + 1])) {
              if (parseInt(firstDate) + 1 !== parseInt(textArray[i + 1])) {
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
        const diffTime = Math.abs(sunday - monday);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 6) {
          sunday.setDate(sunday.getDate() - 1)
        }
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])

      } else if (month === monday.getMonth() + 1 && weekId == null) {
        if (sunday.getMonth() === month) {
          const date = new Date();
          if (date.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
            if (month === 1) {
              date.setFullYear(date.getFullYear() + 1)
            }
          }
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, lastDay])
        } else {
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        }

      } else if (month === sunday.getMonth() + 1 && weekId === null) {

        if (monday.getMonth() !== (month - 1)) {
          if (sunday.getDate() > 1) {
            var date = new Date();
            if (date.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
              if (month === 1) {
                date.setFullYear(date.getFullYear() + 1)
              }
            }
            var firstDay = new Date(date.getFullYear(), month - 1, 1)
            sunday.setDate(sunday.getDate() + 1)
            collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, firstDay, sunday])
          }
        } else {
          collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])
        }

      } else if (weekId === null && month === null) {
        const diffTime = Math.abs(sunday - monday);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 6) {
          sunday.setDate(sunday.getDate() + 1)

        }
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
    const empsNotOnVacation = empsNamesArr.filter(item => !onVacationArr.includes(item));

    //pushing employees that or not on vacation to google calendar to "hold up" whole week and month
    if (weekId !== null && weekId > 0 && weekId < 53) {
      const weekFilter = (weekData.filter(week => week.week_number === weekId))
      const firstDay = new Date(weekFilter[0].start_date);
      const lastDay = new Date(weekFilter[0].end_date);
      lastDay.setDate(lastDay.getDate() + 1)

      if (empsNotOnVacation.length === 0 && employeeName == null) {
        collection.push(["x", "", firstDay, firstDay])
        collection.push(["x", "", lastDay, lastDay])
      }
      empsNotOnVacation.map(emp => {
        collection.push([emp, "", firstDay, firstDay])
        collection.push([emp, "", lastDay, lastDay])
      })
      if (employeeName !== null) { //pushing empty row for employee filter to "hold up" week
        collection.push(["Week: " + (weekId), "", firstDay, firstDay])
        collection.push(["Week: " + (weekId), "", lastDay, lastDay])
      }

    } else if (month !== null) {
      const date = new Date();

      const firstDay = new Date(date.getFullYear(), month - 1, 1);
      const lastDay = new Date(date.getFullYear(), month, 1);
      if (empsNotOnVacation.length === 0) {
        if (todaysDate.getMonth() > firstDay.getMonth()) {
          firstDay.setFullYear(firstDay.getFullYear() + 1)
          lastDay.setFullYear(firstDay.getFullYear())
        }
        collection.push(["x", "", firstDay, firstDay])
        collection.push(["x", "", lastDay, lastDay])
      }
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
    collection.map(coll => {
      let diffTime = Math.abs(coll[3] - coll[2]);
      let diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (coll[2].getDay() != 6 && coll[2].getDay() != 0) {
        console.log(coll[2])
        if (diff === 7) {
          diff -= 2
        } else if (diff === 6) {
          diff -= 2
        }
        daysDiff += diff
      }
      setVacDays(daysDiff)
      onChange(daysDiff)
    })
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