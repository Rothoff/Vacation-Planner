import React from 'react';
import { useState, useEffect } from 'react';
import RangeCalendar from './CreateSprintComponents/RangeCalendar';

export default function CreateSprint(props) {
    const {clicked} = props;

    console.log("from create ", clicked)
    return (
        <div id="sprint-container">
        <div id="sprint-top">
        </div>
         <div id ="sprint-mid">
         <div id ="sprint-calender-select">
         <RangeCalendar/>
         </div>
         <div id="sprint-selected-employees">
         <h1>SELECTED EMPLOYEES DIV</h1>
       </div>
       </div>
       </div>
    )
}