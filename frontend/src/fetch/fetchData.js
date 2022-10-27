
import { useState, useEffect } from 'react';

//used in StapleChart
const fetchEmployees = () => {
    const [employeeData, setEmployeeData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/employee/all")
          .then(res => res.json())
          .then((allEmployeesResult) => {
            setEmployeeData(allEmployeesResult);
          }
          )
      }, [])

    return (
        employeeData
    );
}

//Vacation data
//[{"id","employee":{"id","first_name","last_name","team":{"id","team_name"}},"week":{"id","week_name","week_number"},"text"}
//Used in VacationCalendar and PieChart
const fetchVacation = () => {
    const [vacationData, setVacationData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/vacation/all")
            .then(res => res.json())
            .then((vacationResult) => {
                setVacationData(vacationResult);
            }
            )
    }, [])

    return (
        vacationData
    );

};

export { fetchEmployees, fetchVacation }
