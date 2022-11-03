import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



const SelectEmployeeTeam = ({ onChange }) => {
  const [team, setTeam] = useState('');
  const [allEmployees, setAllEmployees] = useState([])
  const [employeeName, setEmployeeName] = useState ('');
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


  if (team !== null) {
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
    <div id = "team-employee-add-column">

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
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Sipa</MenuItem>
            <MenuItem value={2}>Wild</MenuItem>
            <MenuItem value={3}>Em</MenuItem>
            <MenuItem value={4}>Arch</MenuItem>
            <MenuItem value={5}>Bull</MenuItem>
            <MenuItem value={6}>Hos</MenuItem>
            <MenuItem value={7}>Gama</MenuItem>
            <MenuItem value={8}>Jazz</MenuItem>
            <MenuItem value={9}>HoPD</MenuItem>
            <MenuItem value={10}>Best</MenuItem>
            <MenuItem value={11}>Wolf</MenuItem>
            <MenuItem value={12}>Edge</MenuItem>
            <MenuItem value={13}>Po</MenuItem>
          </Select>
       
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200}}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listOfEmployees}
           
            renderInput={(params) => <TextField {...params} label="Employee" />}
            labelId="team-selector"
            onChange={handleChangeEmployee}
          />
        </FormControl>
      
        <Button
                variant="contained"
                color="success"
                value="2"    
            >
                add
            </Button>
     

    </div>
  );
}
export default SelectEmployeeTeam;