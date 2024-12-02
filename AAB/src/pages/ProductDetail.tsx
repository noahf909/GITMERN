import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    frontImageUrl: string;
    backImageUrl: string;
    sizes: { size: string; quantity: number; _id: string }[];
}

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('1'); // Store quantity as string for easy input handling
    const [invalidQuantity, setInvalidQuantity] = useState<boolean>(false); // Track invalid quantity
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setMainImage(data.frontImageUrl);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const itemToAdd = {
            productId: product!._id,
            name: product!.name,
            price: product!.price,
            size: selectedSize,
            frontImageUrl: product!.frontImageUrl,
            quantity: parseInt(quantity), // Parse quantity as a number for cart
        };
        addToCart(itemToAdd);
    };

    // Handle quantity input changes (allow any input, just store it as a string)
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
        setInvalidQuantity(false); // Clear the error message as soon as the user starts typing
    };

    // Validate and update the quantity when the input loses focus (onBlur)
    const handleQuantityBlur = () => {
        const parsedQuantity = parseInt(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 99) {
            setInvalidQuantity(true);
            setQuantity('1'); // Reset to 1 if invalid
        }
    };

    // Display loading message if product data isn't loaded yet
    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            <div className="image-gallery">
                <div className="thumbnails">
                    <img
                        src={product.frontImageUrl}
                        alt={`${product.name} Front`}
                        onClick={() => setMainImage(product.frontImageUrl)}
                        className={mainImage === product.frontImageUrl ? 'active' : ''}
                    />
                    <img
                        src={product.backImageUrl}
                        alt={`${product.name} Back`}
                        onClick={() => setMainImage(product.backImageUrl)}
                        className={mainImage === product.backImageUrl ? 'active' : ''}
                    />
                </div>
                <div className="main-image">
                    <img src={mainImage} alt={product.name} />
                </div>
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="description">{product.description}</p>

                <label htmlFor="size-select" className="size-label">Select Size</label>
                <select
                    id="size-select"
                    className="size-dropdown"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                >
                    <option value="">--Choose a size--</option>
                    {product.sizes.map((sizeOption) => (
                        <option key={sizeOption._id} value={sizeOption.size}>
                            {sizeOption.size} ({sizeOption.quantity > 0 ? "available" : "out of stock"})
                        </option>
                    ))}
                </select>

                <p>
                    Quantity:{' '}
                    <input
                        type="text"  // Allow any input, not restricted to number field
                        value={quantity}
                        onChange={handleQuantityChange}  // Update quantity as the user types
                        onBlur={handleQuantityBlur}  // Validate when the input loses focus
                        className={`quantity-input ${invalidQuantity ? 'invalid' : ''}`}  // Apply invalid class if there's an error
                    />
                    {invalidQuantity && (
                        <span className="quantity-error">Invalid quantity. Please enter a value between 1 and 99.</span>
                    )}
                </p>

                <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}  // Disable button if no size selected or quantity is invalid
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;