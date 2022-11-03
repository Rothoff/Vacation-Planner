import React from 'react';
import { useState, useEffect } from 'react';
import RangeCalendar from './CreateSprintComponents/RangeCalendar';
import EmployeesListed from './CreateSprintComponents/SprintList';
import SelectTeamEmployee from './CreateSprintComponents/TeamEmployeeSelect';
import SprintList from './CreateSprintComponents/SprintList';


export default function CreateSprint(props) {
    const button = props;


    function Divs() {


        if (button.clicked == 2) {
            return (
                <div id="sprint-container">
                    <div id="sprint-top">
                        <h1>CREATE</h1>
                    </div>

                    <div id="sprint-mid">


                        <div id="sprint-calender-select">
                            <RangeCalendar />
                            <SelectTeamEmployee />
                        </div>
                        <div id="sprint-selected-employees">
                        <SprintList/>
                        </div>
                    </div>
                </div>
            )
        }

    }



    return (
        <Divs />
    )
}