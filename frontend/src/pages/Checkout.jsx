import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export default function Checkout() {
  const { cartSummary, loading, selectedShipping, handleShippingChange } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    newsletter: false,
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center', fontSize: '20px' }}>
        Loading cart...
      </div>
    );
  }

  const summary = cartSummary;

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">CHECKOUT</h1>

      <div className="checkout-layout">
        {/* ── FORMS ── */}
        <div className="checkout-forms">
          {/* Contact */}
          <section className="checkout-section">
            <h2 className="checkout-section-title">01. CONTACT INFO</h2>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="brutal-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInput}
              />
              <span>Email me with news and offers</span>
            </label>
          </section>

          {/* Shipping Address */}
          <section className="checkout-section">
            <h2 className="checkout-section-title">02. SHIPPING ADDRESS</h2>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="firstName" className="brutal-input" placeholder="First Name" value={formData.firstName} onChange={handleInput} />
              </div>
              <div className="form-group">
                <input type="text" name="lastName" className="brutal-input" placeholder="Last Name" value={formData.lastName} onChange={handleInput} />
              </div>
            </div>
            <div className="form-group">
              <input type="text" name="street" className="brutal-input" placeholder="Street Address" value={formData.street} onChange={handleInput} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="city" className="brutal-input" placeholder="City" value={formData.city} onChange={handleInput} />
              </div>
              <div className="form-group">
                <input type="text" name="state" className="brutal-input" placeholder="State/Province" value={formData.state} onChange={handleInput} />
              </div>
              <div className="form-group">
                <input type="text" name="zip" className="brutal-input" placeholder="ZIP / Postal Code" value={formData.zip} onChange={handleInput} />
              </div>
            </div>
          </section>

          {/* Delivery Method — pulled from mock API */}
          <section className="checkout-section">
            <h2 className="checkout-section-title">03. DELIVERY METHOD</h2>
            <div className="shipping-methods">
              {summary?.shipping_rates?.map((rate) => (
                <label key={rate.id} className="shipping-method-card">
                  <input
                    type="radio"
                    name="shipping"
                    value={rate.id}
                    checked={selectedShipping === rate.id}
                    onChange={() => handleShippingChange(rate.id)}
                    style={{ marginRight: '16px', accentColor: 'var(--brutal-primary)' }}
                  />
                  <div className="shipping-method-content">
                    <div>
                      <div className="shipping-method-name">{rate.label}</div>
                      <div className="shipping-method-time">{rate.eta}</div>
                    </div>
                    <div className="shipping-method-price">
                      {rate.price === 0 ? 'FREE' : `$${rate.price.toFixed(2)}`}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="checkout-section">
            <h2 className="checkout-section-title">04. PAYMENT</h2>
            <div className="payment-box">
              <div className="form-group">
                <input type="text" name="cardNumber" className="brutal-input" placeholder="Card Number" value={formData.cardNumber} onChange={handleInput} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="cardExpiry" className="brutal-input" placeholder="Expiration (MM/YY)" value={formData.cardExpiry} onChange={handleInput} />
                </div>
                <div className="form-group">
                  <input type="text" name="cardCvc" className="brutal-input" placeholder="Security Code" value={formData.cardCvc} onChange={handleInput} />
                </div>
              </div>
              <div className="form-group">
                <input type="text" name="cardName" className="brutal-input" placeholder="Name on Card" value={formData.cardName} onChange={handleInput} />
              </div>
            </div>
          </section>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="checkout-summary">
          <div className="sticky-summary">
            <h2 className="checkout-section-title">ORDER SUMMARY</h2>

            <div className="summary-items-list">
              {summary?.items?.map((item) => (
                <div key={item.cart_item_id} className="summary-line-item">
                  <div className="wireframe-img summary-item-img">IMG</div>
                  <div className="summary-item-details">
                    <span className="summary-item-brand">{item.brand}</span>
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-cond">{item.condition}</span>
                  </div>
                  <div className="summary-item-price">{fmt(item.current_price)}</div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-total-row">
                <span>Subtotal</span>
                <span>{fmt(summary?.subtotal)}</span>
              </div>
              <div className="summary-total-row">
                <span>Shipping</span>
                <span>
                  {summary?.shipping?.price === 0
                    ? 'FREE'
                    : fmt(summary?.shipping?.price)}
                </span>
              </div>
              <div className="summary-total-row">
                <span>GST (7%)</span>
                <span>{fmt(summary?.tax)}</span>
              </div>
              <div className="summary-total-row grand-total">
                <span>TOTAL</span>
                <span>{fmt(summary?.total)}</span>
              </div>
            </div>

            <button className="pay-btn" id="pay-now-btn">
              PAY {fmt(summary?.total)}
            </button>
            <p className="secure-checkout-badge">🔒 Secure Checkout · 256-bit SSL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
