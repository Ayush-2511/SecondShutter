import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Camera, Aperture, Film, Crosshair, Sun, Battery } from 'lucide-react';
import './Categories.css';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const cats = [
    { name: 'DSLR', id: 'dslr', icon: <Camera size={40} strokeWidth={1.5} /> },
    { name: 'MIRRORLESS', id: 'mirrorless', icon: <Aperture size={40} strokeWidth={1.5} /> },
    { name: 'FILM', id: 'film', icon: <Film size={40} strokeWidth={1.5} /> },
    { name: 'LENSES', id: 'lens', icon: <Crosshair size={40} strokeWidth={1.5} /> },
    { name: 'ACCESSORIES', id: 'accessory', icon: <Battery size={40} strokeWidth={1.5} /> }
  ];
  const catRef = useRef(null);

  useEffect(() => {
    const el = catRef.current;
    if (!el) return;

    const header = el.querySelector('.section-header');
    const cards = el.querySelectorAll('.category-card');

    gsap.set(header, { y: 40, opacity: 0 });
    gsap.set(cards, { scale: 0.9, y: 20, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(header, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' })
          .to(cards, { scale: 1, y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out' }, "-=0.8");
      }
    });
    
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="categories container" ref={catRef}>
      <div className="section-header">
        <span className="section-tag">◆ BROWSE BY TYPE</span>
        <h2 className="section-title">PICK YOUR POISON</h2>
      </div>
      <div className="categories-grid">
        {cats.map(c => (
          <Link 
            to={`/browse?category=${c.id}`}
            key={c.name} 
            className="category-card" 
            style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }} 
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #000'; }} 
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
          >
            <div className="cat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{c.icon}</div>
            <h3>{c.name}</h3>
            <span className="cat-count">EXPLORE &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
