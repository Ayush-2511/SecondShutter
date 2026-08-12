import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productsApi';
import { useCart } from '../context/CartContext';
import './Shop.css';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const shopRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products for homepage", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (loading || products.length < 4) return;

    const el = shopRef.current;
    if (!el) return;

    const header = el.querySelector('.section-header');
    const cards = el.querySelectorAll('.product-card');

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

    // Refresh GSAP triggers because DOM height might have changed if Shop doesn't render
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      trigger.kill();
    };
  }, [loading, products]);

  if (loading || products.length < 4) {
    return null;
  }

  const topProducts = products.slice(0, 4);

  return (
    <section className="shop container" ref={shopRef}>
      <div className="section-header">
        <span className="section-tag">◆ NEW ARRIVALS</span>
        <h2 className="section-title">FRESH OUT OF THE DARKROOM</h2>
      </div>
      <div className="products-grid">
        {topProducts.map((product) => (
          <Link to={`/product/${product.slug}`} key={product.id} className="product-card" style={{ textDecoration: 'none' }}>
            <div className="product-image wireframe-img" style={{ overflow: 'hidden', padding: 0, backgroundColor: 'var(--brutal-light)' }}>
              {product.image_urls && product.image_urls.length > 0 ? (
                <img src={product.image_urls[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                '[ IMAGE ]'
              )}
            </div>
            <div className="product-info">
              <span className="product-brand">{product.brand}</span>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-pricing">
                {product.original_price && product.original_price > product.current_price && (
                  <span className="price-original">₹{product.original_price}</span>
                )}
                <span className="price-current">₹{product.current_price}</span>
              </div>
              <button 
                className="btn btn-primary product-btn"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigating to the product page when adding to cart
                  addToCart(product);
                  toggleCart();
                }}
              >
                ADD TO CART
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
