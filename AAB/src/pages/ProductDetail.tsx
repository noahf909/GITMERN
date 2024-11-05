import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetail.css'; // Import the CSS file

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    frontImageUrl: string;
    backImageUrl: string;
}

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setMainImage(data.frontImageUrl); // Set initial main image
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

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
                {/* Add more product details as needed */}
            </div>
        </div>
    );
};

export default ProductDetail;
