import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <main className="order-success-page section" style={{ paddingTop: '160px', minHeight: '80vh' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div className="success-icon" style={{ fontSize: '80px', marginBottom: '24px' }}>
          📦
        </div>
        <h1 className="page-title" style={{ marginBottom: '16px' }}>THANK YOU!</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
          Your order has been placed successfully. 
          The seller has been notified and will ship your gear shortly.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/profile" className="wireframe-btn" style={{ textDecoration: 'none' }}>
            VIEW ORDER HISTORY
          </Link>
          <Link to="/browse" className="wireframe-btn" style={{ textDecoration: 'none', backgroundColor: 'var(--brutal-primary)', color: 'white' }}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </main>
  );
}
