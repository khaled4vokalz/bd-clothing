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
  cartItemCount: 0,
});

export const CartProvier = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // useEffect(() => {
  //   const newCartItemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  //   setCartItemCount(newCartItemCount);
  // }, [cartItems])

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));

    // the following can be done using the above useEffect as well
    // but this implementation seems a bit easier and optimal
    setCartItemCount(cartItemCount + 1);
  }

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
    // the following can be done using the above useEffect as well
    // but this implementation seems a bit easier and optimal
    setCartItemCount(cartItemCount - 1);
  }
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, cartItemCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
