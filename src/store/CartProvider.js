import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};
const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];

		// Item is already in array
		let updatedItems;
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		// It is not in array
		else updatedItems = state.items.concat(action.item);

		return { items: updatedItems, totalAmount: updatedTotalAmount };
	}
  
  if(action.type === 'REMOVE'){
    
    // update total amount for all meals
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    
    // if only one item left, remove from array
    let updatedItems = [...state.items];
    if(existingItem.amount === 1)
      updatedItems.splice(existingCartItemIndex, 1);
    else// decrease by 1
      updatedItems[existingCartItemIndex] = {...existingItem, amount: (existingItem.amount - 1)};
    
    return { items: updatedItems, totalAmount: updatedTotalAmount }
  }
	return defaultCartState;
};

// Store everything in one place
function CartProvider({ children, cartIsVisible, setCartIsVisible }) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD', item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE', id });
	};

	const cartContext = {
		cartIsVisible,
		setCartIsVisible,
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	);
}

export default CartProvider;
