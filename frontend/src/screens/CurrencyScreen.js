import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import {currencyActions} from "../actions/currencyActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function CurrencyScreen() {
    const dispatch = useDispatch();
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const currencyList = useSelector(state => state.currencyList)
    const {loading, success, currencies, error} = currencyList


    useEffect(() => {
        dispatch(currencyActions(selectedCurrency));
    }, [selectedCurrency]);


    const handleChange = (selectedOption) => {
        if (selectedOption !== null) {
            setSelectedCurrency(selectedOption.value);
        }
    };

    // if currencies are empty and the beginning its empty
    const options = currencies && currencies['data']
        ? Object.keys(currencies['data']).map((currencyCode) => ({
            value: currencyCode,
            label: currencyCode,
        }))
        : [];

    return (
        <div>
            <Select
                id="currencySelect"
                value={options.find(option => option.value === selectedCurrency)}
                onChange={handleChange}
                options={options}
                isClearable
                placeholder="Select Currency"
                isSearchable
            />
            {loading ? <Loader/> :
                error ? <Message variant='danger'>{error}</Message> :
                    currencies && currencies['data'] && (
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(currencies['data']).map((currencyCode) => {
                                const currency = currencies['data'][currencyCode];
                                return (
                                    <tr key={currencyCode}>
                                        <td>{currency.code}</td>
                                        <td>{currency.value.toFixed(5)}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    )}
        </div>
    );
}

export default CurrencyScreen;
