import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* import Navbar from './components/Navbar'; */
import Home from './pages/Home'; 
import Products from './pages/Products'; 
import ProductDetail from './pages/ProductDetail'; // New detail page component
import About from './pages/About';
import Cart from './pages/Cart';  
import './App.css'
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Dynamic route */}
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};
export default App
