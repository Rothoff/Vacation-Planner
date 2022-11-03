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


function createData(name, capacity, team, vacDays, workDays, schedule) {
    return {
        name,
        team,
        capacity,
        vacDays,
        workDays,
        schedule,
        history: [
            {

            },
            {

            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);



    const [checked, setChecked] = React.useState(false);

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
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.team}</TableCell>
                <TableCell align="right">{row.capacity}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h8" gutterBottom component="div">
                                Schedule
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>

                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell> {row.schedule} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">{row.workDays}</TableCell>
                                        <TableCell align="right">{row.vacDays}</TableCell>

                                    </TableRow>

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
    createData('Sprint 1', 50, 'Team1', "vacation: " + 5, "work: " + 5),
    createData('Sprint 2', 100, 'Team1', "vacation: " + 0, "work:" + 10),
    createData('Sprint 3', 100, 'Team1', "vacation: " + 0, "work:" + 10),
    createData('Sprint 4', 100, 'Team2', "vacation: " + 0, "work:" + 10),
    createData('Sprint 5', 100, 'Team2', "vacation: " + 0, "work:" + 10),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                       
                       <TableCell></TableCell>
                        <TableCell> Name</TableCell>
                        <TableCell align="right">Team</TableCell>
                        <TableCell align="right">Capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}