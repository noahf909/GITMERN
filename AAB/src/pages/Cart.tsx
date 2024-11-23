import './Cart.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  // State to manage local quantities for all cart items
  const [localQuantities, setLocalQuantities] = useState(
    cartItems.reduce((acc, item) => {
      
      // Initialize state for each item's quantity
      acc[`${item.productId}-${item.size}`] = item.quantity.toString();
      return acc;
    }, {} as Record<string, string>)  // Create a key-value pair for product ID and size
  );

  // Calculate the subtotal (sum of price * quantity for all items)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Handle changes in the quantity input field for an item
  const handleLocalQuantityChange = (id: string, value: string) => {
    setLocalQuantities((prev) => ({
      ...prev,
      [id]: value, // Update the local state for the specific item
    }));
  };

  // Validate and update the global cart state when quantity input loses focus
  const handleQuantityBlur = (id: string, productId: string, size: string) => {
    const numValue = Number(localQuantities[id]); // Convert input to a number
    if (numValue >= 1 && numValue <= 99) {
      // If valid, update the global cart state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: numValue } // Update the quantity of the specific item
            : item // Keep other items unchanged
        )
      );
    } else {
       // If invalid, reset to the original quantity
      setLocalQuantities((prev) => ({
        ...prev,
        [id]: cartItems.find((item) => item.productId === productId && item.size === size)
          ?.quantity.toString() || "1",
      }));
    }
  };

  // Remove a single item from the cart
  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

   // Remove all items from the cart
  const handleDeleteAll = () => {
    setCartItems([]);
  };

  return (
    <div className="cart-container"> {/* Main container for the cart */}
      <h1 className="cart-heading">Your Shopping Cart</h1>

      {/* Check if there are items in the cart */}
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-items"> {/* Container for all cart items */}
            {cartItems.map((item) => {
              const id = `${item.productId}-${item.size}`; // Create a unique key for the item

              return (
                <div key={id} className="cart-item"> {/* Individual cart item */}
                  <img src={item.frontImageUrl} alt={item.name} className="cart-item-image" /> {/* Item image */}
                  <div className="cart-item-details"> {/* Item details */}
                    <p>{item.name} (Size: {item.size})</p> {/* Item name and size */}
                    <p>Price: ${item.price.toFixed(2)}</p> {/* Item price */}
                    <p>
                      Quantity:
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={localQuantities[id]} // Local state for the quantity
                        onChange={(e) => handleLocalQuantityChange(id, e.target.value)} // Update local state on change
                        onBlur={() => handleQuantityBlur(id, item.productId, item.size)}  // Validate and update global state on blur
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleQuantityBlur(id, item.productId, item.size);  // Commit changes on Enter key
                        }}
                        className="quantity-input"
                      />
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.productId, item.size)} // Remove the item from the cart
                    className="remove-item-btn"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="price-details"> {/* Price summary */}
            <div>Subtotal: ${subtotal.toFixed(2)}</div> {/* Subtotal price */}
            <div>Total Items: {totalItems}</div> {/* Total items count */}
            <div className="total-price">Total: ${subtotal.toFixed(2)}</div> {/* Total price */}
          </div>

          <button className="remove-btn delete-all-btn" onClick={handleDeleteAll}>
            Delete All {/* Button to clear the cart */}
          </button>

          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout {/* Button to navigate to the checkout page */}
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p> // Message when no items are in the cart 
      )}
    </div>
  );
}

export default Cart; // Export the component for use in other parts of the app
