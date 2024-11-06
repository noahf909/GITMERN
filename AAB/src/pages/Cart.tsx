import './Cart.css';

// import the cart context 
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function Cart() {
  
  // Access cart items from CartContext
  const { cartItems, removeFromCart } = useCart(); 

  //explain. 
  const [removeQuantities, setRemoveQuantities] = useState<{ [key: string]: number }>({});
  console.log('Current cart items in Cart page:', cartItems); // Log the cart items

  // Calculate the subtotal by summing up the price * quantity for each item
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update the selected quantity for a particular item
  const handleQuantityChange = (productId: string, size: string, value: number) => {
    setRemoveQuantities((prev) => ({
      ...prev,
      [`${productId}-${size}`]: value
    }));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>

      {/* Check if there are items in the cart */}
      {cartItems.length > 0 ? (
        <>
          {/* Display each cart item */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <p>{item.name} (Size: {item.size})</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>

                 
                 {/* Dropdown or input for selecting quantity to remove */}
                 <label>
                  Quantity to remove:
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={removeQuantities[`${item.productId}-${item.size}`] || 1}
                    onChange={(e) => handleQuantityChange(item.productId, item.size, Number(e.target.value))}
                  />
                </label>

                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.productId, item.size, removeQuantities[`${item.productId}-${item.size}`] || 1)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Display subtotal and total */}
          <div className="price-details">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div className="total-price">Total: ${subtotal.toFixed(2)}</div>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
        </>
      ) : (
        <p>Your cart is empty.</p> // Message if the cart is empty
      )}
    </div>
  );
}

export default Cart;
