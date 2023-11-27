import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './scenes/home/Home';
import ItemDetails from './scenes/itemDetails/ItemDetails';
import Checkout from './scenes/checkout/Checkout';
import Confirmation from './scenes/checkout/Confirmation';
import Navbar from './scenes/global/Navbar';
import CartMenu from './scenes/global/CartMenu';
import Footer from './scenes/global/Footer.jsx';

// Composant ScrollToTop pour remonter en haut de la page lors de la navigation
const ScrollToTop = () => {
  // Obtention de l'emplacement actuel
  const { pathname } = useLocation();

  // Effet de scroll vers le haut de la page lorsque le chemin de l'URL change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
