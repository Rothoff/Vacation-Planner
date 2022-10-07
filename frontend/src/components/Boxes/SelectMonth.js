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
import { CheckBox, SetMealOutlined, ThirtyFpsSelect } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

const useSelectMonth = ({ onChange }) => {

    const [count, setCount] = useState(0);
    const [month, setMonth] = React.useState('');
    const [week, setWeek] = React.useState('');


    const handleChange = (event) => {
        setMonth(event.target.value);
        onChange(event.target.value);
        return month, week;
    };

    const handleChange2 = (event) => {
        setWeek(event.target.value);
        onChange(event.target.value);
        console.log(week);
        return week, month;
    };


    const weeks = [];
    for (let i = 0; i < 52; i++) {
        weeks.push(i);
    }

    useEffect(() => {
    }, [count]);

    const handleClickPositive = event => {
        setCount(count + 1);
        if (checked2 == false) {
            setWeek(0);
            if (count == 12) {
                setCount(0);
            }
            setMonth(count);
        } else if (checked1 == false) {
            setMonth(0);
            if (count == 20) {
                setCount(0)
            }
            setWeek(count);
        }
        onChange(count);
    };
    const handleClickNegative = event => {
        setCount(count - 1);
        if (checked2 == false) {
            setWeek(0);
            if (count == 0) {
                setCount(12);
            }
            setMonth(count);
        } else if (checked1 == false) {
            setMonth(0);
            if (count == 0) {
                setCount(20)
            }
            setWeek(count);
        }
        onChange(count);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    const toggleCheckBox = event => {
        setChecked2(false);
        setChecked1(event.target.checked1)
        return checked1
    }

    const toggleCheckBox2 = event => {
        setChecked1(false);
        setChecked2(event.target.checked2)
        return checked2
    }

    function CheckBoxes() {
        return (

            <div id="checkbox">
                <h3 id="textPosition">Month</h3>
                <Checkbox {...label}
                    checked={checked1}
                    onChange={toggleCheckBox}
                    value="1"
                    id="CheckMonth"
                />
                <h3 id="textPosition">Week</h3>
                <Checkbox {...label}
                    checked={checked2}
                    onChange={toggleCheckBox2}
                    value="2"
                    id="CheckWeek" />

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
                        onChange={handleChange}>
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
                        onChange={handleChange2}>
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
export default useSelectMonth;