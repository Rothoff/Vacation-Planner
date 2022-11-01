import React from 'react';
import RangeCalendar from '../components/SprintComponents/CreateSprintComponents/RangeCalendar';
import Selectlabels from '../components/Selectbar/SelectTeam';
import SelectButtons from '../components/SprintComponents/SelectButtons.js'
import { useState, useEffect } from 'react';
import CreateSprint from '../components/SprintComponents/CreateSprint';

export const SprintPlanner= () => {
  const [clicked, setClicked] = useState(null);
  
  const onClickSelection = (clicked) => {
    setClicked(clicked);
  }
  
    return (
      <div id="sprint-container">
        <h1>SPRINT PLANNER</h1>
      <SelectButtons onClick={onClickSelection} />
      <CreateSprint clicked={clicked}/>
     </div>
    );
  
  };
  



