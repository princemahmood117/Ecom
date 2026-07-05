import { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.get('/orders/cart');
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);