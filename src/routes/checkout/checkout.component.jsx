import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartItemsTotal,
} from '../../store/cart/cart.selector';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.action';
import PaymentForm from '../../components/payment-form/payment-form.component';

export default function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItemTotal = useSelector(selectCartItemsTotal);
  const addItemHandler = cartItem =>
    dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = cartItem =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItemHandler = cartItem =>
    dispatch(clearItemFromCart(cartItems, cartItem));

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
            onAddItem={() => addItemHandler(cartItem)}
            onRemoveItem={() => removeItemHandler(cartItem)}
            onClearItem={() => clearItemHandler(cartItem)}
          />
        );
      })}
      <Total>Total: ${cartItemTotal}</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
}
