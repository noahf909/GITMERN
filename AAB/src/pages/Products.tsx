import { useEffect, useState } from 'react';
import './Products.css'; 
import { Link } from 'react-router-dom';

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
    //creates "box" called Products that holds a list of items (products)

    /*
    WTF is useState 
    useState: functiont hat creates special kind of variable in program called a state variable 
        - first part is the state variable (variable that is saved in memory, which holds current value (an empty list at the start)
        - second part is the function (eg., setProducts) that lets us change the value of the state variable (in this case, products from mongo)
    */
    const [products, setProducts] = useState<Product[]>([]);

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


    return (
        <div className="products-list">
            {/* Loop through each product in the products list and create a card for it */}
            {products.map((product) => (
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
    ); 
};

export default Products;