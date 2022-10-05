import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const totalAmount = cartCtx.totalAmount.toFixed(2);
	const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount:1});
  };

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					price={item.price}
					name={item.name}
					amount={item.amount}
					onRemove={cartItemRemoveHandler.bind(null, item.id)} // (noThis, arg_to_pass_to_next_function)
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const handleAction = (action) => {
		if (action === 'close') {
			cartCtx.setCartIsVisible((prevVal) => !prevVal);
			console.log('closing modal...');
		} else {
			cartCtx.setCartIsVisible((prevVal) => !prevVal);
			console.log('food order sent...');
		}
	};

	return (
		<Modal>
			{cartItems}
			<div className={classes.total}>
				<span>Total amount</span>
				<span>${totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button
					className={classes['button--alt']}
					onClick={() => handleAction('close')}>
					Close
				</button>
				{hasItems && (
					<button
						className={classes.button}
						onClick={() => handleAction('order')}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
