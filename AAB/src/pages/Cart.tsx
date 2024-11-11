import './Cart.css';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Calculate the subtotal by summing up the price * quantity for each item
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle quantity changes directly in the cart, syncing with cart data
  const handleQuantityChange = (productId: string, size: string, value: string) => {
    const numValue = Number(value);

    // Check if the value is a valid number within the valid range
    if (value.trim() === '' || (value.trim() !== '' && !isNaN(numValue) && numValue >= 1 && numValue <= 99)) {
      // Find the item in the cart
      const item = cartItems.find((i) => i.productId === productId && i.size === size);

      if (item) {
        const updatedItem = { ...item, quantity: numValue || 1 }; // Update the item quantity
        removeFromCart(productId, size, item.quantity); // Remove the old quantity from cart
        addToCart(updatedItem); // Add the updated item with the new quantity
      }
    }
  };

  // Function to remove a single item from the cart
  const handleRemoveItem = (productId: string, size: string) => {
    removeFromCart(productId, size, -1); // Remove the item completely (use -1 to signify full removal)
  };

  // Function to remove all items from the cart
  const handleDeleteAll = () => {
    cartItems.forEach((item) => {
      removeFromCart(item.productId, item.size, -1); // Removes all items
    });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                {/* Remove button */}
                <span
                  className="remove-item-text"
                  onClick={() => handleRemoveItem(item.productId, item.size)}
                >
                  Remove
                </span>

                <p>{item.name} (Size: {item.size})</p>
                <p>Price: ${item.price.toFixed(2)}</p>

                {/* Quantity input field */}
                <p>
                  Quantity:{' '}
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId, item.size, e.target.value)}
                    className="quantity-input"
                  />
                </p>
              </div>
            ))}
          </div>

          <div className="price-details">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div className="total-price">Total: ${subtotal.toFixed(2)}</div>
          </div>

          {/* Delete All button */}
          <button className="remove-btn delete-all-btn" onClick={handleDeleteAll}>
            Delete All
          </button>

          <button className="checkout-btn">Proceed to Checkout</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
