import { useContext } from 'react';
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';
import { CartContext } from '../../context/cart.context';

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartItemCount}</ItemCount>
    </CartIconContainer>
  );
}
