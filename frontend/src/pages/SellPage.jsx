import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../api/sellApi';
import { useAuth } from '../context/AuthContext';
import './SellPage.css';

export default function SellPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [isAccessory, setIsAccessory] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'mirrorless',
    accessoryType: '',
    condition: 'EXCELLENT',
    condition_note: '',
    current_price: '',
    description: ''
  });

  const [imageUrls, setImageUrls] = useState(['']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsAccessory(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        brand: 'Other',
        category: 'accessory',
        accessoryType: 'tripod'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        brand: '',
        category: 'mirrorless',
        accessoryType: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login('/sell');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const payload = { ...formData, image_urls: imageUrls.filter(url => url.trim() !== '') };
      
      // If it's an accessory, we append the accessory type to category for filtering
      if (isAccessory) {
        payload.category = `accessory-${payload.accessoryType}`;
      }

      await createListing(payload);
      navigate('/browse'); 
    } catch (err) {
      setError(err.message || "Failed to create listing.");
      setLoading(false);
    }
  };

  return (
    <div className="sell-page section">
      <div className="container">
        <div className="sell-hero-section">
          <h1 className="candy-text sell-page-title">LIST YOUR GEAR</h1>
          <p className="sell-page-sub">Create a marketplace listing to sell your camera or accessories directly to other enthusiasts. Pixel-perfect process.</p>
        </div>

        <form className="sell-form-container" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="sell-layout">
            <div className="sell-main-col">
              <h2 className="sell-section-heading">1. BASIC DETAILS</h2>
              
              <div className="form-group">
                <label className="sell-form-label">Listing Title</label>
                <input 
                  type="text" 
                  name="name" 
                  className="wireframe-input" 
                  placeholder="e.g. Sony A7 III Body Only" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="form-group checkbox-group" style={{ marginBottom: '24px' }}>
                <label className="accessory-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isAccessory} 
                    onChange={handleCheckboxChange} 
                  />
                  <span className="checkbox-custom"></span>
                  This item is an accessory (Lens, Flash, Bag, etc.)
                </label>
              </div>

              {!isAccessory ? (
                <div className="form-row">
                  <div className="form-group">
                    <label className="sell-form-label">Brand</label>
                    <select name="brand" className="wireframe-select" value={formData.brand} onChange={handleInputChange} required>
                      <option value="">Select Brand</option>
                      <option value="SONY">Sony</option>
                      <option value="CANON">Canon</option>
                      <option value="FUJIFILM">Fujifilm</option>
                      <option value="NIKON">Nikon</option>
                      <option value="LEICA">Leica</option>
                      <option value="PANASONIC">Panasonic</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="sell-form-label">Type of Camera</label>
                    <select name="category" className="wireframe-select" value={formData.category} onChange={handleInputChange} required>
                      <option value="mirrorless">Mirrorless</option>
                      <option value="dslr">DSLR</option>
                      <option value="compact">Compact Point & Shoot</option>
                      <option value="film">Film Camera</option>
                      <option value="medium_format">Medium Format</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="sell-form-label">Type of Accessory</label>
                  <select name="accessoryType" className="wireframe-select" value={formData.accessoryType} onChange={handleInputChange} required>
                    <option value="lens">Lens</option>
                    <option value="tripod">Tripod / Mount</option>
                    <option value="flash">Flash / Lighting</option>
                    <option value="bag">Bag / Case</option>
                    <option value="filter">Filter / Adapter</option>
                    <option value="battery">Battery / Charger</option>
                    <option value="other">Other Accessory</option>
                  </select>
                </div>
              )}

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="sell-form-label">Description</label>
                <textarea 
                  name="description" 
                  className="wireframe-input" 
                  rows="6" 
                  placeholder="Describe your item, shutter count, accessories included, etc." 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required
                ></textarea>
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="sell-form-label">Image URLs</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {imageUrls.map((url, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="url" 
                        className="wireframe-input" 
                        placeholder="https://example.com/image.jpg" 
                        value={url} 
                        onChange={(e) => {
                          const newUrls = [...imageUrls];
                          newUrls[index] = e.target.value;
                          setImageUrls(newUrls);
                        }} 
                        style={{ flex: 1 }}
                      />
                      {imageUrls.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
                          style={{ background: 'var(--brutal-fg)', color: 'var(--brutal-light)', border: 'none', padding: '0 16px', cursor: 'pointer', borderRadius: 'var(--brutal-radius)' }}
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="wireframe-btn"
                    onClick={() => setImageUrls([...imageUrls, ''])}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', marginTop: '4px' }}
                  >
                    <Plus size={16} /> ADD ANOTHER IMAGE
                  </button>
                </div>
              </div>
            </div>

            <div className="sell-side-col">
              <h2 className="sell-section-heading">2. PRICING & CONDITION</h2>
              
              <div className="form-group">
                <label className="sell-form-label">Selling Price (₹)</label>
                <input 
                  type="number" 
                  name="current_price" 
                  className="wireframe-input price-input" 
                  placeholder="0.00" 
                  min="1"
                  value={formData.current_price} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label className="sell-form-label">Condition Rating</label>
                <select name="condition" className="wireframe-select" value={formData.condition} onChange={handleInputChange} required>
                  <option value="MINT">Mint (Like New)</option>
                  <option value="EXCELLENT">Excellent (Minor signs of use)</option>
                  <option value="GOOD">Good (Visible wear)</option>
                  <option value="FAIR">Fair (Heavy wear, functional)</option>
                  <option value="PARTS">For Parts / Not Working</option>
                </select>
              </div>

              <div className="form-group">
                <label className="sell-form-label">Condition Notes</label>
                <textarea 
                  name="condition_note" 
                  className="wireframe-input" 
                  rows="3" 
                  placeholder="e.g. Tiny scratch on bottom plate, glass is pristine." 
                  value={formData.condition_note} 
                  onChange={handleInputChange} 
                ></textarea>
              </div>

              <div className="sell-actions">
                <button type="submit" className="btn btn-primary pixel-btn submit-listing-btn" disabled={loading}>
                  <span className="btn-text">{loading ? 'PUBLISHING...' : 'PUBLISH LISTING'}</span>
                  <div className="btn-pixels"></div>
                </button>
                <p className="fee-notice">* A 5% platform fee will be deducted upon successful sale.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
