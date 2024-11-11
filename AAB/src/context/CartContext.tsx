import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define structure of a cart item, including product details and quantity 
interface CartItem {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
}

// Define structure of context's value, including cart items, addToCart function, and cart count 
interface CartContextType {
    cartItems: CartItem[]; // array of items currently in the cart 
    addToCart: (item: CartItem) => void; // function to add an item to the cart 
    removeFromCart: (productId: string, size: string, quantityToRemove: number) => void; //function to remove item from cart
    cartCount: number; //total count of items in the cart 
}

// Create the CartContext with an initial value of undefined 
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component that wraps parts of the app that need access to cart data 
export const CartProvider = ({ children }: { children: ReactNode }) => {

    // Initialize cart items from local storage or as an empty array if none exist
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Updated addToCart function
    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (i) => i.productId === item.productId && i.size === item.size
            );

            let updatedItems;
            if (existingItemIndex >= 0) {
                // Update the quantity of the existing item
                updatedItems = prevItems.map((i, index) =>
                    index === existingItemIndex
                        ? { ...i, quantity: i.quantity + item.quantity } // Correctly update quantity
                        : i
                );
            } else {
                // Add the new item to the cart if it's not already present
                updatedItems = [...prevItems, item];
            }

            // Save the updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const removeFromCart = (productId: string, size: string, quantityToRemove: number) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.reduce((acc, item) => {
                if (item.productId === productId && item.size === size) {
                    const newQuantity = item.quantity - quantityToRemove;
                    if (newQuantity > 0) {
                        acc.push({ ...item, quantity: newQuantity });
                    }
                    // If newQuantity <= 0, we don’t push the item to acc, effectively removing it.
                } else {
                    acc.push(item);
                }
                return acc;
            }, [] as CartItem[]);

            localStorage.setItem('cart', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    // Cart count is the total number of items
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // Sync local storage with cart state on changes to cartItems
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to make accessing CartContext easier
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
};
