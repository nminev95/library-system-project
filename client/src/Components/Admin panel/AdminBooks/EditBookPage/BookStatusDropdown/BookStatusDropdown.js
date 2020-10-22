import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const BookStatusDropdown = ({ currStatus, changeStatus }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        changeStatus(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Book status</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={currStatus}
                    onChange={handleChange}
                >
                    <MenuItem value={'Borrowed'}>Borrowed</MenuItem>
                    <MenuItem value={'Free'}>Free</MenuItem>
                    <MenuItem value={'Unlisted'}>Unlisted</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default BookStatusDropdown;