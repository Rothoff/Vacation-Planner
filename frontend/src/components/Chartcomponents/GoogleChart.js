import { Google } from "@mui/icons-material";
import { RETURN } from "google-charts";
import React from "react";
import { Chart } from "react-google-charts";
import { useState, useEffect } from 'react';

function GoogleChartTest(){


const collection = [
  ["Hej", 'Vacation', new Date(2022, 1, 1),  new Date(2022, 1, 4)],
  ["Fredrik", 'Vacation', new Date(2022, 1, 1),  new Date(2022, 1, 4)],
  ["Erik", 'Vacation', new Date(2022, 5, 7),  new Date(2022, 5, 9)],
  ["Erik", 'Vacation', new Date(2022, 6, 7),  new Date(2022, 6, 9)],
  ['Test', 'Vacation', new Date(2022, 3, 1),  new Date(2022, 5, 4)],
]

collection.push(['Frida', 'Vacation', new Date(2022, 3, 1), new Date(2022, 5, 4)])

return collection;

}

export const data = [
  [
    { type: "string", id: "name" },
    { type: "string", id: "text" },
    { type: "date", id: "start" },
    { type: "date", id: "end" },
  ],
 
];
export function App() {
  return <div class = "center"><Chart chartType="Timeline" data={GoogleChartTest()} width="90%" height="400px"/>
  </div>;
}

