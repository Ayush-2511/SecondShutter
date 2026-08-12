import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const badge = el.querySelector('.hero-badge');
    const titleLines = el.querySelectorAll('.hero-title span');
    const subtitle = el.querySelector('.hero-subtitle');
    const actions = el.querySelector('.hero-actions');
    const image = el.querySelector('.hero-image');

    gsap.set([badge, titleLines, subtitle, actions, image], { y: 40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
    
    tl.to(badge, { y: 0, opacity: 1, delay: 0.1 })
      .to(titleLines, { y: 0, opacity: 1, stagger: 0.15 }, "-=1.0")
      .to(subtitle, { y: 0, opacity: 1 }, "-=1.0")
      .to(actions, { y: 0, opacity: 1 }, "-=1.0")
      .to(image, { y: 0, opacity: 1, scale: 1.05, duration: 1.5 }, "-=1.1");
  }, []);

  return (
    <section className="hero container" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-badge wireframe-img">PIXEL-PERFECT PRE-OWNED GEAR</div>
        <h1 className="hero-title">
          <span style={{ display: 'block' }}>EVERY SHUTTER</span>
          <span style={{ display: 'block' }}>HAS A STORY</span>
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
      <div className="hero-image wireframe-img" style={{ transformOrigin: 'center' }}>
        [ HERO IMAGE PLACEHOLDER ]
      </div>
    </section>
  );
}
