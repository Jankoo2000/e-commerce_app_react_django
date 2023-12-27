import {GET_CURRENCIES_FAIL, GET_CURRENCIES_REQUEST, GET_CURRENCIES_SUCCESS} from "../constants/currencyConstants";



export const currencyListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CURRENCIES_REQUEST:
            return {
                loading: true
            }
        case GET_CURRENCIES_SUCCESS:
            return {
                loading: false,
                success: true,
                currencies: action.payload
            }
        case GET_CURRENCIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}