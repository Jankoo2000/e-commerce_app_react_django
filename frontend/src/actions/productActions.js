import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
import {ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS} from "../constants/orderConstants";
import {urlBackned} from "../constants/urlBackned";

// ACTIONS - EVENTS
// {
//     type: PRODUCT_LIST_SUCCESS,
//     payload: data
// }
// actions typically represent the logic or functionality of your application
// Actions are dispatched to describe events or intentions that occur within your application.
export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        // dispatching action
        // triggers reducer ??(filters the possible reducers by type (switch(action.type))??

        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        // const {data} = await axios.get('/api/products/')
        const {data} = await axios.get(`${urlBackned}/api/products${keyword}`).catch(error => {
            console.log("ERROR: " + error)
        });


        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try {
        // triggers reducer
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`${urlBackned}/api/products/${id}`)

        // dispatching action
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        const {data} = await axios.delete(
            `${urlBackned}/api/products/delete/${id}/`,
            config,
        )
        console.log("Response Data: " + data)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        const {data} = await axios.post(
            `${urlBackned}/api/products/create/`,
            {},
            config,
        )
        console.log("Response Data: " + data)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        const {data} = await axios.put(
            `${urlBackned}/api/products/update/${product._id}/`,
            product,
            config,
        )
        console.log("Response Data: " + data)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


export const listTopProducts = () => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_TOP_REQUEST
        })

        // const {data} = await axios.get('/api/products/')
        const {data} = await axios.get(`${urlBackned}/api/products/top/`)

        // dispatching action
        // triggers reducer
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}