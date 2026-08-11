import './Hero.css';

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <div className="hero-badge wireframe-img">PIXEL-PERFECT PRE-OWNED GEAR</div>
        <h1 className="hero-title">
          EVERY SHUTTER<br />
          HAS A STORY
        </h1>
        <p className="hero-subtitle">
          Discover curated second-hand cameras, lenses & accessories.<br />
          Professionally inspected. Pixel-perfectly priced.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">EXPLORE GEAR -{'>'}</button>
          <button className="btn btn-secondary">SELL YOURS /</button>
        </div>
      </div>
      <div className="hero-image wireframe-img">
        [ HERO IMAGE PLACEHOLDER ]
      </div>
    </section>
  );
}
