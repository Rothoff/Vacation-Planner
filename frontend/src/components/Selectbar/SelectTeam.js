import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
const selectTeam = ({ onChange }) => {
  const [team, setTeam] = useState(0);
  const [allEmployees, setAllEmployees] = useState([])
  const [employeeName, setEmployeeName] = useState ('');
  const [teamName, setTeamName] = useState([]);
  const listOfEmployees = [];

  const handleChange = (event) => {
    setTeam(event.target.value);
    onChange(event.target.value, null)
    return team;
  };
  const handleChangeEmployee = (event, value) => {
    setEmployeeName(value);
    onChange(null, value);
  }
  useEffect(() => {
    fetch("http://localhost:8080/employee/all")
      .then(res => res.json())
      .then((allEmployeesResult) => {
        setAllEmployees(allEmployeesResult);
      }
      )
  }, [])
  useEffect(() => {
    fetch("http://localhost:8080/teams")
      .then(res => res.json())
      .then((teamsResult) => {
        setTeamName(teamsResult);
      }
      )
  }, [])
  if (team !== null && team !== 0) {
    allEmployees.map(employee => {
      if (employee.team.id === team) {
        listOfEmployees.push(employee.first_name + "" + employee.last_name)
      }
    })
  } else {
    allEmployees.map(employee => {
      listOfEmployees.push(employee.first_name + "" + employee.last_name)
    })
  }
  
  return (
    <div id = "teamParentDiv">
      <center>
        <FormControl sx={{ m: 2, minWidth: 200}}>
          <InputLabel id="team-selector" >Team</InputLabel>
          <Select
            labelId="team-selector"
            id="team-selector"
            defaultValue={null}
            value={team}
            label="Team"
            onChange={handleChange}
          >
              <MenuItem value={null} className='center'>
             <em>None</em></MenuItem>
             {teamName.map(ma => (
                <MenuItem value={ma.id}>{ma.team_name}</MenuItem>
             ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200}}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listOfEmployees}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Employee" />}
            labelId="team-selector"
            onChange={handleChangeEmployee}
          />
        </FormControl>
      </center>
    </div>
  );
}
export default selectTeam;