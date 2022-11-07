import React from 'react';
import MngrTable from '../components/Chartcomponents/MngrTable';
import Potable from '../components/Chartcomponents/PoTable';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Leaders = () => {
  return (
    <div className='tables'>
    <Grid container boxShadow={'100px'} width={'80%'} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid xs={6}>
      
      <Item> <h1 className='center'>Manager</h1><MngrTable/></Item>
    </Grid>
    <Grid xs={6}>
    <Item> <h1 className='center'>Product Owner</h1><Potable/></Item>
  </Grid>
     </Grid>
     </div>
    
  );
};

