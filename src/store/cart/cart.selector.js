import { createSelector } from 'reselect';

const cartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [cartReducer],
  cartSlice => cartSlice.cartItems
);
export const selectIsCartOpen = createSelector(
  [cartReducer],
  cartSlice => cartSlice.isCartOpen
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    )
);
