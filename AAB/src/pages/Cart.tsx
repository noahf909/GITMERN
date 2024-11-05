import './Cart.css';

function Cart() {
  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>
      {/* Cart items will be dynamically rendered here */}
      <div className="price-details">
        <div>Subtotal: $99.99</div>
        <div className="total-price">Total: $99.99</div>
      </div>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
