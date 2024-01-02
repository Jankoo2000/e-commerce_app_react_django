import axios from "axios";
import {GET_FLIGHTS_FAIL, GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS} from "../constants/flightsConstants";

export const getFlights = (parameters) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_FLIGHTS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const {data} = await axios.get(
            `/api/flights/`,
            {params : parameters}
        )

        dispatch({
            type: GET_FLIGHTS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_FLIGHTS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}