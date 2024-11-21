import './Profile.css'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface Product {
    product: string; // Product ID
    size: string;
    quantity: number;
    productDetails?: {
        name?: string;
        frontImageUrl?: string;
    };
}

interface Order {
    _id: string;
    products: Product[];
    total: number;
    created_at: string;
}

const Profile: React.FC = () => {
    const { user, setUser } = useUser();
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/orders/customer/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user]);

    const handleSignOut = () => {
        setUser(null);
        navigate('/');
        localStorage.removeItem('user');
    };

    return (
        <div className="profile-container">
            <h1>Welcome, {user?.name}</h1>

            <h2>Your Past Orders:</h2>
            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-item">
                            <h3>Order ID: {order._id}</h3>
                            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                            <div className="order-products">
                                {order.products.map((product, index) => {
                                    const productName = product.productDetails?.name || 'Unknown Product';
                                    const productImage =
                                        product.productDetails?.frontImageUrl || '/placeholder-image.png';

                                    return (
                                        <div key={index} className="product-item">
                                            <div className="product-details">
                                                <p><strong>Name:</strong> {productName}</p>
                                                <p><strong>Size:</strong> {product.size}</p>
                                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                                <img
                                                    src={productImage}
                                                    alt={productName}
                                                    className="product-image"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No past orders found.</p>
            )}
            <button onClick={handleSignOut} className="signout-btn">
                Sign Out
            </button>
        </div>
    );
};

export default Profile;
