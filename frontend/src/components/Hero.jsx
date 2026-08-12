import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import './Hero.css';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&q=80&w=800'
];

export default function Hero() {
  const heroRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const badge = el.querySelector('.hero-badge');
    const titleLines = el.querySelectorAll('.hero-title span');
    const subtitle = el.querySelector('.hero-subtitle');
    const actions = el.querySelector('.hero-actions');
    const imageContainer = el.querySelector('.hero-carousel-container');

    gsap.set([badge, titleLines, subtitle, actions, imageContainer], { y: 40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
    
    tl.to(badge, { y: 0, opacity: 1, delay: 0.1 })
      .to(titleLines, { y: 0, opacity: 1, stagger: 0.15 }, "-=1.0")
      .to(subtitle, { y: 0, opacity: 1 }, "-=1.0")
      .to(actions, { y: 0, opacity: 1 }, "-=1.0")
      .to(imageContainer, { y: 0, opacity: 1, duration: 1.5 }, "-=1.1");
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
          <Link to="/browse" className="btn btn-primary">EXPLORE GEAR -{'>'}</Link>
          <Link to="/sell" className="btn btn-secondary">SELL YOURS /</Link>
        </div>
      </div>
      <div className="hero-carousel-container" style={{ flex: 1, height: '400px', maxWidth: '500px', marginLeft: '40px', position: 'relative', overflow: 'hidden', border: '2px solid var(--brutal-fg)', boxShadow: '8px 8px 0 var(--brutal-fg)', borderRadius: 'var(--brutal-radius)' }}>
        <div className="hero-carousel-track" style={{ display: 'flex', height: '100%', transition: 'transform 0.8s cubic-bezier(0.87, 0, 0.13, 1)', transform: `translateX(-${currentIndex * 100}%)` }}>
          {HERO_IMAGES.map((src, i) => (
            <img key={i} src={src} alt="Camera Gear" style={{ width: '100%', height: '100%', objectFit: 'cover', flexShrink: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
