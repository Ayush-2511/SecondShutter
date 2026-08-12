import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      await login();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="login-page section">
      <div className="container">
        <div className="login-card-wireframe" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <h2 className="candy-text" style={{ fontSize: '32px', marginBottom: '10px' }}>
            WELCOME BACK
          </h2>
          <p style={{ marginBottom: '40px', color: '#666' }}>
            Sign in to access your marketplace listings.
          </p>

          {error && <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

          <button 
            onClick={handleGoogleLogin} 
            className="wireframe-btn login-btn" 
            disabled={loading} 
            style={{ width: '100%', maxWidth: '300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {loading ? 'CONNECTING...' : 'CONTINUE WITH GOOGLE'}
          </button>
        </div>
      </div>
    </div>
  );
}
