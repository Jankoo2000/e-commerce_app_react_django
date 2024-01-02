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
    CREATE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET, FETCH_TOP_PRODUCTS_SUCCESS, FETCH_TOP_PRODUCTS_FAIL, FETCH_TOP_PRODUCTS_REQUEST
} from "../constants/productConstants";

export const productListReducer =

    (state = {products: []}, action) => {
        switch (action.type) {
            case FETCH_PRODUCTS_REQUEST:
                return {loading: true, products: []}

            case FETCH_PRODUCTS_SUCCESS:
                return {loading: false, products: action.payload}


            case FETCH_PRODUCTS_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }


export const productDetailsReducer =
    (state = {product: {reviews: []}}, action) => {
        switch (action.type) {
            case FETCH_PRODUCT_DETAILS_REQUEST:
                return {loading: true, ...state}

            case FETCH_PRODUCT_DETAILS_SUCCESS:
                return {loading: false, product: action.payload}

            case FETCH_PRODUCT_DETAILS_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST: // case defined in action
            return {loading: true}

        case DELETE_PRODUCT_SUCCESS:
            return {loading: false, success: true}

        case DELETE_PRODUCT_FAIL:
            return {loading: false, success: action.payload}

        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {loading: true}

        case CREATE_PRODUCT_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case CREATE_PRODUCT_FAIL:
            return {loading: false, success: action.payload}

        case CREATE_PRODUCT_RESET:
            return {}

        default:
            return state
    }
}


export const productUpdateReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {loading: true}

        case UPDATE_PRODUCT_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case UPDATE_PRODUCT_FAIL:
            return {loading: false, success: action.payload}

        case UPDATE_PRODUCT_RESET:
            return {product: {}}

        default:
            return state
    }
}


export const productTopRatedReducer =
    (state = {products: []}, action) => {
        switch (action.type) {
            case FETCH_TOP_PRODUCTS_REQUEST:
                return {loading: true, products: []}

            case FETCH_TOP_PRODUCTS_SUCCESS:
                return {loading: false, products: action.payload}

            case FETCH_TOP_PRODUCTS_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }