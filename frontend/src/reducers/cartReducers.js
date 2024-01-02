import {
    REMOVE_ITEM_FROM_CART,
    ADD_ITEM_TO_CART,
    SAVE_SHIPPING_ADDRESS_CART,
    SAVE_PAYMENT_METHOD_CART, CLEAR_ITEMS_CART
} from "../constants/cartConstants";



export const cartReducer =
    (state = {cartItems: [], shippingAddress: {}}, action) => {
        console.log('CART REDUCER')
        switch (action.type) {
            case ADD_ITEM_TO_CART:
                const item = action.payload
                const existItem = state.cartItems.find(x => x.product === item.product)

                if (existItem) {

                    return {
                        ...state,
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

            case REMOVE_ITEM_FROM_CART:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }

            case SAVE_SHIPPING_ADDRESS_CART:
                return {
                    ...state,
                    shippingAddress: action.payload
                }

            case SAVE_PAYMENT_METHOD_CART:
                return {
                    ...state,
                    paymentMethod: action.payload
                }

            case CLEAR_ITEMS_CART:
                return {
                    ...state,
                    cartItems: []
                }

            default:
                return state
        }
    }