import React, { useState } from 'react';
import Header from './components/layout/Header.js';
import Cart from './components/cart/Cart';
import Meals from './components/meals/Meals.js';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  
	return (

			  <CartProvider cartIsVisible={cartIsVisible} setCartIsVisible={setCartIsVisible}>
			    <Header/>
			    {cartIsVisible && <Cart />}
			    {!cartIsVisible && (
			    	<main>
			    		<Meals />
			    	</main>
			    )}
			  </CartProvider>
	);
}

export default App;

// import React, { useState } from 'react';
// import Header from './components/layout/Header.js';
// import Cart from './components/cart/Cart';
// import Meals from './components/meals/Meals.js';
// import CartContext from './store/cart-context'

// function App() {
//   const [cartIsVisible, setCartIsVisible] = useState(false);
  
// 	return (

// 			<CartContext.Provider value={{ cartIsVisible, setCartIsVisible }}>
// 			  <Header/>
// 			  {cartIsVisible && <Cart />}
// 			  {!cartIsVisible && (
// 			  	<main>
// 			  		<Meals />
// 			  	</main>
// 			  )}
// 			</CartContext.Provider>

// 	);
// }

// export default App;
