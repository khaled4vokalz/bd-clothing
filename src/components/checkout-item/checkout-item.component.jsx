import {
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Arrow,
  Value,
} from './checkout-item.styles';

export default function CheckoutItem({
  cartItem,
  onAddItem,
  onRemoveItem,
  onClearItem,
}) {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={onRemoveItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={onAddItem}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={onClearItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}
