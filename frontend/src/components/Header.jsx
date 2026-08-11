import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { toggleCart } = useCart();

  return (
    <div className="header-container">
      <nav className="header-nav">
        <Link to="/" className="header-logo wireframe-img" style={{textDecoration: 'none', color: 'inherit'}}>LOGO</Link>

        <div className="header-links">
          <Link to="/" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>SHOP</Link>
          <Link to="/browse" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>BROWSE</Link>
          <div className="header-link">ABOUT</div>
          <div className="header-link">REVIEWS</div>
          <Link to="/sell" className="header-link" style={{textDecoration: 'none', color: 'inherit'}}>SELL</Link>
        </div>

        <div className="header-actions">
          <div className="header-action wireframe-img">S</div>
          <div className="header-action wireframe-img" onClick={toggleCart} style={{cursor: 'pointer'}}>C</div>
        </div>
      </nav>
    </div>
  );
}
