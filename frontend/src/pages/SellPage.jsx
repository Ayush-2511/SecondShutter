import React, { useState } from 'react';
import { getEstimatedQuote, submitTradeIn } from '../api/sellApi';
import './SellPage.css';

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function SellPage() {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    shutterCount: '',
    condition: 'EXCELLENT',
    accessories: ['Battery & Charger']
  });

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccessoryChange = (accessory) => {
    setFormData((prev) => {
      const accessories = prev.accessories.includes(accessory)
        ? prev.accessories.filter((a) => a !== accessory)
        : [...prev.accessories, accessory];
      return { ...prev, accessories };
    });
  };

  const handleGetQuote = async (e) => {
    e.preventDefault();
    if (!formData.brand) {
      setError("Please select a brand.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await getEstimatedQuote(formData);
      setQuote(res);
    } catch (err) {
      setError(err.message || "Failed to generate quote.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTradeIn = async () => {
    if (!quote) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitTradeIn({ ...formData, ...quote });
      setSubmittedResult(res);
    } catch (err) {
      setError("Failed to submit trade-in.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      brand: '',
      model: '',
      shutterCount: '',
      condition: 'EXCELLENT',
      accessories: ['Battery & Charger']
    });
    setQuote(null);
    setSubmittedResult(null);
    setError(null);
  };

  return (
    <div className="sell-page" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      {/* HERO SECTION */}
      <section className="sell-hero-section">
        <h1 className="candy-text sell-page-title">TURN PIXELS INTO CASH</h1>
        <p className="sell-page-sub">
          Trade in your pre-loved camera gear for cash or credit towards your next upgrade. Fast, secure, and hassle-free.
        </p>
        <div className="sell-steps-container">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>GET A QUOTE</h3>
            <p>Tell us what you have and its condition. Get an instant estimated value.</p>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <h3>SHIP IT FREE</h3>
            <p>We'll send you a prepaid, fully insured shipping label. Pack it up and drop it off.</p>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <h3>GET PAID</h3>
            <p>Once our experts inspect it, get paid within 48 hours via Direct Deposit or Store Credit.</p>
          </div>
        </div>
      </section>

      {/* FORM & ESTIMATE BLOCK */}
      <section className="quote-form-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {submittedResult ? (
          <div className="trade-submitted-box">
            <h2>TRADE-IN SUBMITTED!</h2>
            <div className="tracking-badge">TRACKING: {submittedResult.trackingId}</div>
            <p>{submittedResult.message}</p>
            <p>Please print the prepaid label sent to your email and drop the package at any authorized shipping center.</p>
            <button className="btn btn-primary pixel-btn" onClick={handleReset}>SELL MORE GEAR</button>
          </div>
        ) : (
          <div className="sell-layout">
            {/* Left: Input Form */}
            <form onSubmit={handleGetQuote} className="sell-form">
              <h2 className="sell-section-heading">WHAT ARE YOU SELLING?</h2>
              
              <div className="form-group">
                <label className="sell-form-label">Brand</label>
                <select 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleInputChange} 
                  className="brutal-input"
                  required
                >
                  <option value="" disabled>Select Brand</option>
                  <option value="canon">Canon</option>
                  <option value="sony">Sony</option>
                  <option value="fujifilm">Fujifilm</option>
                  <option value="nikon">Nikon</option>
                  <option value="leica">Leica</option>
                </select>
              </div>

              <div className="form-group">
                <label className="sell-form-label">Model</label>
                <input 
                  type="text" 
                  name="model" 
                  value={formData.model} 
                  onChange={handleInputChange} 
                  className="brutal-input"
                  placeholder="e.g. EOS R5, A7 III, X-T5" 
                  required
                />
              </div>

              <div className="form-group">
                <label className="sell-form-label">Shutter Count (approximate)</label>
                <input 
                  type="number" 
                  name="shutterCount" 
                  value={formData.shutterCount} 
                  onChange={handleInputChange} 
                  className="brutal-input"
                  placeholder="e.g. 15000" 
                />
              </div>

              <div className="form-group">
                <label className="sell-form-label">Condition</label>
                <div className="condition-selector-group">
                  {[
                    { name: 'MINT', desc: 'Flawless. Like it just came out of the box. No marks.' },
                    { name: 'EXCELLENT', desc: 'Very light signs of use. Clean glass, perfect mechanics.' },
                    { name: 'GOOD', desc: 'Noticeable wear, works perfectly.' },
                    { name: 'HEAVILY USED', desc: 'Battle-scarred. Significant wear but fully functional.' }
                  ].map((cond) => (
                    <label key={cond.name} className={`condition-option-card ${formData.condition === cond.name ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="condition" 
                        value={cond.name} 
                        checked={formData.condition === cond.name} 
                        onChange={handleInputChange}
                        style={{ marginRight: '12px', accentColor: 'var(--brutal-primary)' }}
                      />
                      <div>
                        <strong>{cond.name}</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>{cond.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="sell-form-label">Accessories Included</label>
                <div className="accessories-selector-grid">
                  {['Original Box', 'Battery & Charger', 'Strap', 'Manuals'].map((acc) => (
                    <label key={acc} className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.accessories.includes(acc)} 
                        onChange={() => handleAccessoryChange(acc)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--brutal-primary)' }}
                      />
                      <span>{acc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && <div className="sell-error-msg">{error}</div>}

              <button type="submit" className="btn btn-primary pixel-btn" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'CALCULATING...' : 'GET INSTANT ESTIMATE'}
              </button>
            </form>

            {/* Right: Quote Result */}
            <div className="sell-summary">
              <div className="sticky-summary quote-box">
                <h2 className="summary-title" style={{ fontSize: '24px', borderBottom: '4px solid var(--brutal-fg)', paddingBottom: '12px', marginBottom: '24px' }}>ESTIMATED QUOTE</h2>
                
                {!quote ? (
                  <div className="quote-status-placeholder">
                    <span className="quote-icon">⚡</span>
                    <span>Enter details to calculate value</span>
                  </div>
                ) : (
                  <div className="quote-calculated-details">
                    <h3 style={{ textTransform: 'uppercase', marginBottom: '4px' }}>{quote.brand} {quote.model}</h3>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--brutal-primary)', marginBottom: '24px' }}>CONDITION: {quote.condition}</div>
                    
                    <div className="quote-offers">
                      <div className="offer-card cash-offer">
                        <span className="offer-label">CASH OFFER</span>
                        <span className="offer-price">{fmt(quote.cashOffer)}</span>
                      </div>
                      
                      <div className="offer-card credit-offer">
                        <span className="offer-label">STORE CREDIT (+10%)</span>
                        <span className="offer-price">{fmt(quote.creditOffer)}</span>
                      </div>
                    </div>

                    <button 
                      className="pay-btn" 
                      onClick={handleSubmitTradeIn} 
                      disabled={submitting}
                      style={{ marginTop: '24px' }}
                    >
                      {submitting ? 'PROCESSING...' : 'ACCEPT OFFER & SHIP'}
                    </button>
                    <p style={{ fontSize: '11px', textAlign: 'center', opacity: 0.6, marginTop: '12px' }}>
                      Quotes are estimated. Final value pending physical inspection.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
