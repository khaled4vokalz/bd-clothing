import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, itemToAdd) => {
  const newCartItems = [...cartItems];
  // find if cartItems contains itemToAdd
  const existingItemIndex = cartItems.findIndex(item => item.id === itemToAdd.id);
  // if found, increment quantity
  if (existingItemIndex !== -1) {
    const existingItem = cartItems[existingItemIndex];
    const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 }
    newCartItems[existingItemIndex] = updatedItem;
  } else {
    newCartItems.push({ ...itemToAdd, quantity: 1 });
  }
  return newCartItems;
}

const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToClear.id);
}

const removeCartItem = (cartItems, itemToRemove) => {
  const existingItem = cartItems.find(item => item.id === itemToRemove.id);
  if(existingItem) {
    if(existingItem.quantity === 1){
      return cartItems.filter(item => item.id !== itemToRemove.id)
    } else {
      return cartItems.map(cartItem => {
        if(cartItem.id === itemToRemove.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1
          }
        } else {
          return cartItem;
        }
      })
    }
  } 
  return [ ...cartItems ];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartItemTotal: 0,
});

export const CartProvier = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItemTotal, setCartItemTotal] = useState(0);

  useEffect(() => {
    const newCartItemCountAndPrice = cartItems.reduce(({ count, total }, cartItem) => ({
      count: count + cartItem.quantity,
      total: ((count + cartItem.quantity) * cartItem.price)
    }), { count: 0, total: 0 });
    setCartItemCount(newCartItemCountAndPrice.count);
    setCartItemTotal(newCartItemCountAndPrice.total);
  }, [cartItems])

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  }

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  }

  const clearItemFromCart = (itemToClear) => {
setCartItems(clearCartItem(cartItems, itemToClear));
  }
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartItemCount, cartItemTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
