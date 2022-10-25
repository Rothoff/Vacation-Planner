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
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }



    if (week != null && month == null) {
        var totalDaysForTeam = amountInTeam * Number(5);
    } else if (month != null && week == null) {
        var totalDaysOfMonth = daysInMonth(month, 2022)
        var totalDaysForTeam = amountInTeam * totalDaysOfMonth
        console.log("month: ", totalDaysOfMonth);

        function isWeekday(year, month, day) {
            var day = new Date(year, month, day).getDay();
            return day !== 0 && day !== 6;
        }

        function getWeekdaysInMonth(month, year) {
            var days = daysInMonth(month, year);
            var weekdays = 0;
            for (var i = 0; i < days; i++) {
                if (isWeekday(year, month, i + 1)) weekdays++;
            }
            return weekdays;
        }
        totalDaysForTeam = amountInTeam * getWeekdaysInMonth((month - 1), 2022)
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