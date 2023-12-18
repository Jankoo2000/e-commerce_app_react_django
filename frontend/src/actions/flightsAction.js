import axios from "axios";
import {GET_FLIGHTS_FAIL, GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS} from "../constants/flightsConstants";

export const getFlights = (parameters) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_FLIGHTS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        // const config = {
        //     headers: {
        //         'Content-type': 'application/json',
        //         Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
        //     }
        // }

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
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}