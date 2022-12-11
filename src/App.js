import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {

  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  return (
    <>
      { isCartOpen && <Cart onCloseCart={closeCart}/>}
      <Header onShowCart={openCart}/>
      <main>
        <Meals />
      </main>
      
    </>
  );
}

export default App;
