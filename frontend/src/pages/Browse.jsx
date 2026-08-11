import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../data/mockData';
import './Browse.css';

const ITEMS_PER_PAGE = 20;

export default function Browse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    // Pagination slice
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    setProducts(productsData.slice(startIdx, endIdx));
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="browse-page section" style={{ paddingTop: '140px' }}>
      <div className="container">
        <div className="browse-header">
          <h1 className="page-title">ALL GEAR</h1>
          <div className="browse-search">
            <input type="text" placeholder="Search models, brands..." className="browse-search-input" />
            <button className="search-submit-btn wireframe-btn">SEARCH</button>
          </div>
        </div>

        <div className="browse-layout">
          {/* Left Sidebar Filters - Wireframe */}
          <aside className="browse-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">CATEGORY</h3>
              {['DSLR', 'Mirrorless', 'Film', 'Lenses'].map(cat => (
                <label key={cat} className="filter-label">
                  <input type="checkbox" className="wireframe-checkbox" />
                  {cat}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h3 className="filter-title">BRAND</h3>
              {['Sony', 'Canon', 'Fujifilm', 'Nikon'].map(brand => (
                <label key={brand} className="filter-label">
                  <input type="checkbox" className="wireframe-checkbox" />
                  {brand}
                </label>
              ))}
            </div>
          </aside>

          {/* Right Catalog Grid */}
          <div className="browse-content">
            <div className="browse-sort-bar">
              <span className="results-count">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, productsData.length)} of {productsData.length} items
              </span>
              <select className="wireframe-select">
                <option>Sort by: Newest First</option>
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
              </select>
            </div>

            <div className="browse-grid">
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="product-card-wireframe"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  {product.badge && <div className="product-badge-wireframe">{product.badge}</div>}
                  <div className="product-image-wireframe wireframe-img">IMAGE PLACEHOLDER</div>
                  <div className="product-info-wireframe">
                    <span className="product-brand-wireframe">{product.brand}</span>
                    <h3 className="product-name-wireframe">{product.name}</h3>
                    <div className="product-meta-wireframe">
                      <span>{product.shutter_count?.toLocaleString('en-IN')} Shutters</span>
                      <span>★ {product.rating}</span>
                    </div>
                    <div className="product-pricing-wireframe">
                      <span className="price-original-wireframe">₹{product.original_price?.toLocaleString('en-IN')}</span>
                      <span className="price-current-wireframe">₹{product.current_price?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="product-cta-wireframe wireframe-btn">VIEW ITEM →</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination-block">
              <button 
                className="page-btn-wireframe" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                PREV
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1}
                  className={`page-btn-wireframe ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className="page-btn-wireframe" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
