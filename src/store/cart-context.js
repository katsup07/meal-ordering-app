import React from 'react';

const CartContext = React.createContext({
  cartIsVisible: false,
  setCartIsVisible(){},
  
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;