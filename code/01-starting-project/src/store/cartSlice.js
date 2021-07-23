import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: true,
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        // default params ara state, action
        addItem(state, {payload}) {
            const newItem = payload
            state.totalQuantity++
            // find method return the existing item AS A REFERENCE not as a copy(in case of obj or arr)
            const existingItem = state.items.find(item => item?.id === newItem?.id)

            if(existingItem) {
                existingItem.quantity++
                existingItem.total = existingItem.quantity * existingItem.price
            } else {
                const updatedNewItem = { ...newItem, quantity: 1, total: newItem.price}
                state.items.push(updatedNewItem)
            }
        },
        decreaseItem(state, {payload}) {
            state.totalQuantity--
            const id = payload
            const existingItem = state.items.find(item => item?.id === id)

            if(!existingItem) return

            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.total = existingItem.quantity * existingItem.price
            }
        },
        toggleCart(state) {
            state.isVisible = !state.isVisible
        }
    }
})

export default cartSlice