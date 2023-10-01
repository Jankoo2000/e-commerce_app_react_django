import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";



// default structure of thunk so dont think about that
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //saving to local stage
    // localSotrage.setItem(key, value)
    // getState() is used to access the Redux state, .cart is used to access a specific slice of that state
    // cart: {cartItems: cartItemsFromStorage}

}

// In a Redux application, the reducer is listening (or more accurately, responding) to actions all the time.
// Reducers are pure functions that specify how the application's state should change in response to different actions.
// Whenever an action is dispatched, the Redux store calls the reducer, passing in the current state and the action
// as arguments.

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type:CART_REMOVE_ITEM,
        payload: id,
    })
    // after this dispatch , cartReducer response and it updates cartItems

    // updated cartItems is saved in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


