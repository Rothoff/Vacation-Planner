import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container ,Paper,Button} from '@mui/material';
import { teal } from '@mui/material/colors';


export default function Employee() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}

    const[employees,setEmployees]=useState([])


useEffect(()=>{
  fetch("http://localhost:8080/vacation/all")
  .then(res=>res.json())
  .then((result)=>{
    setEmployees(result);
  }
)
},[])
  return (

    <Container>
      
    <h1>Employees</h1>

    <Paper elevation={3} style={paperStyle}>

      {employees.map(vacation=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={vacation.id}>
         Week:{vacation.week.week_number}<br/>
         Name:{vacation.employee.first_name + " " + vacation.employee.last_name}<br/>
         Text:{vacation.text}
        </Paper>
      ))
}
    </Paper>

    </Container>
  );
}