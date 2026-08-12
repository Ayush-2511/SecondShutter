import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const reviewsRef = useRef(null);

  useEffect(() => {
    const el = reviewsRef.current;
    if (!el) return;

    const header = el.querySelector('.section-header');
    const cards = el.querySelectorAll('.review-card');

    gsap.set(header, { y: 40, opacity: 0 });
    gsap.set(cards, { y: 60, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(header, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' })
          .to(cards, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'expo.out' }, "-=0.8");
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="reviews container" ref={reviewsRef}>
      <div className="section-header">
        <span className="section-tag">◆ WALL OF FAME</span>
        <h2 className="section-title">THE VERDICT</h2>
      </div>
      <div className="reviews-grid">
        {[1, 2, 3].map(i => (
          <div key={i} className="review-card" style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #000'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}>
            <div className="review-stars" style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#000" strokeWidth={0} />)}
            </div>
            <p className="review-text">"This is a placeholder review text to show how the typography and spacing look in the wireframe design."</p>
            <div className="review-author">
              <div className="pixel-avatar wireframe-img" style={{ borderRadius: '50%' }}></div>
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
