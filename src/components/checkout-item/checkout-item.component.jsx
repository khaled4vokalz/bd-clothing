import './checkout-item.styles.scss';

export default function CheckoutItem ({cartItem, onAddItem, onRemoveItem, onClearItem}) {
  const {name, imageUrl, price, quantity} = cartItem;
  return (
  <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={onRemoveItem}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={onAddItem}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <span className='remove-button' onClick={onClearItem}>&#10005;</span>
    </div>
  )
}
