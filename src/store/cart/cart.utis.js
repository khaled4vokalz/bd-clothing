export const addCartItem = (cartItems, itemToAdd) => {
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

export const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToClear.id);
};

export const removeCartItem = (cartItems, itemToRemove) => {
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
