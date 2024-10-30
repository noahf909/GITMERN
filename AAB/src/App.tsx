import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import Products from './pages/Products'; 
import About from './pages/About';
import Cart from './pages/Cart';  
import './App.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};
export default App