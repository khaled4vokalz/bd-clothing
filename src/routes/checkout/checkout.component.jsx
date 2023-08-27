import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

export default function Checkout() {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartItemTotal } = useContext(CartContext);
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>{
        cartItems.map((cartItem) => {
          return (
          <CheckoutItem 
              key={cartItem.id} 
              cartItem={cartItem} 
              onAddItem={() => addItemToCart(cartItem)}
              onRemoveItem={() => removeItemFromCart(cartItem)}
              onClearItem={() => clearItemFromCart(cartItem)}
            />
          )
        })
      }
      <span className='total'>Total: ${cartItemTotal}</span>
    </div>
  )
}
