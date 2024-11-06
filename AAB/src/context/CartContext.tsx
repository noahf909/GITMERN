/*
Context: a way in React to share data globally across all components (all pages) without needing to pass props manually at every level. (dont have to add it to each component you want it viewed in)

CartContext: specific context created to store and manage cart data (such as items added to the cart, etc),
             and make it accessible to any component () within the app, allowing for updated cart to show across pages. 
*/ 
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// define structure of a cart item, including product details and quantity 
interface CartItem {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
}

// define structure of context's value, including cart items, addToCart Function, and cart count 
interface CartContextType {
    cartItems: CartItem[]; // array of items currently in the cart 
    addToCart: (item: CartItem) => void; // function to add an item to the cart 
    removeFromCart: (productId: string, size: string, quantityToRemove: number) => void; //function to remove item from cart
    cartCount: number; //total count of items in the cart 
}

// create the CartContext with an initial value of undefined 
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component that wraps parts of the app that need access to cart data 
export const CartProvider = ({ children }: { children: ReactNode }) => {
    
    // Initialize cart items from local storage or as an empty array if none exist
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Function to add item to cart
    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (i) => i.productId === item.productId && i.size === item.size
            );
    
            let updatedItems;
            if (existingItemIndex >= 0) {
                // Update quantity if the item already exists in the cart
                updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
            } else {
                // Add new item if it's not already in the cart
                updatedItems = [...prevItems, item];
            }

            // Save updated cart to local storage
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
    // This sums up the quantity of each item in the cart
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // Sync local storage with cart state on changes to cartItems
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

     // Provide the cartItems, addToCart function, and cartCount to any components within CartContext.Provider
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to make accessing CartContext easier
export const useCart = () => {

    // Get the context value using useContext
    const context = useContext(CartContext);

    // If context is undefined, throw an error (this ensures the hook is used within a CartProvider)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    
    // Return the context value (cart data and functions)
    return context;
};