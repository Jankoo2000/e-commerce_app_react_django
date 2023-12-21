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
    FAILURE_USER_UPDATE
} from "../constants/userConstants";
import axios from "axios";
import {LIST_MY_ORDERS_RESET} from "../constants/orderConstants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REQUEST_USER_LOGIN
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // logging
        const {data} = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password}, // data being sent to the server
            config
        )

        // triggers reducer
        dispatch({
            type: SUCCESS_USER_LOGIN,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: FAILURE_USER_LOGIN,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT,
    })

    // it's necessary to solve error
    // ERROR
    // log in ->log out -> log in to another account -> check data user profile (displaying old data from previous log in
    // -> rehresh -> actual data profile
    dispatch({
        type: RESET_USER_DETAILS,
    })
    dispatch({
        type: LIST_MY_ORDERS_RESET,
    })
    dispatch({
        type: RESET_USER_LIST,
    })
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REQUEST_USER_REGISTER
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // logging
        const {data} = await axios.post(
            '/api/users/register/',
            {'name': name, 'email': email, 'password': password}, // data being sent to the server
            config
        )

        // triggers reducer
        dispatch({
            type: SUCCESS_USER_REGISTER,
            payload: data,
        })

        dispatch({
            type: SUCCESS_USER_LOGIN,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: FAILURE_USER_REGISTER,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_USER_DETAILS
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  // sending token to verify user and get access
            }
        }

        // logging
        const {data} = await axios.get(
            `/api/users/${id}/`,
            config
        )


        dispatch({
            type: SUCCESS_USER_DETAILS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: FAILURE_USER_DETAILS,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}

// getState - Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_USER_UPDATE_PROFILE
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
            `/api/users/profile/update/`,
            user,
            config,
        )

        dispatch({
            type: SUCCESS_USER_UPDATE_PROFILE,
            payload: data,
        })

        dispatch({
            type: SUCCESS_USER_LOGIN,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: FAILURE_USER_UPDATE_PROFILE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}

// getState - Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_USER_LIST
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
            `/api/users/`,
            config,
        )

        dispatch({
            type: SUCCESS_USER_LIST,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: FAILURE_USER_LIST,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_USER_DELETE
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
        const {data} = await axios.delete(
            `/api/users/delete/${id}/`,
            config,
        )

        dispatch({
            type: SUCCESS_USER_DELETE,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: FAILURE_USER_DELETE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}

// entire user object
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        console.log('USER _ID: ' + user._id )
        dispatch({
            type: REQUEST_USER_UPDATE
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
            `/api/users/update/${user._id}/`,
            user,
            config,
        )

        dispatch({
            type: SUCCESS_USER_UPDATE,
        })

        dispatch({
            type: SUCCESS_USER_DETAILS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FAILURE_USER_UPDATE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}