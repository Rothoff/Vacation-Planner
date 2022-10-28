
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function StapleChart(props) {
  const [teamsData, setTeamsData] = useState([]);
  const [teamName, setTeamName] = useState([]);
  const [stapleData, setStapleData] = useState([]);
  const [biggestNumber, setBiggestNumber] = useState("")
  const { team } = props;
  let pickedTeam = "";

  useEffect(() => {
    fetch("http://localhost:8080/teams")
      .then(res => res.json())
      .then((allTeamsResult) => {
        setTeamName(allTeamsResult);
      }
      )
  }, [])

  if (team !== null) {
    pickedTeam = teamName[team - 1].team_name
  }

  useEffect(() => {
    async function teamVacationData() {
      const response = await fetch("http://localhost:8080/vacation/2");
      const teams = await response.json();
      let weekNr = 15;
      let nr = team
      setTeamsData(teams);

      if (team !== null) {
        setStapleData([])
        for (let i = 0; i < 21; i++) {
          setStapleData(teamsData => teamsData.concat(
            {
              name: weekNr++,
              yAxis: 10,
              [pickedTeam]: teams[i][team - 1],

            },))
        }
      } else {
        setStapleData([])
        for (let i = 0; i < 21; i++) {
          setStapleData(teamsData => teamsData.concat([
            {
              name: weekNr++,
              yAxis: biggestNumber,
              Sipa: teams[i][0],
              Wild: teams[i][1],
              EM: teams[i][2],
              Arch: teams[i][3],
              Bull: teams[i][4],
              Hos: teams[i][5],
              Gama: teams[i][6],
              Jazz: teams[i][7],
              HoPD: teams[i][8],
              Best: teams[i][9],
              Wolf: teams[i][10],
              Edge: teams[i][11],
              PO: teams[i][12],
            },]))

        }
      }
    }
    teamVacationData();
  }, [team, biggestNumber]);


  
  let currentNumber = 0;

  //Setting height for y-axis of barchart based on "biggest" vacation week
  for (let i = 0; i < teamsData.length; i++){
    currentNumber = teamsData[i].reduce((partialSum, a) => partialSum + a, 0);
    if(currentNumber > biggestNumber){
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
          <Bar dataKey="Sipa" stackId="a" fill="#66ACFA" />
          <Bar dataKey="Wild" stackId="a" fill="#92CAFF" />
          <Bar dataKey="EM" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Arch" stackId="a" fill="#ffc658" />
          <Bar dataKey="Bull" stackId="a" fill="#3D4A81" />
          <Bar dataKey="HoS" stackId="a" fill="aqua" />
          <Bar dataKey="Gama" stackId="a" fill="#FFE5AE" />
          <Bar dataKey="Jazz" stackId="a" fill="#FADE7D" />
          <Bar dataKey="HoPD" stackId="a" fill="purple" />
          <Bar dataKey="Best" stackId="a" fill="#FF62A5" />
          <Bar dataKey="Wolf" stackId="a" fill="blue" />
          <Bar dataKey="Edge" stackId="a" fill="cyan" />
          <Bar dataKey="PO" stackId="a" fill="#3e9399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default StapleChart;