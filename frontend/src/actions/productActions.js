import axios from 'axios'
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,

    FETCH_PRODUCT_DETAILS_SUCCESS,
    FETCH_PRODUCT_DETAILS_FAIL,
    FETCH_PRODUCT_DETAILS_REQUEST,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    FETCH_TOP_PRODUCTS_REQUEST,
    FETCH_TOP_PRODUCTS_SUCCESS, FETCH_TOP_PRODUCTS_FAIL,
} from "../constants/productConstants";

export const listProducts = (keyword = '') => async (dispatch) => {
    try {

        dispatch({
            type: FETCH_PRODUCTS_REQUEST
        })


        const {data} = await axios.get(`/api/products${keyword}`)


        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCTS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try {
        // triggers reducer
        dispatch({type: FETCH_PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)

        // dispatching action
        dispatch({
            type: FETCH_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        const {data} = await axios.delete(
            `/api/products/delete/${id}/`,
            config,
        )
        console.log("Response Data: " + data)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_PRODUCT_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config,
        )
        console.log("Response Data: " + data)

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config,
        )
        console.log("Response Data: " + data)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        })

        dispatch({
            type: FETCH_PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


export const listTopProducts = () => async (dispatch) => {
    try {

        dispatch({
            type: FETCH_TOP_PRODUCTS_REQUEST
        })

        const {data} = await axios.get(`/api/products/top/`)


        dispatch({
            type: FETCH_TOP_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FETCH_TOP_PRODUCTS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}