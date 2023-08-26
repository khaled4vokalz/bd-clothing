import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

export default function CartIcon() {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className='shopping-icon'></ShoppingIcon>
      <span className="item-count">0</span>
    </div>
  )
}
