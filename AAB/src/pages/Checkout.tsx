import './Checkout.css';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart   } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <CheckoutForm />
        <CartSummary />
      </div>
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const { user } = useUser();
  const { cartItems } = useCart(); // access cart items
  const elements = useElements();
  const { clearCart } = useCart(); // Access clearCart
  const navigate = useNavigate();

  const [contactInfo, setContactInfo] = useState({
    email: '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US', //default to United States
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US', //default to United States
  });

  const [useSameAddress, setUseSameAddress] = useState(true);
  const [loading, setLoading] = useState(false);

  //auto-populate email if logged in
  useEffect(() => {
    console.log('User from context:', user); // Debug log
    if (user?.email) {
      setContactInfo((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);



  const handlePayment = async () => {
    if (!stripe || !elements) {
        alert('Stripe is not loaded yet.');
        return;
    }

    if (!billingAddress.country) {
        alert('Please select a valid country for the billing address.');
        return;
    }

    setLoading(true);

    try {
        // Step 1: Create PaymentIntent
        const response = await fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 10000 }), // Example: 100.00 USD in cents
        });
        const { clientSecret } = await response.json();

        // Step 2: Confirm Payment
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            alert('Card Element is not loaded yet.');
            return;
        }

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: contactInfo.email,
                    name: billingAddress.fullName,
                    address: {
                        line1: billingAddress.addressLine1,
                        line2: billingAddress.addressLine2,
                        city: billingAddress.city,
                        state: billingAddress.state,
                        postal_code: billingAddress.postalCode,
                        country: billingAddress.country,
                    },
                },
            },
        });

        if (paymentResult.error) {
            alert(`Payment failed: ${paymentResult.error.message}`);
        } else if (paymentResult.paymentIntent?.status === 'succeeded') {
            alert('Payment successful!');

        // Step 3: Send Order to Backend
        const orderResponse = await fetch('/api/stripe/save-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user?.id || null,
                products: cartItems.map((item) => ({
                    product: item.productId,
                    size: item.size,
                    quantity: item.quantity,
                })),
                total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                address: `${deliveryAddress.addressLine1}, ${deliveryAddress.addressLine2}, ${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.postalCode}, ${deliveryAddress.country}`,
            }),
        });

            const savedOrder = await orderResponse.json();
            console.log('Order saved:', savedOrder);

            // Clear the cart
            clearCart(); // Reset the cart items

            // Redirect to homepage
            navigate('/');

        }
    } catch (error) {
        alert(`An error occurred: ${(error as Error).message}`);
    } finally {
        setLoading(false);
    }
};

  const handleCopyDeliveryToBilling = () => {
    if (useSameAddress) {
      setBillingAddress({ ...deliveryAddress });
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {user ? (
          <div style={{ color: 'green', marginTop: '10px' }}>
            <p>You are logged in</p>
          </div>
        ) : (
          <div style={{ color: 'red', marginTop: '10px' }}>
            <p>
              You are not logged in. Please{' '}
              <Link to="/SignIn" style={{ color: 'blue' }}>
                log in
              </Link>{' '}
              to view your order after purchasing.
            </p>
          </div>
        )}

      {/* Contact Information */}
      <div className="checkout-section">
        <h3>Contact Information</h3>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
        />
      </div>

      {/* Delivery Address */}
      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={deliveryAddress.fullName}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address Line 1"
          className="input-field"
          value={deliveryAddress.addressLine1}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, addressLine1: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address Line 2 (Optional)"
          className="input-field"
          value={deliveryAddress.addressLine2}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, addressLine2: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="input-field"
          value={deliveryAddress.city}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          className="input-field"
          value={deliveryAddress.state}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="input-field"
          value={deliveryAddress.postalCode}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
        />
        <select
          className="input-field"
          value={deliveryAddress.country}
          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, country: e.target.value })}
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      {/* Billing Address */}
      <div className="checkout-section">
        <h3>
          Billing Address
          (Same as Delivery Address) {' '}
          <input
            type="checkbox"
            checked={useSameAddress}
            onChange={(e) => {
              setUseSameAddress(e.target.checked);
              handleCopyDeliveryToBilling();
            }}
          />{' '}
        </h3>
        {!useSameAddress && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
              value={billingAddress.fullName}
              onChange={(e) => setBillingAddress({ ...billingAddress, fullName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address Line 1"
              className="input-field"
              value={billingAddress.addressLine1}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, addressLine1: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 2 (Optional)"
              className="input-field"
              value={billingAddress.addressLine2}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, addressLine2: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="input-field"
              value={billingAddress.city}
              onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              className="input-field"
              value={billingAddress.state}
              onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="input-field"
              value={billingAddress.postalCode}
              onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              className="input-field"
              value={billingAddress.country}
              onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
            />
          </>
        )}
      </div>

      {/* Payment Details */}
      <div className="checkout-section">
        <h3>Payment Details</h3>
        <CardElement className="input-field" />
      </div>

      <button onClick={handlePayment} className="confirm-btn" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}

function CartSummary() {
  const { cartItems } = useCart();
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <ul className="cart-item-list">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item">
            <img
              src={item.frontImageUrl}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <p>{item.name}</p>
              <p>Size: {item.size}</p>
              <p>Qty: {item.quantity}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total:</p>
        <p>${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Checkout;
