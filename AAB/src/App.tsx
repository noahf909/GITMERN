import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* import Navbar from './components/Navbar'; */
import Home from './pages/Home'; 
import Navbar from './components/Navbar';
import Products from './pages/Products'; 
import ProductDetail from './pages/ProductDetail'; // New detail page component
import About from './pages/About';
import Cart from './pages/Cart';  
import { CartProvider } from './context/CartContext'; 
import './App.css'
import Register from './pages/Register';

const App = () => {
  return (
    // Wrap the entire app in CartProvider to provide cart data across ALL components 
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} /> {/* Dynamic route */}
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};
export default App
