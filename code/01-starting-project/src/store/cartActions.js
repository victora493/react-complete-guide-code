// * Custom actions are used for async code

import { uiActions, cartActions } from "./index";
import axios from "axios";

const URL = 'https://react-http-course-1bc49-default-rtdb.firebaseio.com/cart.json'

// action to fetch latest cart data in the db(needed when page first load)
export const fetchCartData = () => {
    return async dispatch => {
        try {
            const {data} = await getData()
            console.log(data)

            // dispatch the data payload to a reducer
            dispatch(cartActions.replaceCart(data))
        } catch (err) {
            console.log('😢 error:',err)
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching cart data failed!'
            }))
        }
    }
}

async function getData() {
    const res = await axios({
      method: 'get',
      url: URL,
    })

    console.log('server response:', res)
    return res
}

// action to send the latest cart state to db
export const sendCartData = (cart) => {
    return async dispatch => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))
        
        try {
            await sendRequest({
                items: (cart.items.length >= 0 && cart.items) || [],
                totalQuantity: cart.totalQuantity || 0
            })
        
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Sent',
                message: 'Cart data sent successfully!'
            }))
        
        } catch(err) {
            console.log('😢 error:',err)
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed!'
            }))
        }
    }
}

async function sendRequest(myCart) {
    const { items = [], totalQuantity = 0 } = myCart

    const res = await axios({
      method: 'put',
      url: URL,
      data: {
          items,
          totalQuantity
      }
    })

    console.log('server response:', res)
    return res
} 