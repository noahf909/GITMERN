import './Navbar.css'; 
import { useCart } from '../context/CartContext'; 

const Navbar = () => {
    
    const { cartCount } = useCart(); // Access cartCount from CartContext

    return (
        <nav className = "nav">
            <a href = "/" className = "home"> Average at Best</a>
            <ul>
                <li>
                    <a href = "/products">Products</a>
                </li>
                <li>
                    <a href = "/About">About</a>
                </li>
                <li>
                    <a href="/Cart" className="cart-link">
                        Cart
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar; 