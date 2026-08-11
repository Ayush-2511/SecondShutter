import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* ABOUT HERO (MANIFESTO) */}
      <section className="about-hero section" style={{ paddingTop: '180px', paddingBottom: '80px', borderBottom: '4px solid var(--brutal-fg)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="manifesto-content">
            <h1 className="candy-text massive-title" style={{ fontSize: '64px', lineHeight: '1.1', marginBottom: '24px' }}>WE BELIEVE IN<br/>SECOND CHANCES.</h1>
            <div className="manifesto-body" style={{ fontSize: '18px', maxWidth: '800px', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '16px' }}>Every shutter click freezes time, but the cameras themselves shouldn't be frozen on a shelf. We started SecondShutter because we were tired of seeing incredible, professional-grade tools gathering dust while new creators were priced out of the market.</p>
              <p style={{ marginBottom: '24px' }}>We are not just a marketplace. We are a sanctuary for pixels, glass, and sensors. We buy, rigorously test, and re-home the best gear in the world.</p>
              <p className="manifesto-highlight" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--brutal-primary)', borderLeft: '4px solid var(--brutal-primary)', paddingLeft: '16px' }}>NO B.S. PRICING. NO HIDDEN FEES. JUST GOOD GEAR.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section className="about-process section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="checkout-section-title" style={{ fontSize: '32px', borderBottom: '4px solid var(--brutal-fg)', paddingBottom: '16px', marginBottom: '48px' }}>OUR PROCESS</h2>
          <div className="process-timeline">
            
            <div className="process-card">
              <div className="process-icon">📦</div>
              <div className="process-info">
                <h3>1. SOURCING</h3>
                <p>We buy directly from professionals, studios, and hobbyists who treat their gear like gold. No shady third-party sellers.</p>
              </div>
            </div>

            <div className="process-card">
              <div className="process-icon">🔍</div>
              <div className="process-info">
                <h3>2. 40-POINT INSPECTION</h3>
                <p>Every sensor is cleaned. Every button is pressed. We check autofocus accuracy, weather sealing, and firmware.</p>
              </div>
            </div>

            <div className="process-card">
              <div className="process-icon">🏷️</div>
              <div className="process-info">
                <h3>3. HONEST GRADING</h3>
                <p>We grade harshly so you are pleasantly surprised. If we say it's Mint, it's Mint. We photograph the actual item you are buying.</p>
              </div>
            </div>

            <div className="process-card">
              <div className="process-icon">🛡️</div>
              <div className="process-info">
                <h3>4. 6-MONTH WARRANTY</h3>
                <p>We stand by our work. Every body and lens comes with a 6-month warranty covering any mechanical failures.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="about-values section" style={{ background: 'var(--brutal-secondary)', padding: '80px 0', borderTop: '4px solid var(--brutal-fg)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="checkout-section-title" style={{ fontSize: '32px', textAlign: 'center', margin: '0 0 60px 0' }}>CORE VALUES</h2>
          <div className="values-grid">
            
            <div className="value-item">
              <div className="value-art wireframe-img" style={{ height: '120px', marginBottom: '20px', fontSize: '12px' }}>
                SUSTAINABILITY ICON
              </div>
              <h4>SUSTAINABILITY</h4>
              <p>Keep perfectly good tech out of landfills. Buy used, shoot more.</p>
            </div>

            <div className="value-item">
              <div className="value-art wireframe-img" style={{ height: '120px', marginBottom: '20px', fontSize: '12px' }}>
                TRANSPARENCY ICON
              </div>
              <h4>TRANSPARENCY</h4>
              <p>High-res photos of every scuff and scratch. You know exactly what you're getting.</p>
            </div>

            <div className="value-item">
              <div className="value-art wireframe-img" style={{ height: '120px', marginBottom: '20px', fontSize: '12px' }}>
                COMMUNITY ICON
              </div>
              <h4>COMMUNITY</h4>
              <p>We support emerging artists with monthly gear grants and educational resources.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
