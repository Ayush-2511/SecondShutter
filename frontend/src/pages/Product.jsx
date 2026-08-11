import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../api/productApi';
import { useCart } from '../context/CartContext';
import './Product.css';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const savings = (orig, curr) => fmt(orig - curr);

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [adding, setAdding] = useState(false);

  const alreadyInCart = cartItems.some((ci) => ci.product_id === product?.id);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductBySlug(slug)
      .then(setProduct)
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAdd = async () => {
    if (alreadyInCart) return;
    setAdding(true);
    await handleAddToCart(product.id);
    setAdding(false);
  };

  if (loading) return <div className="pdp-state">Loading...</div>;
  if (error) return (
    <div className="pdp-state">
      <p>{error}</p>
      <button onClick={() => navigate('/browse')}>← Back to Browse</button>
    </div>
  );

  const thumbCount = product.image_count ?? 3;

  return (
    <main className="pdp-main">
      <div className="pdp-container">

        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb">
          <Link to="/">HOME</Link>
          <span>/</span>
          <Link to="/browse">{product.category.toUpperCase()}</Link>
          <span>/</span>
          <span>{product.brand} {product.name}</span>
        </nav>

        <div className="pdp-layout">

          {/* ── LEFT: GALLERY ── */}
          <div className="pdp-gallery">
            <div className="pdp-gallery-main wireframe-img">
              IMG {activeThumb + 1}
            </div>
            <div className="pdp-thumbnails">
              {Array.from({ length: thumbCount }).map((_, i) => (
                <div
                  key={i}
                  className={`pdp-thumb wireframe-img ${activeThumb === i ? 'active' : ''}`}
                  onClick={() => setActiveThumb(i)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: DETAILS ── */}
          <div className="pdp-details">
            {product.badge && <span className="pdp-badge">{product.badge}</span>}
            <span className="pdp-brand">{product.brand}</span>
            <h1 className="pdp-title">{product.name}</h1>

            {/* Condition + Rating */}
            <div className="pdp-meta-badges">
              <span className="pdp-condition-badge">{product.condition}</span>
              <span className="pdp-rating-badge">
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))} ({product.review_count})
              </span>
            </div>

            {/* Pricing */}
            <div className="pdp-pricing">
              <span className="pdp-price-current">{fmt(product.current_price)}</span>
              <span className="pdp-price-original">{fmt(product.original_price)}</span>
              <span className="pdp-price-save">SAVE {savings(product.original_price, product.current_price)}</span>
            </div>

            {/* Description */}
            <p className="pdp-description">{product.description}</p>

            {/* Actions */}
            <div className="pdp-actions">
              <button
                className={`pdp-add-btn ${alreadyInCart ? 'in-cart' : ''}`}
                onClick={handleAdd}
                disabled={alreadyInCart || adding}
                id="add-to-cart-btn"
              >
                {adding ? 'ADDING...' : alreadyInCart ? '✓ IN CART' : 'ADD TO CART'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="pdp-features">
              <div className="pdp-feature">◆ 6 Months Warranty</div>
              <div className="pdp-feature">◆ Free Shipping</div>
              <div className="pdp-feature">◆ 14-Day Returns</div>
            </div>

            {/* Seller card */}
            <div className="pdp-seller-card">
              <span className="pdp-seller-label">SOLD BY</span>
              <div className="pdp-seller-info">
                <span className="pdp-seller-name">
                  {product.seller?.name}
                  {product.seller?.verified && <span className="pdp-verified">✓ VERIFIED</span>}
                </span>
                <span className="pdp-seller-rating">★ {product.seller?.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SPECS TABLE ── */}
        <section className="pdp-specs">
          <h2 className="pdp-section-title">TECH SPECS</h2>
          <div className="pdp-specs-table">
            {(product.specs ?? []).map((spec) => (
              <div key={spec.label} className="pdp-spec-row">
                <div className="pdp-spec-label">{spec.label}</div>
                <div className="pdp-spec-value">{spec.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INCLUDED ITEMS ── */}
        <section className="pdp-included">
          <h2 className="pdp-section-title">WHAT'S IN THE BOX</h2>
          <div className="pdp-included-list">
            {(product.included_items ?? []).map((item) => (
              <div key={item} className="pdp-included-item">◆ {item}</div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
