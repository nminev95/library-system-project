import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 170,
    },
}));

export default function SortBooks() {
    const classes = useStyles();
    const location = useLocation();
    const sample = 'sort_by=first_name&order=asc'

    const setSort = (event) => {
        
    }
    return (
        <div>
            <FormControl style={{ width: "190px" }}>
                <InputLabel htmlFor="grouped-select">Sort by</InputLabel>
                <Select defaultValue="" id="grouped-select"  onChange={(ev) => console.log(ev.target)}>
                    <MenuItem value="">
                        <em>Default (None)</em>
                    </MenuItem>
                    <ListSubheader>By title</ListSubheader>
                    <MenuItem value='titleAsc' name="titleAsc">Alphabetically, A-Z</MenuItem>
                    <MenuItem value='titleDesc' name="titleDesc">Alphabetically, Z-A</MenuItem>
                    <ListSubheader>By rating</ListSubheader>
                    <MenuItem value='ratingAsc' name="ratingAsc">Highest to lowest</MenuItem>
                    <MenuItem value='ratingDesc' name="ratingDesc">Lowest to highest</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}