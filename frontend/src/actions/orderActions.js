import {
    SUCCESS_USER_LOGIN,
    FAILURE_USER_UPDATE_PROFILE,
    REQUEST_USER_UPDATE_PROFILE,
    SUCCESS_USER_UPDATE_PROFILE
} from "../constants/userConstants";
import axios from "axios";
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, DELIVER_ORDER_FAIL, DELIVER_ORDER_REQUEST, DELIVER_ORDER_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS, LIST_ORDERS_FAIL, LIST_MY_ORDERS_FAIL,
    LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_SUCCESS, LIST_ORDERS_REQUEST, LIST_ORDERS_SUCCESS,
    PAY_ORDER_FAIL,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS
} from "../constants/orderConstants";
import {CLEAR_ITEMS_CART} from "../constants/cartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
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
            `/api/orders/add/`,
            order,
            config,
        )
        console.log(data)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })


        dispatch({
            type: CLEAR_ITEMS_CART,
            payload: data,
        })
        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
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
            `/api/orders/${id}/`,
            config,
        )

        dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: GET_ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAY_ORDER_REQUEST
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
            `/api/orders/${id}/pay/`,
            paymentResult,
            config,
        )

        dispatch({
            type: PAY_ORDER_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PAY_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELIVER_ORDER_REQUEST
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
            `/api/orders/${order._id}/deliver/`,
            {},
            config,
        )

        dispatch({
            type: DELIVER_ORDER_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: DELIVER_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_MY_ORDERS_REQUEST
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
            `/api/orders/myorders/`,
            config,
        )

        dispatch({
            type: LIST_MY_ORDERS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: LIST_MY_ORDERS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_ORDERS_REQUEST
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
            `/api/orders/`,
            config,
        )

        dispatch({
            type: LIST_ORDERS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: LIST_ORDERS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}