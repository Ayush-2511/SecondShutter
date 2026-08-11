import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartSummary,
    loading,
    handleRemoveFromCart,
  } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>YOUR GEAR ({cartSummary?.item_count ?? 0})</h2>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-items">
          {loading && <p className="cart-state-msg">Loading...</p>}

          {!loading && cartItems.length === 0 && (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/browse" onClick={closeCart} className="cart-browse-link">
                BROWSE GEAR →
              </Link>
            </div>
          )}

          {!loading && cartItems.map((item) => (
            <div key={item.cart_item_id} className="cart-item">
              <div className="cart-item-image wireframe-img">IMG</div>
              <div className="cart-item-info">
                <div className="cart-item-header">
                  <div>
                    <span className="cart-item-brand">{item.brand}</span>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveFromCart(item.cart_item_id)}
                    aria-label={`Remove ${item.name}`}
                  >✕</button>
                </div>
                <span className="cart-item-cond">{item.condition}</span>
                <div className="cart-item-price">{fmt(item.current_price)}</div>
              </div>
            </div>
          ))}
        </div>

        {!loading && cartSummary && cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>SUBTOTAL</span>
              <span>{fmt(cartSummary.subtotal)}</span>
            </div>
            <div className="cart-summary-row muted">
              <span>SHIPPING</span>
              <span>Calculated at checkout</span>
            </div>
            <Link
              to="/checkout"
              className="checkout-btn"
              onClick={closeCart}
              id="proceed-to-checkout-btn"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
