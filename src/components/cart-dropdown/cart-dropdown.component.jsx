import { useContext } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';
import { CartContext } from '../../context/cart.context';

export default function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {
          cartItems.map(cartItem => {
            return (
              <CartItem cartItem={cartItem} />
            )
          })

        }
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}
