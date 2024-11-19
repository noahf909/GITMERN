import './Navbar.css'; 
import cart from '../assets/cart.png';
import ProfileIcon from '../assets/ProfileIcon.png';

import { useCart } from '../context/CartContext'; 
import { useUser } from '../context/UserContext';  

const Navbar = () => {
    
    const { cartCount } = useCart(); // Access cartCount from CartContext
    const { user } = useUser();  

    return (
        <nav className = "nav">
            <a href = "/" className = "home"> Average at Best</a>
            <ul>
                <li>
                    <a href = "/products" className = "products-link">Products</a>
                </li>
                <li>
                    <a href = "/About" className = "about-link">About</a>
                </li>
                <li>
                    <a href="/Cart" className="cart-link">
                        <img src={cart} alt="Cart" className="cart-icon" />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </a>
                </li>
                <li>
                    <a href={user ? "/Profile" : "/Register"} className="user-link">
                        <img src={ProfileIcon} alt="User" className="user-icon"/>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar; 