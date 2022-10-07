import React,{useState, useEffect} from "react";
import { Chart } from "react-google-charts";

function pieChart(props){
    const {team}  = props;
    const {week} = props;
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
      const amountInTeam = Number(teamsAmountData[team -1]);
      useEffect(() => {
        fetch("http://localhost:8080/vacation/all")
          .then(res => res.json())
          .then((result) => {
            setEmployees(result);
          }
          )
      }, [])
  
    var vacDays = Number(0);
    {
      employees.map(emps2 => {
        var text = emps2.text;
        if (emps2.week.id == week && emps2.employee.team.id == team) {
          if (!text.includes(",") && !text.includes("-")) {
            if (isNaN(text)) {
              if (text.includes("x") || text.includes("X")) {
                vacDays += Number(5)
              }
            } else{
              vacDays += Number(1);
            }
          }
          else {
            const afterSplitFirstDate1 = text.split(/[-,:e?" "]/)[0]
            const afterSplitSecondDate1 = text.split(/[-,:e?" "]/).pop()
            var daysDiff = (Number(afterSplitSecondDate1) - Number(afterSplitFirstDate1));
            vacDays+=Number(daysDiff)
          }
        }
      }
      )
    }
  
  var totalDaysForTeam = amountInTeam*Number(5);
  
  function percentage(partialValue, totalValue) {
    return 100 - (100 * partialValue) / totalValue;
  } 
       const data = [
        ["Vacation", "Popularity"],
        ["Vacation", vacDays],
        ["Working", totalDaysForTeam],
      ];
return (
    <div className="center" >
       <h3>team capacity</h3>
    <Chart chartType="PieChart" data={data} width={"80%"}height={"400px"}/>
    </div>
  )
};
export default pieChart;