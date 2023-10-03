import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../constants/userConstants";




export const userLoginReducer =

    (state = {state: []}, action) => {
        switch (action.type) {
            case USER_LOGIN_REQUEST:
                return {loading: true}

            case USER_LOGIN_SUCCESS:
                return {loading: false, userInfo: action.payload}
            // action.payload is a convention used to describe the data or payload associated with a dispatched action

            case USER_LOGIN_FAIL:
                return {loading: false, error: action.payload}

            case USER_LOGOUT:
                return {}

            default:
                return state
        }
    }