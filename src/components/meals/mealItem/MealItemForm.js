import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm({id, onAddToCart}) {
  const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();
  
	function submitHandler(e) {
		e.preventDefault();

    const { value: enteredAmount} = amountInputRef.current;
    
    if(enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5)
      return setAmountIsValid(false);
   
    onAddToCart(Number(enteredAmount));
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
        id={id}
				label='Amount'
				input={{
          id: 'amount',
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
        ref={amountInputRef}
			/>
			<button >+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p> }
		</form>
	);
}

export default MealItemForm;
