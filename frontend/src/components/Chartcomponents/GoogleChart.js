import React from "react";
import { Chart } from "react-google-charts";


/* const collection = [
  [{name: "Erik"},{text: "Vacation"},{start: new Date(2022, 12, 1)}, {end: new Date(2022, 21, 6)}],
  [{name: "Fredrik"},{text: "Vacation"},{start: new Date(2022, 1, 1)},{end: new Date(2022, 1, 4)}],
]

function printdata(){

 return console.log([collection[0][0], collection[0][1], collection[0][2], collection[0][3]]);
}
printdata();
*/
export const data = [
  [
    { type: "string", id: "name" },
    { type: "string", id: "text" },
    { type: "date", id: "start" },
    { type: "date", id: "end" },
  ],
  /*[collection[0][0], collection[0][1], collection[0][2], collection[0][3]], */
  ["Erik", "Vacation", new Date(2022, 12, 1), new Date(2022, 21, 6)],
  
];

export function App() {
  return <div class = "center"><Chart chartType="Timeline" data={data} width="90%" height="400px"/></div>;
}
