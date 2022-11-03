import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';

const OutlinedButtons = ({ onClick }) =>  {
    const [clicked, setClicked] = useState(null)

    console.log("from selectButtons:", clicked)



    const handleClick = (event) => {
        setClicked(event.target.value);
        onClick(event.target.value)
      };


    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                color="success"
                value="1"
                onClick={handleClick}

            >
                Show sprints
            </Button>
            <Button
                variant="contained"
                color="success"
                value="2"
                onClick={handleClick}
    

            >
                Create sprint
            </Button>
        </Stack>
    );
} 
export default OutlinedButtons;