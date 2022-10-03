import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import EmployeesOnVacation from '../Chartcomponents/VacationFilter';

const useSelectlabels = ({onChange}) => {
  const [team, setTeam] = React.useState('');

  const handleChange = (event) => {
    setTeam(event.target.value);
    onChange(event.target.value)
    return team;
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
export default useSelectlabels;
