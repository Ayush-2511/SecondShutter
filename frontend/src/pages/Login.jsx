import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Get the redirect path if they were sent here from a protected action
  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await login();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate(from === '/checkout' || from === '/profile' || from === '/sell' ? '/' : from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="candy-text login-title">ACCESS PORTAL</h1>
        <p className="login-subtitle">Sign in to track orders, get instant trade-in quotes, and speed through checkout.</p>
        
        <div className="login-card">
          <button 
            className="google-auth-btn" 
            onClick={handleGoogleLogin} 
            disabled={loading}
          >
            {loading ? 'AUTHENTICATING...' : 'CONTINUE WITH GOOGLE'}
          </button>
          
          <div className="login-divider">
            <span>OR</span>
          </div>

          <button 
            className="skip-auth-btn" 
            onClick={handleSkip}
          >
            SKIP FOR NOW (GUEST MODE)
          </button>
        </div>
      </div>
    </div>
  );
}
