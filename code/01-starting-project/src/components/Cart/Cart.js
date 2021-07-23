import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cart = useSelector(state => state.cart)

  function renderItems() {
    if(cart.items.length === 0) return (
      <li><p>There are no items in your cart</p></li>
    )

    return cart.items.map(item => (
      <CartItem key={item.id}
        item={item}
      />
    ))
  }

  if(!cart.isVisible) {
    return ''
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {renderItems()}
      </ul>
    </Card>
  );
};

export default Cart;
