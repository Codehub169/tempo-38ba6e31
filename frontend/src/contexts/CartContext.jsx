import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const TAX_RATE = 0.05; // 5% tax rate, as used in HTML previews
const LOCAL_STORAGE_KEY = 'foodOrderStatusCart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((itemFromApi) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === itemFromApi.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === itemFromApi.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // Adapt item from API to cart item structure
        const newItem = {
          id: itemFromApi.id,
          name: itemFromApi.name,
          price: parseFloat(itemFromApi.price), // Ensure price is a number
          image: itemFromApi.image_url || itemFromApi.image, // Prefer image_url from backend
          description: itemFromApi.description,
          quantity: 1
        };
        return [...prevItems, newItem];
      }
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    const numericQuantity = parseInt(quantity, 10);
    setCartItems(prevItems => {
      if (numericQuantity <= 0) {
        return prevItems.filter(item => item.id !== itemId); // Remove item if quantity is 0 or less
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: numericQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getCartTaxes = useCallback(() => {
    return getCartSubtotal() * TAX_RATE;
  }, [getCartSubtotal]); // Dependency on getCartSubtotal

  const getCartTotalAmount = useCallback(() => {
    const subtotal = getCartSubtotal();
    const taxes = subtotal * TAX_RATE;
    return subtotal + taxes;
  }, [getCartSubtotal]); // Dependency on getCartSubtotal

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getCartTotalItems,
    getCartTaxes,
    getCartTotalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
