import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser, updateUser, getOrders, getTradeIns } from '../api/profileApi';
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

  // Data state
  const [user,     setUser]     = useState(null);
  const [orders,   setOrders]   = useState([]);
  const [tradeIns, setTradeIns] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Account form state (local copy to edit)
  const [formData, setFormData] = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  // Load all data once on mount
  useEffect(() => {
    Promise.all([getUser(), getOrders(), getTradeIns()])
      .then(([u, o, t]) => {
        setUser(u);
        setFormData({
          first_name: u.first_name,
          last_name:  u.last_name,
          email:      u.email,
          phone:      u.phone ?? '',
        });
        setOrders(o);
        setTradeIns(t);
      })
      .catch(console.error)
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
        <h1 className="profile-page-title">MY HQ</h1>

        <div className="profile-layout">
          {/* ── SIDEBAR ── */}
          <aside className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-avatar">📷</div>
              <div className="profile-user-info">
                <strong>{user.first_name} {user.last_name}</strong>
                <span>{user.email}</span>
              </div>
            </div>

            <nav className="profile-nav">
              {[
                { id: 'account', label: 'ACCOUNT DETAILS' },
                { id: 'orders',  label: 'ORDER HISTORY'   },
                { id: 'trades',  label: 'MY TRADE-INS'    },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`profile-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <button className="profile-nav-btn logout-btn">LOG OUT</button>
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
                        <input name="first_name" className="brutal-input" value={formData.first_name} onChange={handleInput} />
                      </div>
                      <div className="form-group">
                        <label className="profile-form-label">Last Name</label>
                        <input name="last_name" className="brutal-input" value={formData.last_name} onChange={handleInput} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="profile-form-label">Email Address</label>
                      <input type="email" name="email" className="brutal-input" value={formData.email} onChange={handleInput} />
                    </div>
                    <div className="form-group">
                      <label className="profile-form-label">Phone</label>
                      <input type="tel" name="phone" className="brutal-input" value={formData.phone} onChange={handleInput} />
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

            {/* ── TAB: TRADE-INS ── */}
            {activeTab === 'trades' && (
              <div className="profile-tab">
                <h2 className="profile-section-title">MY TRADE-INS</h2>
                {tradeIns.length === 0 ? (
                  <div className="profile-empty">
                    <p>No trade-ins yet.</p>
                    <Link to="/sell" className="profile-empty-link">SELL YOUR GEAR →</Link>
                  </div>
                ) : (
                  <div className="trade-list">
                    {tradeIns.map((trade) => (
                      <div key={trade.id} className="trade-card">
                        <div className="trade-card-header">
                          <span className="order-id">TRADE #{trade.id.replace('trade_', '').toUpperCase()}</span>
                          <span className="trade-status-badge">{trade.status.toUpperCase()}</span>
                        </div>
                        <div className="trade-card-body">
                          <div>
                            <h4>{trade.brand} {trade.model}</h4>
                            <span className="order-item-cond">{trade.condition}</span>
                          </div>
                          <div className="trade-offers">
                            <div className="trade-offer-row">
                              <span>Cash Offer</span>
                              <strong>{fmt(trade.cash_offer)}</strong>
                            </div>
                            <div className="trade-offer-row accent">
                              <span>Store Credit (+10%)</span>
                              <strong>{fmt(trade.credit_offer)}</strong>
                            </div>
                          </div>
                        </div>
                        {/* Progress Steps */}
                        <div className="trade-progress-bar">
                          {trade.steps.map((step, idx) => {
                            const isActive = !step.completed && (idx === 0 || trade.steps[idx - 1]?.completed);
                            return (
                              <div
                                key={step.key}
                                className={`progress-step ${step.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                              >
                                {step.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/sell" className="pay-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '24px' }}>
                  GET A NEW QUOTE
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
