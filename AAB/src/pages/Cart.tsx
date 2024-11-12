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
    const item = cartItems.find((i) => i.productId === productId && i.size === size);

    // Handle the case when the value is valid
    if (value.trim() === '' || (!isNaN(numValue) && numValue >= 1 && numValue <= 99)) {
      if (item) {
        const updatedItem = { ...item, quantity: numValue || 1 }; // Use 1 as fallback for empty input
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
            {cartItems.map((item) => {
              // State to handle the local input value of the quantity
              const [localQuantity, setLocalQuantity] = useState(item.quantity.toString());

              const handleLocalQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                // Update the local quantity without affecting global cart state
                setLocalQuantity(value);
              };

              const handleBlur = () => {
                // Validate and commit the change when input loses focus or the user presses Enter
                const numValue = Number(localQuantity);
                if (numValue >= 1 && numValue <= 99) {
                  // Update global cart state only if valid
                  handleQuantityChange(item.productId, item.size, localQuantity);
                } else {
                  // Revert to last valid quantity if invalid input
                  setLocalQuantity(item.quantity.toString());
                }
              };

              return (
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
                      value={localQuantity}
                      onChange={handleLocalQuantityChange}
                      onBlur={handleBlur} // Commit changes when input loses focus
                      onKeyDown={(e) => {
                        // Optional: Allow "Enter" to commit the change
                        if (e.key === 'Enter') handleBlur();
                      }}
                      className="quantity-input"
                    />
                  </p>
                </div>
              );
            })}
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
