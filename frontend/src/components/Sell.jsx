import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './Sell.css';

gsap.registerPlugin(ScrollTrigger);

export default function Sell() {
  const sellRef = useRef(null);

  useEffect(() => {
    const el = sellRef.current;
    if (!el) return;

    const card = el.querySelector('.sell-card');
    const items = card.children;

    gsap.set(card, { scale: 0.95, y: 30, opacity: 0 });
    gsap.set(items, { y: 20, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(card, { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'expo.out' })
          .to(items, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'expo.out' }, "-=0.8");
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="sell container" ref={sellRef}>
      <div className="sell-card" style={{ transition: 'box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '12px 12px 0px #000'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '8px 8px 0px #000'; }}>
        <h2 className="sell-title">GOT GEAR GATHERING DUST?</h2>
        <p className="sell-desc">Turn your old cameras and lenses into cash or store credit.</p>
        <div className="sell-benefits">
          <div className="benefit" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Instant Quote</div>
          <div className="benefit" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Free Shipping</div>
          <div className="benefit" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Fast Payment</div>
        </div>
        <div className="sell-input-group">
          <input type="text" className="sell-input" placeholder="What do you want to sell?" />
          <button className="btn btn-primary sell-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            GET QUOTE <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
