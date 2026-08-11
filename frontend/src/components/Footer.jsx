import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-col">
          <div className="footer-logo wireframe-img" style={{ width: '40px', height: '40px', marginBottom: '16px' }}>
            LOGO
          </div>
          <p className="footer-about">
            SecondShutter is the pixel-perfect destination for second-hand cameras, lenses, and gear.
          </p>
          <div className="footer-socials">
            <div className="social-link wireframe-img">TW</div>
            <div className="social-link wireframe-img">IG</div>
            <div className="social-link wireframe-img">FB</div>
          </div>
        </div>
        <div className="footer-col">
          <h4>SHOP</h4>
          <a href="#">Digital Cameras</a>
          <a href="#">Film Cameras</a>
          <a href="#">Lenses</a>
        </div>
        <div className="footer-col">
          <h4>SUPPORT</h4>
          <a href="#">FAQ</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>
        <div className="footer-col">
          <h4>COMPANY</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-content container">
          <span>&copy; 2026 SecondShutter. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
