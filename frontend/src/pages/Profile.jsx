import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser, getOrders, getListings } from '../api/profileApi';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const STATUS_LABELS = {
  delivered:  { label: 'DELIVERED',  cls: 'status-delivered'  },
  processing: { label: 'PROCESSING', cls: 'status-processing' },
  shipped:    { label: 'SHIPPED',    cls: 'status-shipped'    },
  pending:    { label: 'PENDING',    cls: 'status-pending'    },
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('account');
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Data state
  const [user,     setUser]     = useState(null);
  const [orders,   setOrders]   = useState([]);
  const [listings, setListings] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Account form state (local copy to edit)
  const [formData, setFormData] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  // Load all data once on mount
  useEffect(() => {
    Promise.all([getUser(), getOrders(), getListings()])
      .then(([u, o, l]) => {
        setUser(u);
        setFormData({
          first_name: u.first_name,
          last_name:  u.last_name,
          email:      u.email,
          phone:      u.phone ?? '',
        });
        setOrders(o);
        setListings(l);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message || 'Unknown error occurred while fetching profile.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateUser(formData);
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="profile-state">Loading profile...</div>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {errorMsg && (
          <div style={{ backgroundColor: '#ffcccc', color: 'red', padding: '10px', marginBottom: '20px', border: '1px solid red' }}>
            <strong>Error Loading Profile:</strong> {errorMsg}
          </div>
        )}
        <h1 className="profile-page-title">MY HQ</h1>

        <div className="profile-layout">
          {/* ── SIDEBAR ── */}
          <aside className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-avatar" style={{ overflow: 'hidden' }}>
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  formData?.first_name ? formData.first_name[0].toUpperCase() : 'U'
                )}
              </div>
              <div className="profile-user-info">
                <strong>{user?.first_name || 'Missing'} {user?.last_name || 'User'}</strong>
                <span>{user?.email || 'N/A'}</span>
              </div>
            </div>

            <nav className="profile-nav">
              {[
                { id: 'account', label: 'ACCOUNT DETAILS' },
                { id: 'orders',  label: 'ORDER HISTORY'   },
                { id: 'listings', label: 'MY LISTINGS'    },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`profile-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <button 
                className="profile-nav-btn logout-btn" 
                onClick={() => { logout(); navigate('/'); }}
              >
                LOG OUT
              </button>
            </nav>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="profile-content">

            {/* ── TAB: ACCOUNT ── */}
            {activeTab === 'account' && (
              <div className="profile-tab">
                <h2 className="profile-section-title">ACCOUNT DETAILS</h2>
                <form onSubmit={handleSave}>
                  <section className="profile-card">
                    <h3 className="profile-card-heading">PERSONAL INFO</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="profile-form-label">First Name</label>
                        <input name="first_name" className="brutal-input" value={formData?.first_name || ''} onChange={handleInput} />
                      </div>
                      <div className="form-group">
                        <label className="profile-form-label">Last Name</label>
                        <input name="last_name" className="brutal-input" value={formData?.last_name || ''} onChange={handleInput} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="profile-form-label">Email Address</label>
                      <input type="email" name="email" className="brutal-input" value={formData?.email || ''} onChange={handleInput} />
                    </div>
                    <div className="form-group">
                      <label className="profile-form-label">Phone</label>
                      <input type="tel" name="phone" className="brutal-input" value={formData?.phone || ''} onChange={handleInput} />
                    </div>
                  </section>

                  {saved && <div className="save-success-msg">✓ Changes saved successfully.</div>}

                  <button type="submit" className="pay-btn" disabled={saving}>
                    {saving ? 'SAVING...' : 'SAVE CHANGES'}
                  </button>
                </form>
              </div>
            )}

            {/* ── TAB: ORDERS ── */}
            {activeTab === 'orders' && (
              <div className="profile-tab">
                <h2 className="profile-section-title">ORDER HISTORY</h2>
                {orders.length === 0 ? (
                  <div className="profile-empty">
                    <p>No orders yet.</p>
                    <Link to="/browse" className="profile-empty-link">BROWSE GEAR →</Link>
                  </div>
                ) : (
                  <div className="order-list">
                    {orders.map((order) => {
                      const st = STATUS_LABELS[order.status] ?? { label: order.status.toUpperCase(), cls: '' };
                      return (
                        <div key={order.id} className="order-card">
                          <div className="order-card-header">
                            <span className="order-id">ORDER #{order.id.replace('order_', '').toUpperCase()}</span>
                            <span className={`order-status-badge ${st.cls}`}>{st.label}</span>
                          </div>
                          {order.items.map((item) => (
                            <div key={item.product_id} className="order-card-body">
                              <div className="order-item-img wireframe-img">IMG</div>
                              <div className="order-item-details">
                                <span className="order-item-brand">{item.brand}</span>
                                <h4 className="order-item-name">{item.name}</h4>
                                <span className="order-item-cond">{item.condition}</span>
                              </div>
                              <div className="order-item-price">{fmt(item.price_at_purchase)}</div>
                            </div>
                          ))}
                          <div className="order-card-footer">
                            <span>
                              Placed: {new Date(order.placed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="order-total">TOTAL: {fmt(order.total)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── TAB: LISTINGS ── */}
            {activeTab === 'listings' && (
              <div className="profile-tab">
                <h2 className="profile-section-title">MY LISTINGS</h2>
                {listings.length === 0 ? (
                  <div className="profile-empty">
                    <p>You haven't listed any gear yet.</p>
                    <Link to="/sell" className="profile-empty-link">LIST YOUR GEAR →</Link>
                  </div>
                ) : (
                  <div className="trade-list">
                    {listings.map((listing) => (
                      <div key={listing.id} className="trade-card">
                        <div className="trade-card-header">
                          <span className="order-id">LISTING #{listing.id.substring(0, 8).toUpperCase()}</span>
                          <span className={`trade-status-badge ${listing.in_stock ? 'status-delivered' : 'status-pending'}`}>
                            {listing.in_stock ? 'AVAILABLE' : 'SOLD'}
                          </span>
                        </div>
                        <div className="trade-card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4>{listing.brand} {listing.name}</h4>
                            <span className="order-item-cond">{listing.condition}</span>
                          </div>
                          <div className="trade-offers">
                            <div className="trade-offer-row">
                              <span>Price</span>
                              <strong>{fmt(listing.current_price)}</strong>
                            </div>
                            <div className="trade-offer-row muted" style={{ fontSize: '11px', marginTop: '4px' }}>
                              <span>Listed: {new Date(listing.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        {/* Actions */}
                        <div className="trade-progress-bar" style={{ padding: '12px 16px', display: 'flex', gap: '12px' }}>
                          <Link to={`/product/${listing.slug}`} className="wireframe-btn" style={{ padding: '8px 16px', fontSize: '12px', textDecoration: 'none' }}>
                            VIEW LISTING
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/sell" className="pay-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '24px' }}>
                  LIST MORE GEAR
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
