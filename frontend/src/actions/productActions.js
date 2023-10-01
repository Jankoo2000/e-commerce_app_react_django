import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST
} from "../constants/productConstants";

// ACTIONS - EVENTS
// {
//     type: PRODUCT_LIST_SUCCESS,
//     payload: data
// }
// actions typically represent the logic or functionality of your application
// Actions are dispatched to describe events or intentions that occur within your application.
export const listProducts = () => async (dispatch) => {
    try {
        // dispatching action
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const {data} = await axios.get('/api/products/')

        // dispatching action
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)

        // dispatching action
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}