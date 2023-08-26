import { createContext, useState } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { }
});

export const CartProvier = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(cartItems, itemToAdd));
  }
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
