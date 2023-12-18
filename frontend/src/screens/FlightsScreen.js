import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFlights} from "../actions/flightsAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import SearchComponent from "../components/SearchBoxesFlight";

function FlightsScreen() {

    const dispatchAction = useDispatch();

    const flightList = useSelector(state => state.flightList);
    const {error: flightsListError, loading: flightsListLoading, flights: flightsList} = flightList;

    useEffect(() => {
        dispatchAction(getFlights());
        console.log('Hello')
    }, []);


    console.log(flightList)


    return (
        <div>
            <h1>Flights</h1>
            <SearchComponent/>
            {flightsListLoading ? <Loader/> :
                flightsListError ? <Message variant='danger'>{flightsListError}</Message> :
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>departure_info</th>
                            <th>arrival_info</th>
                            <th>departure_date</th>
                            <th>return_date</th>
                            <th>price</th>
                            <th></th>
                        </tr>

                        </thead>

                        <tbody>
                        {/*/!*{users.map((user) => (*!/*!/ thath does not work and i don't know why */}
                        {flightsList.map((flight) => (
                            <tr key={flight.booking_link}>
                                <td>{flight.departure_info}</td>
                                <td>{flight.arrival_info}</td>
                                <td>{flight.departure_date}</td>
                                <td>{flight.return_date}</td>
                                <td>{flight.price}</td>
                                <td>
                                    <Button variant='danger' className='btn-sm'>
                                        <Link to={flight.booking_link}
                                              style={{textDecoration: 'none', color: 'white'}}>
                                            GO TO AZAIR.EU
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
            }

        </div>
    )
}

export default FlightsScreen;