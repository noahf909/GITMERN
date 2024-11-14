import './Cart.css';
import { useCart } from '../context/CartContext';

function Cart() {
  // Access `cartItems`, `addToCart`, `removeFromCart`, and `setCartItems` from context
  const { cartItems, removeFromCart, setCartItems } = useCart();

  // Calculate the subtotal and total item count by iterating through the cart items
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Function to update the quantity of an item in the cart without changing its position
  const handleQuantityChange = (productId: string, size: string, value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 1) return; // Ignore invalid quantities

    // Update only the specific item in the cart without changing the order
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        // Only update the quantity of the matching item; keep others unchanged
        if (item.productId === productId && item.size === size) {
          return { ...item, quantity: numValue };
        }
        return item;
      });
    });
  };

  // Function to remove a single item from the cart
  const handleRemoveItem = (productId: string, size: string) => {
    removeFromCart(productId, size, -1); // -1 signifies complete removal of the item
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

      {/* Check if there are items in the cart */}
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {/* Iterate over each item in the cart and display it */}
            {cartItems.map((item) => {
              // Function to handle quantity change for the specific item
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
                      value={item.quantity} // Use the quantity from cartItems directly
                      onChange={handleLocalQuantityChange} // Update global cart quantity on change
                      className="quantity-input"
                    />
                  </p>
                </div>
              );
            })}
          </div>

          {/* Display subtotal, total items, and checkout options */}
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
