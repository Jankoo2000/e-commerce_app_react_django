import {createStore, combineReducers, applyMiddleware} from "redux";

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducers, productDetailsReducers} from './reducers/productReducers'
import {cartReducer} from "./reducers/cartReducers";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from "./reducers/userReducer";
import {orderCreateReducer, orderDetailsReducer} from "./reducers/orderReducers";


// here are stored all values in these objects
// all states
const reducer = combineReducers({

    productList: productListReducers, // state : value
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

// when initialized store loading userInfo
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

// initializing (after start or reload of app)
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage}
}


const middleware = [thunk]

// The store holds the current state of your application.
const store = createStore(
    reducer, // Reducer(s)
    initialState, // Initial state
    composeWithDevTools( // Enhancers (Redux DevTools)
        applyMiddleware(...middleware)// Middleware
    )
)

export default store

// When you refresh a website, the code in your store.js file, which sets up the Redux store, is indeed called again.
// Reloading the website effectively restarts the entire application, including the initialization process.