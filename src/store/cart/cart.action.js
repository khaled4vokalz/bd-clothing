import { createAction } from '../../utils/reducer/reducer.util';
import { CART_ACTION_TYPES } from './cart.types';
import { addCartItem, clearCartItem, removeCartItem } from './cart.utis';

export const setIsCartOpen = value =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value);

export const addItemToCart = (cartItems, itemToAdd) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    addCartItem(cartItems, itemToAdd)
  );

export const removeItemFromCart = (cartItems, itemToRemove) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    removeCartItem(cartItems, itemToRemove)
  );

export const clearItemFromCart = (cartItems, itemToClear) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    clearCartItem(cartItems, itemToClear)
  );
