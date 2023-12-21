import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_RESET,
    CREATE_ORDER_SUCCESS, DELIVER_ORDER_FAIL, DELIVER_ORDER_REQUEST, DELIVER_ORDER_RESET, DELIVER_ORDER_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    GET_ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_RESET,
    GET_ORDER_DETAILS_SUCCESS,
    ORDER_FAIL_REQUEST, LIST_ORDERS_FAIL, LIST_MY_ORDERS_FAIL,
    LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_RESET,
    LIST_MY_ORDERS_SUCCESS, LIST_ORDERS_REQUEST, LIST_ORDERS_SUCCESS,
    PAY_ORDER_FAIL,
    PAY_ORDER_REQUEST,
    PAY_ORDER_RESET,
    PAY_ORDER_SUCCESS,
    ORDER_SUCCESS_REQUEST
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_ORDER_RESET:
            return {}

        default:
            return state
    }
}

export const orderDetailsReducer = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case GET_ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case PAY_ORDER_REQUEST:
            return {
                loading: true,
            }
        case PAY_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case PAY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PAY_ORDER_RESET:
            return {}

        default:
            return state
    }
}


// we don't modify something then so when do not use ...state
// everytime we load new data
export const orderListMyReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case LIST_MY_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case LIST_MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case LIST_MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LIST_MY_ORDERS_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}


export const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case LIST_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case LIST_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case LIST_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case DELIVER_ORDER_REQUEST:
            return {
                loading: true,
            }
        case DELIVER_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case DELIVER_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELIVER_ORDER_RESET:
            return {}

        default:
            return state
    }
}
