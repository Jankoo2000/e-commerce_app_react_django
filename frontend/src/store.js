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
    orderDeliverReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer
} from "./reducers/orderReducers";
import {flightsListReducer} from "./reducers/flightsReducer";
import {currencyListReducer} from "./reducers/currencyReducers";
import {newsListReducer} from "./reducers/newsReducer";



const reducer = combineReducers({

    productList: productListReducer,
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
    currencyList: currencyListReducer,
    newsList: newsListReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// when initialized store loading userInfo
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

// initializing (after start or reload of app)
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage},
    newsList: {loading: true}
}


const middleware = [thunk]


const store = createStore(reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    ))

export default store

