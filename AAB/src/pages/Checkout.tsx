import './Checkout.css';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems } = useCart();
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout</h2>

        <div className="checkout-section">
          <h3>Billing Details</h3>
          <input type="text" placeholder="Full Name" className="input-field" />
          <input type="text" placeholder="Address" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input type="tel" placeholder="Phone Number" className="input-field" />

          <h3>Payment Details</h3>
          <input type="text" placeholder="Card Number" className="input-field" />
          <input type="text" placeholder="Expiry Date (MM/YY)" className="input-field" />
          <input type="text" placeholder="CVV" className="input-field" />
        </div>

        <button className="confirm-btn">Confirm Purchase</button>
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <ul className="cart-item-list">
          {cartItems.map((item) => (
            <li key={`${item.productId}-${item.size}`} className="cart-item">
              <img src={item.frontImageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span>{item.name} (Size: {item.size})</span>
                <span>Qty: {item.quantity}</span>
                <span>Price: ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">Total: ${totalAmount.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Checkout;
