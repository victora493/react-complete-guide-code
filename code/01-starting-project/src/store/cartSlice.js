import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: true,
    items: [],
    totalQuantity: 0,
    changed: false
}

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        // default params of a reducer are state, action
        replaceCart(state, {payload}) {
            state.items = payload?.items || []
            state.totalQuantity = payload?.totalQuantity || 0
        },
        addItem(state, {payload}) {
            const newItem = payload
            state.totalQuantity++
            state.changed = true
            // find method return the existing item AS A REFERENCE not as a copy(in case of obj or arr)
            const existingItem = state.items?.find(item => item?.id === newItem?.id) || null

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
            state.changed = true
            const id = payload
            const existingItem = state.items?.find(item => item?.id === id) || {}

            if(!existingItem) return

            if(existingItem.quantity === 1) {
                state.items = state.items?.filter(item => item.id !== id) || []
            } else {
                existingItem.quantity--
                existingItem.total = existingItem.quantity * existingItem.price
            }
        },
        toggleCart(state) {
            state.changed = false
            state.isVisible = !state.isVisible
        }
    }
})

export default cartSlice