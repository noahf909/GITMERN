import './Cart.css';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Calculate the subtotal and total item count by adding up the price * quantity for each item
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Function to update the quantity of an item in the cart
  // This function first removes the item entirely and then adds it back with the new quantity.
  const handleQuantityChange = (productId: string, size: string, value: string) => {
    const numValue = Number(value); // Convert the input value to a number
    const item = cartItems.find((i) => i.productId === productId && i.size === size);

    if (item && !isNaN(numValue) && numValue >= 1) {
      removeFromCart(productId, size, item.quantity); // Remove the current quantity
      addToCart({ ...item, quantity: numValue }); // Add the updated quantity
    }
  };

  // Function to completely remove a specific item from the cart
  const handleRemoveItem = (productId: string, size: string) => {
    removeFromCart(productId, size, -1); // -1 is used to signify full removal
  };

  // Function to remove all items from the cart
  const handleDeleteAll = () => {
    cartItems.forEach((item) => {
      removeFromCart(item.productId, item.size, -1);
    });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>

      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {/* 
              Loop through each item in the cart to render its details.
              Instead of using useState for a local quantity, we use item.quantity directly.
              This avoids React errors from having dynamic useState calls inside the loop.
            */}
            {cartItems.map((item) => {
              // Function to handle changes in the quantity input field for each item
              const handleLocalQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                handleQuantityChange(item.productId, item.size, e.target.value);
              };

              return (
                <div key={`${item.productId}-${item.size}`} className="cart-item">
                  <span
                    className="remove-item-text"
                    onClick={() => handleRemoveItem(item.productId, item.size)}
                  >
                    Remove
                  </span>
                  <p>{item.name} (Size: {item.size})</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>
                    Quantity:{' '}
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity} // Use item.quantity directly from cartItems
                      onChange={handleLocalQuantityChange} // Update global cart quantity on change
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLocalQuantityChange(e); // Allow Enter key to commit change
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
            <div>Total Items: {totalItems}</div>
            <div className="total-price">Total: ${subtotal.toFixed(2)}</div>
          </div>

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
