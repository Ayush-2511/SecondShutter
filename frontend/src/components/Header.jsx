import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, Aperture } from 'lucide-react';
import PillNav from './PillNav';
import './Header.css';

export default function Header() {
  const { toggleCart, cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartClick = () => {
    if (isAuthenticated) {
      toggleCart();
    } else {
      navigate('/login', { state: { from: location } });
    }
  };

  const navItems = [
    { label: 'SHOP', href: '/' },
    { label: 'BROWSE', href: '/browse' },
    { label: 'SELL', href: '/sell' },
    { label: 'ABOUT', href: '/about' }
  ];

  const cartCount = cartItems?.length || 0;

  const profileAction = isAuthenticated ? (
    <Link to="/profile" className="pill-action-btn" aria-label="Profile">
      {user?.photoURL ? (
        <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <User size={20} strokeWidth={2.5} />
      )}
    </Link>
  ) : (
    <Link to="/login" className="pill-action-btn" aria-label="Login">
      <User size={20} strokeWidth={2.5} />
    </Link>
  );

  const cartAction = (
    <button className="pill-action-btn" aria-label="Cart" onClick={handleCartClick}>
      <ShoppingCart size={20} strokeWidth={2.5} />
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </button>
  );

  const headerActions = (
    <>
      {profileAction}
      {cartAction}
    </>
  );

  return (
    <>
      {/* We only render the PillNav, which encapsulates the floating logic in PillNav.css */}
      <PillNav 
        logo={<Aperture size={24} strokeWidth={2} />}
        logoAlt="SecondShutter Home"
        items={navItems} 
        activeHref={location.pathname}
        baseColor="#c2573a"
        pillColor="transparent"
        hoveredPillTextColor="#fff"
        pillTextColor="#000"
        actions={headerActions}
      />
    </>
  );
}
