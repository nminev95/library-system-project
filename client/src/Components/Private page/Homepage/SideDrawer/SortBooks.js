import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 170,
    },
}));

export default function SortBooks() {
    const location = useLocation();
    const history = useHistory();
    const sample = 'sort=first_name&order=asc'
    const currentUrl = location.pathname + location.search

    const setSort = (event) => {
        const sortAndOrder = event.target.value.split('=');
        const sort = sortAndOrder[0];
        const order = sortAndOrder[1];

        if (event.target.value === 'none') {
            const res = currentUrl.split('&sort')
            const url = res[0];
            history.push(url);
            return;
        }

        if (currentUrl.includes('sort')) {
            const res = currentUrl.split('&sort')
            const url = res[0];
            history.push(`${url}&sort=${sort}&order=${order}`);
        } else {
            history.push(`${currentUrl}&sort=${sort}&order=${order}`);
        }
    }

    return (
        <div>
            <FormControl style={{ width: "190px" }}>
                <InputLabel htmlFor="grouped-select">Sort by</InputLabel>
                <Select defaultValue="" id="grouped-select" onChange={(ev) => setSort(ev)}>
                    <MenuItem value="none">
                        <em>Default (None)</em>
                    </MenuItem>
                    <ListSubheader>By title</ListSubheader>
                    <MenuItem value='title=asc' name="titleAsc">Alphabetically, A-Z</MenuItem>
                    <MenuItem value='title=desc' name="titleDesc">Alphabetically, Z-A</MenuItem>
                    <ListSubheader>By rating</ListSubheader>
                    <MenuItem value='rating=asc' name="ratingAsc">Highest to lowest</MenuItem>
                    <MenuItem value='rating=desc' name="ratingDesc">Lowest to highest</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}