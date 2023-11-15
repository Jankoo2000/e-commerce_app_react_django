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
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST
} from "../constants/productConstants";

export const productListReducer =
    // state: This parameter represents the current state of your application.
    // It should be an object that reflects the structure of your application's state.
    // When the reducer is first called, state will be set to the initial state, usually defined as a default value or constant.

    // action: This parameter is an object that describes the action being dispatched.
    // It typically has a type property that indicates the action's type and may also contain additional data in the payload property.
    // (state = initialState, action) => {
    (state = {products: []}, action) => {
        switch (action.type) {
            case PRODUCT_LIST_REQUEST:
                return {loading: true, products: []}

            case PRODUCT_LIST_SUCCESS:
                return {loading: false, products: action.payload}
            // action.payload is a convention used to describe the data or payload associated with a dispatched action


            case PRODUCT_LIST_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }


export const productDetailsReducer =
    (state = {product: {reviews: []}}, action) => {
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST: // case defined in action
                // that has all the existing state data
                return {loading: true, ...state}

            case PRODUCT_DETAILS_SUCCESS:
                return {loading: false, product: action.payload}

            case PRODUCT_DETAILS_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST: // case defined in action
            // that has all the existing state data
            return {loading: true}

        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}

        case PRODUCT_DELETE_FAIL:
            return {loading: false, success: action.payload}

        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST: // case defined in action
            // that has all the existing state data
            return {loading: true}

        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_CREATE_FAIL:
            return {loading: false, success: action.payload}

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const productUpdateReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}

        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_UPDATE_FAIL:
            return {loading: false, success: action.payload}

        case PRODUCT_UPDATE_RESET:
            return {product: {}}

        default:
            return state
    }
}


export const productTopRatedReducer =
    (state = {products: []}, action) => {
        switch (action.type) {
            case PRODUCT_TOP_REQUEST: // case defined in action
                // that has all the existing state data
                return {loading: true, products: []}

            case PRODUCT_TOP_SUCCESS:
                return {loading: false, products: action.payload}

            case PRODUCT_TOP_FAIL:
                return {loading: false, error: action.payload}
            default:
                return state
        }
    }