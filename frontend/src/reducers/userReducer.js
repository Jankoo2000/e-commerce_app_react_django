import {
    REQUEST_USER_LOGIN,
    FAILURE_USER_LOGIN,
    SUCCESS_USER_LOGIN,
    USER_LOGOUT,
    REQUEST_USER_REGISTER,
    SUCCESS_USER_REGISTER,
    FAILURE_USER_REGISTER,
    REQUEST_USER_DETAILS,
    SUCCESS_USER_DETAILS,
    FAILURE_USER_DETAILS,
    REQUEST_USER_UPDATE_PROFILE,
    SUCCESS_USER_UPDATE_PROFILE,
    FAILURE_USER_UPDATE_PROFILE,
    RESET_USER_UPDATE_PROFILE,
    RESET_USER_DETAILS,
    REQUEST_USER_LIST,
    SUCCESS_USER_LIST,
    FAILURE_USER_LIST,
    RESET_USER_LIST,
    REQUEST_USER_DELETE,
    SUCCESS_USER_DELETE,
    FAILURE_USER_DELETE,
    REQUEST_USER_UPDATE,
    SUCCESS_USER_UPDATE,
    FAILURE_USER_UPDATE, RESET_USER_UPDATE
} from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_USER_LOGIN:
            return {loading: true}

        case SUCCESS_USER_LOGIN:
            return {loading: false, userInfo: action.payload}


        case FAILURE_USER_LOGIN:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_USER_REGISTER:
            return {loading: true}

        case SUCCESS_USER_REGISTER:
            return {loading: false, userInfo: action.payload}


        case FAILURE_USER_REGISTER:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case REQUEST_USER_DETAILS:
            return {...state, loading: true}

        case SUCCESS_USER_DETAILS:
            return {loading: false, user: action.payload}

        case FAILURE_USER_DETAILS:
            return {loading: false, error: action.payload}

        case RESET_USER_DETAILS:
            return {user: {}}

        default:

            return state
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_USER_UPDATE_PROFILE:
            return {loading: true}

        case SUCCESS_USER_UPDATE_PROFILE:
            return {loading: false, success: true, userInfo: action.payload}

        case FAILURE_USER_UPDATE_PROFILE:
            return {loading: false, error: action.payload}

        case RESET_USER_UPDATE_PROFILE:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = {user: []}, action) => {
    switch (action.type) {
        case REQUEST_USER_LIST:
            return {loading: true}

        case SUCCESS_USER_LIST:
            return {loading: false, users: action.payload}

        case FAILURE_USER_LIST:
            return {loading: false, error: action.payload}

        case RESET_USER_LIST:
            return {users: []}
        default:

            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_USER_DELETE:
            return {loading: true}

        case SUCCESS_USER_DELETE:
            return {loading: false, success: true}

        case FAILURE_USER_DELETE:
            return {loading: false, error: action.payload}


        default:
            return state
    }
}

export const userUpdateReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case REQUEST_USER_UPDATE:
            return {loading: true}

        case SUCCESS_USER_UPDATE:
            return {loading: false, success: true}

        case FAILURE_USER_UPDATE:
            return {loading: false, error: action.payload}

        case RESET_USER_UPDATE:
            return {user: {}}


        default:
            return state
    }
}