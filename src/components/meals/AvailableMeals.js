/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './mealItem/MealItem';
import classes from './AvailableMeals.module.css';

// === Helpers ===
function convertFromObjectToArray(mealsData) {
	const meals = [];
	for (const key in mealsData) {
		meals.push({
			id: key,
			description: mealsData[key].description,
			name: mealsData[key].name,
			price: mealsData[key].price,
		});
	}
	return meals;
}

//  == Component ==
const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading ]= useState(false);
  const [ httpError, setHttpError ] = useState(null);

  const fetchAndSetMeals = async () => {
    setIsLoading(true);
    const endpoint =
      'https://food-order-app-da6dd-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json';
    try {
      const response = await fetch(endpoint);
      if (!response.ok)
        throw new Error('Something went wrong. '+ response.statusText + ' ' + response.status);
      
      const mealsData = await response.json();
      setMeals(convertFromObjectToArray(mealsData));

    } catch (error) {
      setHttpError(error);
    } finally{
      setIsLoading(false);
    }
  };

	useEffect(() => {
		fetchAndSetMeals();
	}, []);

  // jsx to render
  const getMealsInfoContent = () => {
  let mealsInfoContent;

  if(httpError) return mealsInfoContent = <h2 className={classes.error}>Something went wrong. Error message: {httpError.message}.</h2>;

  if(isLoading) return mealsInfoContent = <h2>Loading meals...</h2>;
  
	if (meals && meals.length === 0) return mealsInfoContent = <h2>Currently there are no available meals.</h2>;
  // else
	return mealsInfoContent = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));
  }

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{getMealsInfoContent()}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;


// const DUMMY_MEALS = [
// 	{
// 		id: 'm1',
// 		name: 'Sushi',
// 		description: 'Finest fish and veggies',
// 		price: 22.99,
// 	},
// 	{
// 		id: 'm2',
// 		name: 'Schnitzel',
// 		description: 'A german specialty!',
// 		price: 16.5,
// 	},
// 	{
// 		id: 'm3',
// 		name: 'Barbecue Burger',
// 		description: 'American, raw, meaty',
// 		price: 12.99,
// 	},
// 	{
// 		id: 'm4',
// 		name: 'Green Bowl',
// 		description: 'Healthy...and green...',
// 		price: 18.99,
// 	},
// ];