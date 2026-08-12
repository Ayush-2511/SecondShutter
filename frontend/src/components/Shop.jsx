import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Shop.css';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const shopRef = useRef(null);

  useEffect(() => {
    const el = shopRef.current;
    if (!el) return;

    const header = el.querySelector('.section-header');
    const cards = el.querySelectorAll('.product-card');

    gsap.set(header, { y: 40, opacity: 0 });
    gsap.set(cards, { y: 60, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(header, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' })
          .to(cards, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'expo.out' }, "-=0.8");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="shop container" ref={shopRef}>
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
