import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getProductBySlug } from '../api/productsApi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Product.css';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const savings = (orig, curr) => fmt(orig - curr);

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAddToCart, cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [adding, setAdding] = useState(false);
  
  const alreadyInCart = Array.isArray(cartItems) && cartItems.some((ci) => ci.product_id === product?.id);
  const isOwnListing = isAuthenticated && Boolean(user?.uid) && product?.seller_id === user?.uid;

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductBySlug(slug)
      .then(setProduct)
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAdd = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
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

            {/* Condition */}
            <div className="pdp-meta-badges">
              <span className="pdp-condition-badge">{product.condition}</span>
            </div>

            {/* Seller Info */}
            {product.seller && (
              <Link to={`/user/${product.seller.id}`} className="pdp-seller-badge" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '16px', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '40px', color: 'inherit' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {product.seller.avatar_url ? (
                    <img src={product.seller.avatar_url} alt={product.seller.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{product.seller.first_name?.[0]}</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                  Sold by {product.seller.first_name} {product.seller.last_name}
                </span>
              </Link>
            )}

            {/* Pricing */}
            <div className="pdp-pricing">
              <span className="pdp-price-current">{fmt(product.current_price)}</span>
            </div>

            {/* Description */}
            <p className="pdp-description">{product.description}</p>

            {/* Actions */}
            <div className="pdp-actions">
              <button
                className={`pdp-add-btn ${alreadyInCart ? 'in-cart' : ''} ${isOwnListing ? 'own-listing' : ''}`}
                onClick={handleAdd}
                disabled={alreadyInCart || adding || isOwnListing}
                id="add-to-cart-btn"
                style={isOwnListing ? { cursor: 'not-allowed', backgroundColor: '#555', color: '#999', borderColor: '#444' } : {}}
              >
                {isOwnListing ? 'YOUR LISTING' : adding ? 'ADDING...' : alreadyInCart ? '✓ IN CART' : 'ADD TO CART'}
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
                  {product.seller?.first_name} {product.seller?.last_name}
                </span>
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
