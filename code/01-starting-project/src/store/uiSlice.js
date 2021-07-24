import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { notification: null },
    reducers: {
        showNotification(state, {payload}) {
            const { status, title, message } = payload

            state.notification = {
                status,
                title,
                message
            }
        }
    }
})

export default uiSlice