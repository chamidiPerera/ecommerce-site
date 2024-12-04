import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeContext } from './contexts/ThemeContext';
import Home from './screens/home/Home';
import NavBar from './components/navBar/NavBar';
import SignIn from './screens/signIn/SignIn';
import Products from './screens/products/Products';
import ProductDetails from './components/productDetails/ProductDetails';
import Cart from './screens/cart/Cart';
import Footer from './components/footer/Footer';
import Favorites from './screens/favorites/Favorites';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    console.log({ theme });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorite" element={<Favorites />} />
          </Routes>
          <Toaster />
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
