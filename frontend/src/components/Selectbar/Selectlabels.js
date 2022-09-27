import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';



export default function Selectlabels() {
  const [team, setTeam] = React.useState('');

  const handleChange = (event) => {
    setTeam(event.target.value);
  };

  return (
    <div>
      <center>
      <FormControl sx={{ m: 2, minWidth:100, width:400}}>
        <InputLabel id="team-selector" >Team</InputLabel>
        <Select
          labelId="team-selector"
          id="team-selector"
          value={team}
          label="Team"
          onChange={handleChange}
      
        >
          <MenuItem value="" className='center'>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Bull"}>Bull</MenuItem>
          <MenuItem value={"Gama"}>Game</MenuItem>
          <MenuItem value={"Edge"}>Edge</MenuItem>
        </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 100, width: 400}}>
           <TextField id="outlined-basic" label="Name" variant="outlined">
            <em>
              name
            </em>
           </TextField>
           </FormControl>
           </center>

    </div>
  );
}