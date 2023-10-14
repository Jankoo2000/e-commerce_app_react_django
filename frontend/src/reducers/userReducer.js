import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET, USER_DETAILS_RESET
} from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        // action.payload is a convention used to describe the data or payload associated with a dispatched action
        // return to userLogin object {loading: false, userInfo: data}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}
        // return null

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        // action.payload is a convention used to describe the data or payload associated with a dispatched action
        // return to userLogin object {loading: false, userInfo: data}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}


export const userDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}
        // does it return the state so here users that has been registered

        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}

        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        case USER_DETAILS_RESET:
            return {user: {}}

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        // does it return the state so here users that has been registered

        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}

        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}

        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}