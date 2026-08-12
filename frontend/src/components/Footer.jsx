import { Link } from 'react-router-dom';
import { Aperture } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-col">
          <Link to="/" className="footer-logo" aria-label="Home" style={{ display: 'inline-flex', marginBottom: '16px', color: 'var(--brutal-fg)' }}>
            <Aperture size={40} strokeWidth={2} />
          </Link>
          <p className="footer-about">
            SecondShutter is the pixel-perfect destination for second-hand cameras, lenses, and gear.
          </p>
          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brutal-fg)', border: '2px solid var(--brutal-fg)', transition: 'transform 0.2s', boxShadow: '2px 2px 0 var(--brutal-fg)', textDecoration: 'none', fontWeight: 'bold', fontFamily: 'var(--font-pixel)', fontSize: '10px' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--brutal-fg)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--brutal-fg)'; }}>
              TW
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brutal-fg)', border: '2px solid var(--brutal-fg)', transition: 'transform 0.2s', boxShadow: '2px 2px 0 var(--brutal-fg)', textDecoration: 'none', fontWeight: 'bold', fontFamily: 'var(--font-pixel)', fontSize: '10px' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--brutal-fg)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--brutal-fg)'; }}>
              IG
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brutal-fg)', border: '2px solid var(--brutal-fg)', transition: 'transform 0.2s', boxShadow: '2px 2px 0 var(--brutal-fg)', textDecoration: 'none', fontWeight: 'bold', fontFamily: 'var(--font-pixel)', fontSize: '10px' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--brutal-fg)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--brutal-fg)'; }}>
              FB
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>SHOP</h4>
          <Link to="/browse?category=dslr">DSLR Cameras</Link>
          <Link to="/browse?category=mirrorless">Mirrorless Cameras</Link>
          <Link to="/browse?category=film">Film Cameras</Link>
          <Link to="/browse?category=lens">Lenses</Link>
          <Link to="/browse?category=accessory">Accessories</Link>
        </div>
        
        <div className="footer-col">
          <h4>MARKETPLACE</h4>
          <Link to="/sell">Sell Your Gear</Link>
          <Link to="/browse">Browse All</Link>
          <Link to="/login">Login / Register</Link>
          <Link to="/profile">My Profile</Link>
        </div>
        
        <div className="footer-col">
          <h4>COMPANY</h4>
          <Link to="/about">About Us</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content container">
          <span>&copy; {new Date().getFullYear()} SecondShutter. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
