import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import uiSlice from './uiSlice'

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,
    }
})

export const cartActions = cartSlice.actions 
export const uiActions = uiSlice.actions 

export default store