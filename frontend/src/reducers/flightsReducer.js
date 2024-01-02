import {GET_FLIGHTS_FAIL, GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS} from "../constants/flightsConstants";

export const flightsListReducer =

    (state = {flights: []}, action) => {
        switch (action.type) {
            case GET_FLIGHTS_REQUEST:
                return {loading: true, flights: []}

            case GET_FLIGHTS_SUCCESS:
                return {loading: false, flights: action.payload}

            case GET_FLIGHTS_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }