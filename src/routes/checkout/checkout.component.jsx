import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';

export default function Checkout() {
  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItemTotal,
  } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map(cartItem => {
        return (
          <CheckoutItem
            key={cartItem.id}
            cartItem={cartItem}
            onAddItem={() => addItemToCart(cartItem)}
            onRemoveItem={() => removeItemFromCart(cartItem)}
            onClearItem={() => clearItemFromCart(cartItem)}
          />
        );
      })}
      <Total>Total: ${cartItemTotal}</Total>
    </CheckoutContainer>
  );
}
