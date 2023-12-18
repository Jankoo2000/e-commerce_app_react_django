import {createStore, combineReducers, applyMiddleware} from "redux";

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productTopRatedReducer
} from './reducers/productReducers'
import {cartReducer} from "./reducers/cartReducers";
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from "./reducers/userReducer";
import {
    orderCreateReducer,
    orderDeliver, orderDeliverReducer,
    orderDetailsReducer,
    orderListMy,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer
} from "./reducers/orderReducers";
import {flightsListReducer} from "./reducers/flightsReducer";


// here are stored all values in these objects
// all states
const reducer = combineReducers({

    productList: productListReducer, // state : value
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

    flightList: flightsListReducer,

})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// when initialized store loading userInfo
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

// initializing (after start or reload of app)
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage,
    }, userLogin: {userInfo: userInfoFromStorage}
}


const middleware = [thunk]

// The store holds the current state of your application.
const store = createStore(reducer, // Reducer(s)
    initialState, // Initial state
    composeWithDevTools( // Enhancers (Redux DevTools)
        applyMiddleware(...middleware)// Middleware
    ))

export default store

// When you refresh a website, the code in your store.js file, which sets up the Redux store, is indeed called again.
// Reloading the website effectively restarts the entire application, including the initialization process.