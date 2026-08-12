import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../api/sellApi';
import { useAuth } from '../context/AuthContext';
import './SellPage.css';

export default function SellPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'mirrorless',
    condition: 'EXCELLENT',
    condition_note: '',
    current_price: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Must be logged in to sell
      login('/sell');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await createListing(formData);
      navigate('/browse'); // Redirect to shop to see their listing
    } catch (err) {
      setError(err.message || "Failed to create listing.");
      setLoading(false);
    }
  };

  return (
    <div className="sell-page section">
      <div className="container">
        <h1 className="candy-text sell-title">LIST YOUR GEAR</h1>
        <p className="sell-subtitle">Create a marketplace listing to sell your camera directly to other enthusiasts.</p>

        <form className="sell-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Title</label>
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

          <div className="form-row">
            <div className="form-group">
              <label>Brand</label>
              <select name="brand" className="wireframe-select" value={formData.brand} onChange={handleInputChange} required>
                <option value="">Select Brand</option>
                <option value="SONY">Sony</option>
                <option value="CANON">Canon</option>
                <option value="FUJIFILM">Fujifilm</option>
                <option value="NIKON">Nikon</option>
                <option value="LEICA">Leica</option>
                <option value="PANASONIC">Panasonic</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select name="category" className="wireframe-select" value={formData.category} onChange={handleInputChange} required>
                <option value="mirrorless">Mirrorless</option>
                <option value="dslr">DSLR</option>
                <option value="compact">Compact</option>
                <option value="lens">Lens</option>
                <option value="film">Film</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Selling Price (₹)</label>
            <input 
              type="number" 
              name="current_price" 
              className="wireframe-input" 
              placeholder="e.g. 150000" 
              value={formData.current_price} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Condition</label>
            <select name="condition" className="wireframe-select" value={formData.condition} onChange={handleInputChange} required>
              <option value="MINT">Mint (10/10)</option>
              <option value="LIKE NEW">Like New (9.5/10)</option>
              <option value="EXCELLENT">Excellent (9/10)</option>
              <option value="GOOD">Good (8/10)</option>
              <option value="FAIR">Fair (7/10)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Condition Notes</label>
            <input 
              type="text" 
              name="condition_note" 
              className="wireframe-input" 
              placeholder="e.g. Minor scuff on bottom plate" 
              value={formData.condition_note} 
              onChange={handleInputChange} 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              className="wireframe-input" 
              placeholder="Describe what's included, history of use, etc." 
              value={formData.description} 
              onChange={handleInputChange} 
              rows={4}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="wireframe-btn submit-btn" 
            disabled={loading}
          >
            {loading ? 'PUBLISHING...' : (isAuthenticated ? 'PUBLISH LISTING' : 'LOG IN TO PUBLISH')}
          </button>
        </form>
      </div>
    </div>
  );
}
