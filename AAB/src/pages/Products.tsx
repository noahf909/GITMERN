import { useEffect, useState } from 'react';
import './Products.css'; 
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//interface: defines what Product object should have; ensures that any object labed as Product has these exact properties and corresponding types 
interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    frontImageUrl: string;
    backImageUrl: string;
}

const Products = () => {
    // useful for getting information from previous page that was passed with a Navigate call (in this case, the search term)
    let location = useLocation();

    //creates "box" called Products that holds a list of items (products)

    /*
    WTF is useState 
    useState: functiont hat creates special kind of variable in program called a state variable 
        - first part is the state variable (variable that is saved in memory, which holds current value (an empty list at the start)
        - second part is the function (eg., setProducts) that lets us change the value of the state variable (in this case, products from mongo)
    */
    const [products, setProducts] = useState<Product[]>([]);
    
    // current search term
    const [search, setSearch] = useState<string>('');
    
    // catch the search value from the home page and do the things with it
    useEffect(() => {
        if (location.state) {
            setSearch(location.state.search);
        }
    }, [location.state]);

    /*
    useEffect: perform actions that don't directly update the UI, like fetching data, after component renders. 
    */ 
    useEffect(() => {
        //asynchronous function to fetch product data from the server 
        const fetchProducts = async () => {
            try {
                //send a request to fetch data from '/api/products' 
                const response = await fetch('/api/products');

                //check if response statis is not okay (404 or 500)
                if (!response.ok) {
                    //if so, throw HTTP error 
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // convert response data to JSON format 
                const data = await response.json();

                //log the fetched product data to the console (for debugging purposes)
                console.log("Fetched products:", data); // Log fetched data

                //update the 'products' state with the fetched data; defined in useState line 
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        //fetchProducts: built-in javascript function that sends request to URL /api/products and retrieves product data from mongo 
        fetchProducts();
    }, []);

    // handles search bar updates
    const handleSearch = (text: string) => {
        console.log(`Search: -${text}-`);
        setSearch(text);
    }

    return (
        <div className="products-page-container">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for products..."
                    value={search}                                          // is only necessary to define like this because of state maintaining when navigating
                    onChange={(e) => handleSearch(e.currentTarget.value)}   // each input signals an update to the search term
                />
            </div>
            <div className="products-list">
                {products
                    .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
                    .map((product) => (
                        // Wrap each product card in a clickable link that directs to the product's detail page 
                        <Link to={`/products/${product._id}`} key={product._id} className="product-link"> {/* Link to product detail page */}
                            
                            {/* Outer container for each individual product card */}
                            <div className="product-card">
                                <div className="image-container">
        
                                    {/* Display the front image of the product */}
                                    <img
                                        src={product.frontImageUrl}
                                        alt={`${product.name} Front`}
                                        className="product-image front-image"
                                    />
                                    
                                    {/* Display the back image of the product */}
                                    <img
                                        src={product.backImageUrl}
                                        alt={`${product.name} Back`}
                                        className="product-image back-image"
                                    />
                                </div>
        
                                <div className="product-details">
                                    {/* Display the product's name */}
                                    <h2>{product.name}</h2>
                                    
                                    {/* Display the product's price, formatted to two decimal places */}
                                    <p className="price">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Products;