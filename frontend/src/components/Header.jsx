import './Header.css';

export default function Header() {
  return (
    <div className="header-container">
      <nav className="header-nav">
        <div className="header-logo wireframe-img">LOGO</div>
        <div className="header-links">
          <div className="header-link">SHOP</div>
          <div className="header-link">BROWSE</div>
          <div className="header-link">ABOUT</div>
          <div className="header-link">REVIEWS</div>
          <div className="header-link">SELL</div>
        </div>
        <div className="header-actions">
          <div className="header-action wireframe-img">S</div>
          <div className="header-action wireframe-img">C</div>
        </div>
      </nav>
    </div>
  );
}
