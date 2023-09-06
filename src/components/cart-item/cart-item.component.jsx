import { CartItemContainer, CartItemDetails } from './cart-item.styles';

export default function CartItem({ cartItem }) {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <img src={`${imageUrl}`} alt={`${name}`} />
      <CartItemDetails>
        <span>{name}</span>
        <span>
          {quantity} X ${price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
}
