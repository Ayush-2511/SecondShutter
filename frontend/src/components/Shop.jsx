import './Shop.css';

export default function Shop() {
  return (
    <section className="shop container">
      <div className="section-header">
        <span className="section-tag">◆ NEW ARRIVALS</span>
        <h2 className="section-title">FRESH OUT OF THE DARKROOM</h2>
      </div>
      <div className="products-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="product-card">
            <div className="product-image wireframe-img">[ IMAGE ]</div>
            <div className="product-info">
              <span className="product-brand">BRAND</span>
              <h3 className="product-name">Camera Model {i}</h3>
              <div className="product-pricing">
                <span className="price-original">$999</span>
                <span className="price-current">$799</span>
              </div>
              <button className="btn btn-primary product-btn">ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
