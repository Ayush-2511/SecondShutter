import './Categories.css';

export default function Categories() {
  const cats = ['DSLR', 'MIRRORLESS', 'FILM', 'LENSES', 'LIGHTING', 'ACCESSORIES'];
  return (
    <section className="categories container">
      <div className="section-header">
        <span className="section-tag">◆ BROWSE BY TYPE</span>
        <h2 className="section-title">PICK YOUR POISON</h2>
      </div>
      <div className="categories-grid">
        {cats.map(c => (
          <div key={c} className="category-card">
            <div className="cat-icon wireframe-img">[ ICON ]</div>
            <h3>{c}</h3>
            <span className="cat-count">100 items</span>
          </div>
        ))}
      </div>
    </section>
  );
}
