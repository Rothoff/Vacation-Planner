import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const defaultData = [
];

function StapleChart() {
  /**
   * set all the states you want to keep, useState takes as parameter the initial value, e.g. [] as an empty array
   * It returns an array with different elements, the first one is the state itself and the second one 
   * is the method that modifies that state, the only way to modify that state is calling that method.
   * For example if you want to modify teamsData, never do teamsData = something, instead use setTeamsData(newValue);
   * if your state is an array, and you have to modify it, copy the array in a new variable in an immutable way,
   * do whatever you need to it and then pass it to the setTeamsData() method.
   */
  const [teamsData, setTeamsData] = useState([]);
  const [data, setData] = useState(defaultData)

  /**
   * with useEffects you can run functions in different moments of the lifecycle of the component,
   * e.g. when mounting, unmounting, when some property changes. it takes a function as first parameter,
   * and an array with the elements that will trigger the function, if empty it will function as a mount effect.
   * This in its simplest way
   */
  useEffect(() => {
    async function teamVacationData() {
      const response = await fetch("http://localhost:8080/vacation/2");
      const teams = await response.json();
      let weekNr = 15;

      for (let i = 0; i < 21; i++) {
        setTeamsData(prev => prev.concat([
          {
            name: weekNr++,
            Sipa: teams[i][0],
            Wild: teams[i][1],
            Em: teams[i][2],
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
    teamVacationData();
    console.log('i fire once');
  }, []);

  // Listen for changes in teamsData
  useEffect(() => {
    // whatever thing you need to do when that data changes do it here
    // If you need to update the data object you can do it here
    function doSomethingWithTeamsData() {}
    doSomethingWithTeamsData();
  }, [teamsData]);

  return (
    <div class="center">

      <ResponsiveContainer width="90%" aspect={2}>
        <BarChart
          width={500}
          height={300}
          data={teamsData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sipa" stackId="a" fill="#66ACFA" />
          <Bar dataKey="Wild" stackId="a" fill="#92CAFF" />
          <Bar dataKey="Em" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Arch" stackId="a" fill="#ffc658" />
          <Bar dataKey="Bull" stackId="a" fill="#3D4A81" />
          <Bar dataKey="Hos" stackId="a" fill="aqua" />
          <Bar dataKey="Gama" stackId="a" fill="#FFE5AE" />
          <Bar dataKey="Jazz" stackId="a" fill="#FADE7D" />
          <Bar dataKey="Hopd" stackId="a" fill="purple" />
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