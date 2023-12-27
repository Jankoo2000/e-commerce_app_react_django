import axios from "axios";
import {GET_CURRENCIES_FAIL, GET_CURRENCIES_REQUEST, GET_CURRENCIES_SUCCESS} from "../constants/currencyConstants";
import {CURRENCY} from "../constants/flightsConstants";

export const currencyActions = (currency) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CURRENCIES_REQUEST
        })


        // let {data} = await axios.get(
        //     `https://api.currencyapi.com/v3/latest?apikey=cur_live_k22SnI2HvF9Dcu6NdCAfSKhaIfAGXWsusMkdmARU&base_currency=${currency}`
        // )

        let data = CURRENCY


        dispatch({
            type: GET_CURRENCIES_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_CURRENCIES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}