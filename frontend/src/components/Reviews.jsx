import './Reviews.css';

export default function Reviews() {
  return (
    <section className="reviews container">
      <div className="section-header">
        <span className="section-tag">◆ WALL OF FAME</span>
        <h2 className="section-title">THE VERDICT</h2>
      </div>
      <div className="reviews-grid">
        {[1, 2, 3].map(i => (
          <div key={i} className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"This is a placeholder review text to show how the typography and spacing look in the wireframe design."</p>
            <div className="review-author">
              <div className="pixel-avatar wireframe-img"></div>
              <div>
                <span className="author-name">USER {i}</span>
                <span className="author-role">Verified Buyer</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
