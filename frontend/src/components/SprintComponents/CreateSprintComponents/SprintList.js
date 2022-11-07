import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import { width } from '@mui/system';
import { Mp } from '@mui/icons-material';



function createData(sprint, date, totalCapacity) {
    return {
        sprint, date, totalCapacity,
    };
}

function empListsData(employeeName, employeeCapacity){
    return {employeeName, employeeCapacity}
}




function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const [checked, setChecked] = React.useState(false);

    const empli = [
        empListsData('Fredrik', '80%'),
        empListsData('Erik', '40%'),
        empListsData('Albin', '20%'),
        empListsData('Sara', '95%')
    ]



    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.sprint}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.totalCapacity}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sprint 1 Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead align="left"></TableHead>
                                <TableBody>
                              
                                    <TableRow>
                             
                                        <TableCell>Name</TableCell>
                                        <TableCell>Capacity</TableCell>
                                        </TableRow>  
                                        {empli.map(mp => (
                                        <TableRow> 
                                        <TableCell align="left">{mp.employeeName}</TableCell>
                                        <TableCell align="left">{mp.employeeCapacity}</TableCell>   
                                    </TableRow>
                                    ))}
                                </TableBody>
                           
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}





const rows = [
    createData('1', '1 Aug - 14 Aug', '90%'),
    createData('2', '15 Aug - 31 Aug', '90%'),
    createData('3', '1 Sep - 14 Sep', '80%'),
    createData('4', '15 Sep - 30 Sep', '60%' )
];

export default function CollapsibleTable() {
    return (
        <TableContainer sx={{width:'1000px'}} component={Paper} >
            <Table  aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                       
                       <TableCell></TableCell>
                        <TableCell>Sprint</TableCell>
                        <TableCell align="center">Dates</TableCell>
                        <TableCell align="center">Capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.sprint} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}