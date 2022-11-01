import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';

export default function OutlinedButtons() {
    const [clicked, setClicked] = useState([])


    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    setClicked(1);   
                }}
            >
                Show sprints
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    setClicked(2);
                }}
            >
                Create sprint
            </Button>
        </Stack>
    );
}