import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Tag, Popover } from 'antd';
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

// array of all holidays for a specific year
const holidaysThisYear = getHolidays();

const isThisAHoliday = isHoliday(new Date("2019-12-24"));

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
            sunday.setDate(sunday.getDate() - 2)
          }
          //If input text is only one number
        } else {
          monday.setDate(text) //first date = user input
          sunday.setDate(monday.getDate()) //second date is the same day

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
            sunday2.setDate(monday2.getDate())
            text = "vac";

            if (weekId === emps.week.week_number && month === null) {
              collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday2, sunday2])

            } else if (month === monday.getMonth() + 1 && weekId == null) {

              if (sunday.getMonth() === month) {
                var date = new Date();
                if (todaysDate.getMonth() === 11 || date.getMonth() === 10 || date.getMonth() === 9) {
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

        sunday.setDate(afterSplitSecondDate);
        if (afterSplitSecondDate !== "") {
          if (afterSplitFirstDate === "") {
            monday.setDate(afterSplitSecondDate);
            sunday.setMonth(monday.getMonth());
          } else if (afterSplitSecondDate.parseInt < afterSplitFirstDate.parseInt) { //second date is smaller = next month
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

      if (sunday.getDate() > monday.getDate() && sunday.getFullYear() > monday.getFullYear())  {
        sunday.setFullYear(monday.getFullYear());
      }else if(sunday.getDate() === monday.getDate()){
        sunday.setFullYear(monday.getFullYear());
      }

      //pushing data to collection[] for calendar
      if (weekId === emps.week.week_number && month === null) {
        const diffTime = Math.abs(sunday - monday);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 6) {
          sunday.setDate(sunday.getDate() - 1)
        }
        collection.push([emps.employee.first_name + " " + emps.employee.last_name, text, monday, sunday])

      } else if (month === monday.getMonth() + 1 && weekId == null) {
        if (sunday.getMonth() === month+1) {
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
            if (todaysDate.getMonth() === 11 || todaysDate.getMonth() === 10 || todaysDate.getMonth() === 9) {
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
  }
  
  //--------------DATA FOR PIE CHART-----------------
  let daysDiff = 0;
  
  useEffect(() => {
    collection.map(coll => {
      let startDate = new Date(coll[2])
      let endDate = new Date (coll[3])

      endDate.setDate(endDate.getDate()+1)

      let diffTime = Math.abs(endDate - startDate);
      let diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
     
        daysDiff += diff
    })
    setVacDays(daysDiff)
    onChange(daysDiff)

  }, [collection, month]);

  //----------------PIE CHART-------------------
  var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
  };

  const data = [];
  let keyNr = 0;
  let daysInMonth = getDaysInMonth(month, 2022)
  let dateArr = []

  for (let i = 0; i < daysInMonth; i++) {
    dateArr[i] = ""
  }

  empsNamesArr.map(emps => {
    data.push(
      {
        key: keyNr + 1,
        name: emps,
        vacData: []
      },
    )
    collection.map(coll => {
      if (emps == coll[0]) {
        let startDate = coll[2].getDate();
        let endDate = coll[3].getDate();
        let diff = (endDate - startDate);
        for (let i = 0; i < diff; i++) {
          dateArr[startDate + i] = coll[1]
        }
        dateArr[startDate - 1] = coll[1];
        dateArr[endDate - 1] = coll[1];
        for (let i = 0; i < daysInMonth; i++) {
          data[keyNr].vacData[i] = dateArr[i]
        }
      }
    })
    dateArr = []
    keyNr++;
  })

  
  const columns = [
    {
      title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'Name' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
      dataIndex: 'name',
      fixed: true,
      width: 300,
    },
  ]

  for (let i = 0; i < daysInMonth; i++) {
    let color = "black"
    let tagColor = "black"
    let date = new Date('2022-' + month + '-' + (i + 1))
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if (todaysDate.getMonth() === 11 || todaysDate.getMonth() === 10 || todaysDate.getMonth() === 9) {
      if (month === 1) {
        date.setFullYear(date.getFullYear() + 1)
      }
    }
    let content = date.getDate() + "/" + month + "-" + date.getFullYear();

    if (isHoliday(date)) {
      color = "orange";
      content = isHoliday(date).name + " " + content + " (" + dayOfWeek[date.getDay()] + ")"
      if (isHoliday(date).isPublicHoliday) {
        color = "red"
      }
    } else if (date.getDate() === todaysDate.getDate() && date.getMonth() === todaysDate.getMonth()) {
      color = "blue";
      content = content + " (TODAY)"
    } else {
      content = content + " (" + dayOfWeek[date.getDay()] + ")"
      if (date.getDay() === 6 || date.getDay() === 0) {
        color = "red";
      }
    }

    function vacTag(text) {

      if (text.vacData[i] != undefined && text.vacData[i] != "") {
        tagColor = "red";
        content = "Vacation"
      } else {
        tagColor = "green"
        content = "Working"
      }
      return <Popover content={content} trigger="hover">
        <Tag color={tagColor}>{text.vacData[i]}</Tag>
      </Popover>
    }

    columns.push({
      title: <Popover content={content} trigger="hover"><Tag color={color}>
        {[i + 1]}
      </Tag> </Popover>,
      render: (_, text) => (
        <span>
          {vacTag(text)}
        </span>
      )
    })
  }

  return (
    <div id="parentChart">
      <div id="calendar-Chart"><Table id='vacTable' columns={columns} dataSource={data} />
      </div>

    </div>
  );

}

export default EmployeesOnVacation;