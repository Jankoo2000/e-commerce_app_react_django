import {createStore, combineReducers, applyMiddleware} from "redux";

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducers, productDetailsReducers} from './reducers/productReducers'
import {cartReducer} from "./reducers/cartReducers";
import {userLoginReducer} from "./reducers/userReducer";


// heare are stored all values in this objects
// state is stored in reducers ??, check google -> state -> tree
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


// when inicalized store loading userInfo
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


// pasing user info to "redux store"
const initialState = {
    cart: {cartItems: cartItemsFromStorage},
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


// reducer:
// This is the root reducer of your Redux store. The reducer is responsible for handling actions and updating the
// state of your application. It combines all your individual reducers (using combineReducers) to create the root reducer.
//
// initialState:
// This is an optional parameter representing the initial state of your Redux store. It defines the initial shape and
// values of your application's state. If you don't provide an initial state, it will typically be set to the default
// values defined in your reducers.
//
// composeWithDevTools:
// This function is used to enhance (ulepszyc) the store with the Redux DevTools extension. It takes one or more enhancers as
// arguments and composes them together to create an enhanced store. In this case, you are applying middleware and
// enhancing it with Redux DevTools.

// applyMiddleware(...middleware): This is where you apply middleware to the store. The applyMiddleware function takes
// middleware functions as arguments and returns an enhancer function that can be used with composeWithDevTools.
// In your code, ...middleware spreads an array of middleware functions, such as Redux Thunk, if you've included it,
// and applies them to the store.