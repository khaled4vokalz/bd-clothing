import { createContext, useReducer } from 'react';
import { cartReducer, CART_ACTION_TYPES } from '../reducers/cart-reducer';
import { createAction } from '../utils/reducer/reducer.util';

const addCartItem = (cartItems, itemToAdd) => {
  const newCartItems = [...cartItems];
  // find if cartItems contains itemToAdd
  const existingItemIndex = cartItems.findIndex(
    item => item.id === itemToAdd.id
  );
  // if found, increment quantity
  if (existingItemIndex !== -1) {
    const existingItem = cartItems[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };
    newCartItems[existingItemIndex] = updatedItem;
  } else {
    newCartItems.push({ ...itemToAdd, quantity: 1 });
  }
  return newCartItems;
};

const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToClear.id);
};

const removeCartItem = (cartItems, itemToRemove) => {
  const existingItem = cartItems.find(item => item.id === itemToRemove.id);
  if (existingItem) {
    if (existingItem.quantity === 1) {
      return cartItems.filter(item => item.id !== itemToRemove.id);
    } else {
      return cartItems.map(cartItem => {
        if (cartItem.id === itemToRemove.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        } else {
          return cartItem;
        }
      });
    }
  }
  return [...cartItems];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartItemTotal: 0,
});

const INTIAL_CART_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartItemCount: 0,
  cartItemTotal: 0,
};

export const CartProvier = ({ children }) => {
  const [{ cartItems, cartItemCount, cartItemTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INTIAL_CART_STATE);

  const calculateCartItemCountAndTotal = items =>
    items.reduce(
      ({ count, total }, cartItem) => ({
        count: count + cartItem.quantity,
        total: (count + cartItem.quantity) * cartItem.price,
      }),
      { count: 0, total: 0 }
    );

  const setCartItems = newCartItems => {
    const newCountAndTotal = calculateCartItemCountAndTotal(newCartItems);
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartItemCount: newCountAndTotal.count,
        cartItemTotal: newCountAndTotal.total,
      })
    );
  };

  const addItemToCart = itemToAdd => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  };

  const removeItemFromCart = itemToRemove => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  };

  const clearItemFromCart = itemToClear => {
    setCartItems(clearCartItem(cartItems, itemToClear));
  };

  const setIsCartOpen = value => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, value));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItemCount,
    cartItemTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
