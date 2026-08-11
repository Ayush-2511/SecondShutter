import './Sell.css';

export default function Sell() {
  return (
    <section className="sell container">
      <div className="sell-card">
        <h2 className="sell-title">GOT GEAR GATHERING DUST?</h2>
        <p className="sell-desc">Turn your old cameras and lenses into cash or store credit.</p>
        <div className="sell-benefits">
          <div className="benefit">Instant Quote</div>
          <div className="benefit">Free Shipping</div>
          <div className="benefit">Fast Payment</div>
        </div>
        <div className="sell-input-group">
          <input type="text" className="sell-input" placeholder="What do you want to sell?" />
          <button className="btn btn-primary sell-btn">GET QUOTE</button>
        </div>
      </div>
    </section>
  );
}
