import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartActive, setIsCartActive] = useState(false);

  const toggleCartHandler = () => {
    setIsCartActive((prevState) => !prevState);
  };
  return (
    <CartProvider>
      {isCartActive && <Cart onToggle={toggleCartHandler} />}
      <Header onCartToggle={toggleCartHandler} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
