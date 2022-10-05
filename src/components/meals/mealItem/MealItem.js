import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = ({ name, description, price, id }) => {
  
	const priceRounded = `$${price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    console.log('ordering meal...', {name, description, price, id, amount });
    cartCtx.addItem({name, price, id, amount })
  }
  

	return (
		<li className={classes.meal}>
			<div>
				<h3>{name}</h3>
				<div className={classes.description}>{description}</div>
				<div className={classes.price}>{priceRounded}</div>
			</div>
			<div>
				<MealItemForm  onAddToCart={addToCartHandler} id={id} />
			</div>
		</li>
	);
};

export default MealItem;
