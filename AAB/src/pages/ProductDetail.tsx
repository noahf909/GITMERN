// Import useParams to get route parameters from the URL
import { useParams } from 'react-router-dom';

// Import React hooks for managing side effects and state
import { useEffect, useState } from 'react';

// Import the CSS file for styling
import './ProductDetail.css'; // Import the CSS file


// Define the Product interface to specify the structure of a product object
interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    frontImageUrl: string;
    backImageUrl: string;
}



const ProductDetail = () => {
    // Extract the product ID from the URL parameters
    const { id } = useParams<{ id: string }>();

    // Create a state variable for the product, initially set to null (no product loaded yet)
    const [product, setProduct] = useState<Product | null>(null);

    // Create a state variable for the main image to display in the gallery
    const [mainImage, setMainImage] = useState<string>('');

    // useEffect to fetch product details when the component loads or when the ID changes
    useEffect(() => {
        
        // Define an async function to fetch product data from the server
        const fetchProduct = async () => {
        try {
            
            // Send a request to fetch product details using the product ID
            const response = await fetch(`/api/products/${id}`);
            
            // Parse the response data into JSON format
            const data = await response.json();

            // Update the product state with fetched data
            setProduct(data);

            // Set the main image to the front image of the product initially
            setMainImage(data.frontImageUrl);
            
        } catch (error) {
            // Log any errors that occur during fetching
            console.error("Error fetching product:", error);
        }
    };

        // Call the fetchProduct function to start fetching data
        fetchProduct();
    }, [id]); // Dependency array with ID to re-run effect if ID changes

    // Display a loading message if the product data is not yet loaded
    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            {/* Image gallery with thumbnails and main image display */}
            <div className="image-gallery">
                
                <div className="thumbnails">
                    {/* Thumbnail for front image with click event to set it as the main image */}
                    <img
                        src={product.frontImageUrl}
                        alt={`${product.name} Front`}
                        onClick={() => setMainImage(product.frontImageUrl)}
                        className={mainImage === product.frontImageUrl ? 'active' : ''}
                    />
                    
                    {/* Thumbnail for back image with click event to set it as the main image */}
                    <img
                        src={product.backImageUrl}
                        alt={`${product.name} Back`}
                        onClick={() => setMainImage(product.backImageUrl)}
                        className={mainImage === product.backImageUrl ? 'active' : ''}
                    />
                </div>
                <div className="main-image">
                    
                    {/* Main image display based on selected thumbnail */}
                    <img src={mainImage} alt={product.name} />
                </div>
            </div>
            <div className="product-info">
                
                {/* Display product name */}
                <h1>{product.name}</h1>
                
                {/* Display product price, formatted to two decimal places */}
                <p className="price">${product.price.toFixed(2)}</p>
                
                {/* Display product description */}
                <p className="description">{product.description}</p>
                
                {/* Add more product details as needed */}
            </div>
        </div>
    );
};

export default ProductDetail;
