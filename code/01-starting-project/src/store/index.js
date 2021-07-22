import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice';
import counterSlice from './counter-slice';

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
    }
})

// *optionally can be exported on each individual file instead of all in this index file
// export const authActions = authSlice.actions;
// export const counterActions = counterSlice.actions;

export default store