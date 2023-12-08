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
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from "../constants/userConstants";
import axios from "axios";
import {ORDER_LIST_MY_RESET} from "../constants/orderConstants";
import {urlBackned} from "../constants/urlBackned";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            `${urlBackned}/api/users/login/`,
            {'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
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

    dispatch({
        type: USER_DETAILS_RESET,
    })
    dispatch({
        type: ORDER_LIST_MY_RESET,
    })
    dispatch({
        type: USER_LIST_RESET,
    })
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // logging
        const {data} = await axios.post(
            `${urlBackned}/api/users/register/`,
            {'name': name, 'email': email, 'password': password},
            config
        )

        // triggers reducer
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // logging
        const {data} = await axios.get(
            `${urlBackned}/api/users/${id}/`,
            config
        )


        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// getState - Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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
            `${urlBackned}/api/users/profile/update/`,
            user,
            config,
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
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
            type: USER_LIST_REQUEST
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
            `${urlBackned}/api/users/`,
            config,
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
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
            `${urlBackned}/api/users/delete/${id}/`,
            config,
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
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
            type: USER_UPDATE_REQUEST
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
            `${urlBackned}/api/users/update/${user._id}/`,
            user,
            config,
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, // return Response(message, status=status.HTTP_400_BAD_REQUEST)
        })
    }
}