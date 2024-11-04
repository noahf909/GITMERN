import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className = "nav">
            <a href = "/" className = "home"> Average at Best</a>
            <ul>
                <li>
                    <a href = "/Products">Products</a>
                </li>
                <li>
                    <a href = "/About">About</a>
                </li>
                <li>
                    <a href = "/Cart">Cart</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar; 