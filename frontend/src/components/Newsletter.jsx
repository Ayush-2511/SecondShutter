import './Newsletter.css';

export default function Newsletter() {
  return (
    <section className="newsletter container">
      <div className="newsletter-card">
        <h2 className="newsletter-title">JOIN THE CLUB</h2>
        <p className="newsletter-desc">Get notified about rare finds, exclusive discounts, and community events.</p>
        <div className="newsletter-input-group">
          <input type="email" className="newsletter-input" placeholder="Your email address" />
          <button className="btn btn-secondary newsletter-btn">SUBSCRIBE</button>
        </div>
      </div>
    </section>
  );
}
