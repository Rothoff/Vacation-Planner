import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Paper, Button, IconButton } from '@mui/material';
import { Chart } from "react-google-charts";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ButtonGroup from '@mui/material/ButtonGroup';

const SelectMonth = ({ onChange }) => {

    const [count, setCount] = useState(0);
    const [month, setMonth] = useState('');
    const [week, setWeek] = useState('');
    const [weeks, setWeeks] = useState([])


    useEffect(() => {
        function triggerOnChange() {
            if (checked2 == false) {
                setWeek(0);
                if (count == 13) {
                    setCount(0);
                }
                setMonth(count);
                onChange(null, count);
            } else if (checked1 == false) {
                setMonth(0);
                if (count == 22) {
                    setCount(0)
                }
                setWeek(count);
                onChange(count, null);
            }
        }
        triggerOnChange();
    }, [count])

    useEffect(() => {
        function loadWeeks() {
            const array = [];
            for (let i = 15; i < 33; i++) {
                array.push(i);
            }
            setWeeks(array);
        }
        loadWeeks();
    }, []);

    const handleClickPositive = () => {
        setCount(count + 1);
    };
    const handleClickNegative = () => {
        setCount(count - 1);
    };


    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    const onWeekSelection = (event) => {
        setWeek(event.target.value)
        setCount(event.target.value)
    }

    const onMonthSelection = (event) => {
        setMonth(event.target.value)
        setCount(event.target.value)
    }


    const toggleCheckBox = event => {
        setChecked1(event.target.checked1)
        setChecked2(false)
        return checked1
    }

    const toggleCheckBox2 = event => {
        setChecked2(event.target.checked2)
        setChecked1(false)
        return checked2
    }
    const toggleCheckBox3 = () => {
        setChecked2(false)
        setChecked1(false)
    }

    function CheckBoxes() {
        return (

            <div id="buttonBox">
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button
                        onClick={toggleCheckBox2}
                        value="1"
                        id="CheckWeek"
                    >Week</Button>
                    <Button
                        onClick={toggleCheckBox}
                        value="2"
                        id="CheckMonth"
                    >Month</Button>
                    <Button
                        onClick={toggleCheckBox3}
                        value="3"
                        id="CheckYear"
                    >Year</Button>
                </ButtonGroup>

            </div>
        );
    }
    function MenuThing() {
        if (checked2 == false) {
            return (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Month</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={month}
                        label="Month"
                        onChange={onMonthSelection}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>
            );
        } else if (checked1 == false) {
            return (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Weeks</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={week}
                        label="Weeks"
                        onChange={onWeekSelection}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={1}>15</MenuItem>
                        <MenuItem value={2}>16</MenuItem>
                        <MenuItem value={3}>17</MenuItem>
                        <MenuItem value={4}>18</MenuItem>
                        <MenuItem value={5}>19</MenuItem>
                        <MenuItem value={6}>20</MenuItem>
                        <MenuItem value={7}>21</MenuItem>
                        <MenuItem value={8}>22</MenuItem>
                        <MenuItem value={9}>23</MenuItem>
                        <MenuItem value={10}>24</MenuItem>
                        <MenuItem value={11}>25</MenuItem>
                        <MenuItem value={12}>26</MenuItem>
                        <MenuItem value={13}>27</MenuItem>
                        <MenuItem value={14}>28</MenuItem>
                        <MenuItem value={15}>29</MenuItem>
                        <MenuItem value={16}>30</MenuItem>
                        <MenuItem value={17}>31</MenuItem>
                        <MenuItem value={18}>32</MenuItem>
                        <MenuItem value={19}>33</MenuItem>
                        <MenuItem value={20}>34</MenuItem>
                        <MenuItem value={21}>35</MenuItem>
                    </Select>
                </FormControl>
            );
        }
    }


    return (
        <div id="parentDiv">
            <div id="checkbox"><CheckBoxes /></div>
            <div id="ymw">
                <div id="button" onClick={handleClickNegative}><IconButton><ArrowBackIcon /></IconButton></div>
                <div><MenuThing /></div>
                <div id="button" onClick={handleClickPositive}> <IconButton><ArrowForwardIcon /></IconButton>  </div>
            </div>
        </div>

    );

}
export default SelectMonth;