import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import foodImage from '../../assets/food.bmp'

const Header = () => {
	return (
		<div>
			<>
				<header className={classes.header}>
					<h1>Luke's Meals</h1>
					<HeaderCartButton buttonText='Cart'/>
				</header>
				<div className={classes['main-image']}>
					<img src={foodImage} alt='Many kinds of food on a long rectangular table' />
				</div>
			</>
		</div>
	);
};

export default Header;
