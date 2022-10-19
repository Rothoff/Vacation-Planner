import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function pieChart(props) {
    const { team, week, month, vacDays } = props;
    const [teamsAmountData, setTeamsAmountData] = useState([])
    const [employees, setEmployees] = useState([])
   
    useEffect(() => {
        async function teamData() {
            const response = await fetch("http://localhost:8080/vacation/3");
            const teams = await response.json();
            setTeamsAmountData(teams)
        }
        teamData();
    }, []);
    const amountInTeam = Number(teamsAmountData[team - 1]);
    useEffect(() => {
        fetch("http://localhost:8080/vacation/all")
            .then(res => res.json())
            .then((result) => {
                setEmployees(result);
            }
            )
    }, [])
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }
   
if(week!=null&&month==null){
    var totalDaysForTeam = amountInTeam * Number(5);
}else if(month!=null && week==null){
    var totalDaysOfMonth = daysInMonth(month, 2022)
    var totalDaysForTeam = amountInTeam * totalDaysOfMonth
}
    


    var workDays = totalDaysForTeam - vacDays;
    const data = [
        ["Vacation", "Popularity"],
        ["Working", workDays],
        ["Vacation", vacDays],
    ];
    return (
        <div class="pieChartDiv" >
            <Chart chartType="PieChart" data={data} width={"80%"} height={"400px"} />
        </div>
    )
};
export default pieChart;