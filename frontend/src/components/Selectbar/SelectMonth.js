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

const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const SelectMonth = ({ onChange }) => {
    const [count, setCount] = useState(null);
    const [month, setMonth] = useState('');
    const [week, setWeek] = useState('');
    const [weekNr, setWeekNr] = useState([]); 
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const weekNrOnlyArr = [];
  
    useEffect(() => {
        function triggerOnChange() {
            if (checked2 == false) {
                setWeek(null);
                if (count == 13) {
                    setCount(1);
                } if (count == 0){
                    setCount(12)
                }
                setMonth(count);
                onChange(null, count);
                
            } else if (checked1 == false) {
                setMonth(null);
                if (count == weekNr.slice(-1)[0].week_number+1) {
                    setCount(weekNr[0].week_number)
                }else if (count > 52){
                    setCount(1)
                }
                setWeek(count);
                onChange(count, null);
            }
        }
        triggerOnChange();
    }, [count])
    
   
    const handleClickPositive = () => {
        setCount(count + 1);
    };
    const handleClickNegative = () => {
        setCount(count - 1);
    };
    
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
        console.log("månad")
        
    }
    const toggleCheckBox2 = event => {
        setChecked2(event.target.checked2)
        setChecked1(false)
        console.log("vecka")
        
    }
    const toggleCheckBox3 = () => {
        setCount(null)
    }
    useEffect(() => {
        fetch("http://localhost:8080/weeks")
          .then(res => res.json())
          .then((weekResult) => {
            setWeekNr(weekResult);
          }
          )
      }, [])
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
                    >Period</Button>
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
                       
                        <MenuItem value={null}><em>None</em></MenuItem>
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
                        <MenuItem value={null}><em>None</em></MenuItem>
                        {weekNr.map(week =>(
                             <MenuItem value={week.week_number}>{week.week_number}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
            );
        }else {
            setMonth(0);
            setWeek(null);
        }
    }
    return (
        <div id="monthParentDiv">
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