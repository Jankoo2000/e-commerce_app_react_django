import {
    CART_REMOVE_ITEM,
    CART_ADD_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD, CART_CLEAR_ITEMS
} from "../constants/cartConstants";
import {PRODUCT_LIST_SUCCESS} from "../constants/productConstants";


// dispatch(action)
// dispatch({
//     type: PRODUCT_LIST_SUCCESS,
//     payload: data
// })

//
// The reason both parts are included in the returned object is to maintain the immutability principle of Redux.
// Redux expects that when you update the state, you return a completely new state object rather than modifying the existing state directly. Therefore:
//
// {...state} ensures that all other properties in the state remain unchanged, preserving their values.
// cartItems: state.cartItems.map(...) updates only the cartItems property, ensuring that the rest of the state
// remains the same.


// when you return new state you should also return currentState by ...state
export const cartReducer =
    //state (the current state, with a default value of an empty cart) and action (the action dispatched).
    (state = {cartItems: [], shippingAddress: {}}, action) => {
        console.log('CART REDUCER')
        switch (action.type) { // entering type filed form action object
            case CART_ADD_ITEM:
                const item = action.payload
                const existItem = state.cartItems.find(x => x.product === item.product) // entering filed cartItems (state object)
                // item.product is _id, because it's define in thath way in action

                if (existItem) {

                    return {
                        ...state, // returning shallow copy of state, and therefore the content of this entire structure
                        cartItems: state.cartItems.map(x =>
                            x.product === existItem.product ? item : x
                        )
                    }
                } else {
                    return {
                        ...state, // orginalState(currentState)  ...makes shallow copy
                        cartItems: [...state.cartItems, item] // it will add new item to array , ex [1,2,4,5,item] ,...state.cartItem is the old array
                        //you can only make copies of the original values, and then they can mutate the copies.

                    }
                }

            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }

            case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress: action.payload
                }

            case CART_SAVE_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod: action.payload
                }

            case CART_CLEAR_ITEMS:
                return {
                    ...state,
                    cartItems: []
                }

            default:
                return state
        }
    }