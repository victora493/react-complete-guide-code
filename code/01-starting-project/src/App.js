import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cartActions';

let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const isCartVisible = useSelector(state => state.cart.isVisible)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(({ui}) => ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])

  useEffect(() => {
    if(isInitial) {
      isInitial = false
      return
    }

    if(!cart.changed) return

    dispatch(sendCartData(cart))
  }, [cart])

  return (
    <Layout>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
