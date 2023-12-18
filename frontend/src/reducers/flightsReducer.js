import {GET_FLIGHTS_FAIL, GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS} from "../constants/flightsConstants";

export const flightsListReducer =
    // state: This parameter represents the current state of your application.
    // It should be an object that reflects the structure of your application's state.
    // When the reducer is first called, state will be set to the initial state, usually defined as a default value or constant.

    // action: This parameter is an object that describes the action being dispatched.
    // It typically has a type property that indicates the action's type and may also contain additional data in the payload property.
    // (state = initialState, action) => {
    (state = {flights: []}, action) => {
        switch (action.type) {
            case GET_FLIGHTS_REQUEST:
                return {loading: true, flights: []}

            case GET_FLIGHTS_SUCCESS:
                return {loading: false, flights: action.payload}
            // action.payload is a convention used to describe the data or payload associated with a dispatched action

            case GET_FLIGHTS_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }