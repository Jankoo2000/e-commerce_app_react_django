import React, {useState} from 'react';
import {TextField, Grid, Button} from '@mui/material';
import Form from "react-bootstrap/Form";
import {getFlights} from "../actions/flightsAction";
import {useDispatch} from "react-redux";

const SearchComponent = () => {
    const dispatchAction = useDispatch();
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch = () => {
        // You can use the values stored in state here
        if (departure !== '' && destination !== '' && startDate !== '' && endDate !== '') {
            console.log('Departure:', departure);
            console.log('Destination:', destination);
            console.log('Start Date:', startDate);
            console.log('End Date:', endDate);
            dispatchAction(getFlights({
                departure: departure,
                destination: destination,
                startDate: startDate,
                endDate: endDate,
            }));
        }

    };

    return (
        <div style={{marginTop: '20px', marginBottom: '40px'}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        label="Departure"
                        variant="outlined"
                        fullWidth
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Destination"
                        variant="outlined"
                        fullWidth
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SearchComponent;
