import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function StapleChart(props) {
  const [teamName, setTeamName] = useState([]);
  const [stapleData, setStapleData] = useState([]);
  const [biggestNumber, setBiggestNumber] = useState("")
  const { team } = props;
  const [weeks, setWeeks] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  let pickedTeam = "";
  let teamNameList = []
  let finalStapleData = [];

  console.log("TEAM: ", team);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];

    }
    return color;
  }

  useEffect(() => {
    fetch("http://localhost:8080/teams")
      .then(res => res.json())
      .then((allTeamsResult) => {
        setTeamName(allTeamsResult);
      }
      )
  }, [])


  useEffect(() => {
    fetch("http://localhost:8080/weeks")
      .then(res => res.json())
      .then((weeksResult) => {
        setWeeks(weeksResult);
      }
      )
  }, [])



  if (team !== null) {
    pickedTeam = teamName[team-1].team_name;
  }

  teamName.map(teamN => {
    teamNameList.push(teamN.team_name)
  })

  let myList = []

  useEffect(() => {
    async function teamVacationData() {
      const response = await fetch("http://localhost:8080/vacation/empsonvacperweek");
      const teams = await response.json();
      let weekNr = 15;
      let nr = team
      setTeamsData(teams);
      let jsonString="";
      let finalList = []

      if (team !== null) {
        setStapleData([])
        for (let week = 0; week < weeks.length; week++) {
          setStapleData(teamsData => teamsData.concat(
            {
              name: weeks[week].week_number,
              yAxis: biggestNumber,
              [pickedTeam]: teams[week][team - 1],
            },))
        }

      } else {
      
        for (let week = 0; week < weeks.length; week++) {
          myList.push([])
         
          for (let team = 0; team < teamNameList.length; team++){
            jsonString += '"'+teamNameList[team]+'"'+':'+teamsData[week][team]+', '
          }
          myList[week].push(jsonString)
          jsonString = "";
          finalStapleData.push([
            '"name"'+':' + (weeks[week].week_number) + ', ' +
            '"yAxis"'+':' + biggestNumber+ ', ', 
          ])

       let word = myList[week];
       let word2 =finalStapleData[week];
      
       let word3 = "{" + word2 + word + "}";
       let word4 = (word3.slice(0, -3)+ '}');
       let myJson = JSON.parse(word4)

       finalList.push(myJson);

       setStapleData(finalList)
        }
      }
    }
    teamVacationData();
  }, [team, biggestNumber]);

  let currentNumber = 0;

  //Setting height for y-axis of barchart based on "biggest" vacation week
  for (let i = 0; i < teamsData.length; i++) {
    currentNumber = teamsData[i].reduce((partialSum, a) => partialSum + a, 0);
    if (currentNumber > biggestNumber) {
      setBiggestNumber(currentNumber);
    }
  }

  return (
    <div class="center">
      <ResponsiveContainer width="70%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={stapleData}
          margin={{
            top: 50,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="yAxis" />
          <Tooltip />
          <Legend />
          {teamName.map(teamName=>(
            <Bar dataKey={teamName.team_name} stackId="a" fill={getRandomColor()} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default StapleChart;