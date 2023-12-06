import {
    USER_LOGIN_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";
import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import {CART_CLEAR_ITEMS} from "../constants/cartConstants";
import {urlBackned} from "../constants/urlBackned";


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }
        // AYYlWYCO5Q4ovreI6AwFwPAaoJflhYFhXjc3zml0zcCvcIFQK-uop8qYyvEtHljX1JxO9zlQyEmdaQoA

        // logging
        // the order is important :  user, config
        const {data} = await axios.post(
            `${urlBackned}/api/orders/add/`,
            order,
            config,
        )
        console.log(data)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })
        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        // logging
        // the order is important :  user, config
        const {data} = await axios.get(
            `${urlBackned}/api/orders/${id}/`,
            config,
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        // logging
        // the order is important :  user, config
        const {data} = await axios.put(
            `${urlBackned}/api/orders/${id}/pay/`,
            paymentResult,
            config,
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        // logging
        // the order is important :  user, config
        const {data} = await axios.put(
            `${urlBackned}/api/orders/${order._id}/deliver/`,
            {},
            config,
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        // logging
        // the order is important :  user, config
        const {data} = await axios.get(
            `${urlBackned}/api/orders/myorders/`,
            config,
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        // logging
        // the order is important :  user, config
        const {data} = await axios.get(
            `${urlBackned}/api/orders/`,
            config,
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}