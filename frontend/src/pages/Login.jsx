import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
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
    <div className="login-page section" style={{ paddingTop: '160px' }}>
      <div className="login-container">
        <span className="section-tag" style={{ justifyContent: 'center' }}>◆ MEMBERS ONLY</span>
        <h2 className="login-title">
          WELCOME BACK
        </h2>
        <p className="login-subtitle">
          Sign in to access your marketplace listings, view orders, and sell gear.
        </p>

        <div className="login-card">
          {error && <div className="error-message" style={{ margin: 0 }}>{error}</div>}

          <button 
            onClick={handleGoogleLogin} 
            className="google-auth-btn" 
            disabled={loading} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            {loading ? 'CONNECTING...' : (
              <>
                <LogIn size={20} strokeWidth={2.5} /> CONTINUE WITH GOOGLE
              </>
            )}
          </button>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button className="skip-auth-btn" onClick={() => navigate('/browse')}>
            CONTINUE BROWSING AS GUEST
          </button>
        </div>
      </div>
    </div>
  );
}
