import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { toggleCart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    if (isAuthenticated) {
      toggleCart();
    } else {
      navigate('/login', { state: { from: location } });
    }
  };

  return (
    <div className="header-container">
      <nav className="header-nav">
        <Link to="/" className="header-logo wireframe-img" style={{textDecoration: 'none', color: 'inherit'}}>LOGO</Link>

        <div className="header-links">
          <Link to="/" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>SHOP</Link>
          <Link to="/browse" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>BROWSE</Link>
          <Link to="/about" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>ABOUT</Link>
          <div className="header-link">REVIEWS</div>
          <Link to="/sell" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>SELL</Link>
        </div>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isAuthenticated ? (
            <Link to="/login" className="header-action wireframe-img" style={{textDecoration: 'none', color: 'inherit', fontSize: '11px', width: 'auto', padding: '0 12px'}}>LOGIN</Link>
          ) : (
            <Link to="/profile" className="header-action wireframe-img" style={{textDecoration: 'none', color: 'inherit', fontSize: '11px', width: 'auto', padding: '0 12px'}}>PROFILE</Link>
          )}
          <div className="header-action wireframe-img" onClick={handleCartClick} style={{cursor: 'pointer'}}>C</div>
        </div>
      </nav>
    </div>
  );
}
