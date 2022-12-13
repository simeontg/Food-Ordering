import React, { useReducer } from 'react'
import CartContext from './cartContext'

const defaultCartState ={
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM'){
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id)
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }else{
            updatedItems = state.items.concat(action.payload)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedAmount = state.totalAmount - existingCartItem.price
        let updatedItems
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(i => i.id !== action.payload)
        }else{
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }

    if(action.type === 'CLEAR_CART'){
        return {
            items: [],
            totalAmount: 0
        }
    }

    return defaultCartState
}

const CartProvider = (props) => {

    const [cartState, dispatch] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatch({type: 'ADD_ITEM', payload: item})
    }
    const removeItemFromCartHandler = id => {
        dispatch({type: 'REMOVE_ITEM', payload: id})
    }

    const clearCartHandler = () => {
        dispatch({type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }


  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider