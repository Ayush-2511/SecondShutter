import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import './Newsletter.css';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const newsRef = useRef(null);

  useEffect(() => {
    const el = newsRef.current;
    if (!el) return;

    const card = el.querySelector('.newsletter-card');

    gsap.set(card, { y: 60, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(card, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' });
      }
    });
  }, []);

  return (
    <section className="newsletter container" ref={newsRef}>
      <div className="newsletter-card" style={{ transition: 'box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '12px 12px 0px #000'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '8px 8px 0px #000'; }}>
        <h2 className="newsletter-title">JOIN THE CLUB</h2>
        <p className="newsletter-desc">Get notified about rare finds, exclusive discounts, and community events.</p>
        <div className="newsletter-input-group">
          <input type="email" className="newsletter-input" placeholder="Your email address" />
          <button className="btn btn-secondary newsletter-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            SUBSCRIBE <Mail size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
