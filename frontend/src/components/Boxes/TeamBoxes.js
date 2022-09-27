import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: 20,
  minHeight:50,
  height:150,
  background:'pink',
}));

export default function TeamBoxes() {
  return (
   <div className='center'>
    <Box sx={{ display: 'flex', justifyContent: 'center', width:'60%' }}>
      <Grid className='centerBoxes' container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(13)).map((_, index) => (
          <Grid item sx={{ '&:hover': { opacity: [0.9, 0.8, 0.7],},}} 
          xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
     
    </Box>
    </div>
  );
}
/** 
export default function TeamBoxes() {
  return (
    <Box className='center'
      sx={{ m: 4,
        width: 300,
        height: 300,
        display:'flex',
        justifyContent:'center',
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
 
} */