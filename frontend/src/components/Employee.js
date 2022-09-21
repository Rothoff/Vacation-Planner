import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container ,Paper,Button} from '@mui/material';
import { teal } from '@mui/material/colors';


export default function Employee() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}

    const[employees,setEmployees]=useState([])

     const handleClick=(e)=>{
        console.log("New Student added")
    
}

useEffect(()=>{
  fetch("http://localhost:8080/employee/all")
  .then(res=>res.json())
  .then((result)=>{
    setEmployees(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Refresh list</u></h1>

    <form noValidate autoComplete="off">

    <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    
    </form>
   
    </Paper>
    <h1>Employees</h1>

    <Paper elevation={3} style={paperStyle}>

      {employees.map(employee=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={employee.id}>
         Id:{employee.id}<br/>
         Name:{employee.first_name + " " + employee.last_name}<br/>
         Team:{employee.team_id}
        </Paper>
      ))
}
    </Paper>

    </Container>
  );
}