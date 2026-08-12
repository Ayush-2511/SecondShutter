import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/productsApi';
import './Browse.css';

const ITEMS_PER_PAGE = 20;

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  useEffect(() => {
    setLoading(true);
    
    // Convert arrays to single strings if your API expects that, or pass arrays.
    // Right now our backend expects a single string or handles it.
    // For simplicity, we just pass the first selected if backend doesn't support array 'in' queries.
    // If we want multiple, we'd need to modify backend. For now, let's just pass the first one selected,
    // or if we want multiple we can join them. Since our backend expects a single string:
    const category = selectedCategories.length > 0 ? selectedCategories[0] : '';
    const brand = selectedBrands.length > 0 ? selectedBrands[0] : '';
    
    // Map sortOption to API expected value
    let sort = '';
    if (sortOption === 'price_asc') sort = 'price_asc';
    if (sortOption === 'price_desc') sort = 'price_desc';

    getProducts({ q: searchQuery, category, brand, sort })
      .then(data => {
        setTotalProducts(data.length);
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIdx = startIdx + ITEMS_PER_PAGE;
        setProducts(data.slice(startIdx, endIdx));
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchQuery, selectedCategories, selectedBrands, sortOption]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchParams({ q: searchInput });
    setCurrentPage(1);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(cat);
      // Backend only supports 1 category currently, so we'll replace or toggle
      if (isSelected) return [];
      return [cat];
    });
    setCurrentPage(1);
  };

  const toggleBrand = (b) => {
    setSelectedBrands(prev => {
      const isSelected = prev.includes(b);
      if (isSelected) return [];
      return [b];
    });
    setCurrentPage(1);
  };

  return (
    <main className="browse-page section" style={{ paddingTop: '140px' }}>
      <div className="container">
        <div className="browse-header">
          <h1 className="page-title">ALL GEAR</h1>
          <form className="browse-search" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search models, brands..." 
              className="browse-search-input" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-submit-btn wireframe-btn">SEARCH</button>
          </form>
        </div>

        <div className="browse-layout">
          {/* Left Sidebar Filters */}
          <aside className="browse-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">CATEGORY</h3>
              {[
                { id: 'mirrorless', label: 'Mirrorless' }, 
                { id: 'dslr', label: 'DSLR' }, 
                { id: 'film', label: 'Film' }, 
                { id: 'lens', label: 'Lenses' },
                { id: 'accessory', label: 'Accessories' }
              ].map(cat => (
                <label key={cat.id} className="filter-label">
                  <input 
                    type="checkbox" 
                    className="wireframe-checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  {cat.label}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h3 className="filter-title">BRAND</h3>
              {['Sony', 'Canon', 'Fujifilm', 'Nikon', 'Leica', 'Panasonic'].map(brand => (
                <label key={brand} className="filter-label">
                  <input 
                    type="checkbox" 
                    className="wireframe-checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </aside>

          {/* Right Catalog Grid */}
          <div className="browse-content">
            <div className="browse-sort-bar">
              <span className="results-count">
                Showing {totalProducts === 0 ? 0 : ((currentPage - 1) * ITEMS_PER_PAGE) + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of {totalProducts} items
              </span>
              <select 
                className="wireframe-select"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">Sort by: Newest First</option>
                <option value="price_asc">Sort by: Price (Low to High)</option>
                <option value="price_desc">Sort by: Price (High to Low)</option>
              </select>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading gear...</div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                No products found matching your filters.
              </div>
            ) : (
              <div className="browse-grid">
                {products.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="product-card-wireframe"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    {product.badge && <div className="product-badge-wireframe">{product.badge}</div>}
                    <div className="product-image-wireframe wireframe-img" style={{ overflow: 'hidden', padding: 0, backgroundColor: 'var(--brutal-light)' }}>
                      {product.image_urls && product.image_urls.length > 0 ? (
                        <img src={product.image_urls[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        'IMAGE PLACEHOLDER'
                      )}
                    </div>
                    <div className="product-info-wireframe">
                      <span className="product-brand-wireframe">{product.brand}</span>
                      <h3 className="product-name-wireframe">{product.name}</h3>
                      <div className="product-meta-wireframe" style={{ fontSize: '11px', color: '#666' }}>
                        <span>Condition: {product.condition}</span>
                        <span>By: {product.seller?.first_name || 'Anonymous'}</span>
                      </div>
                      <div className="product-price-row">
                        <div className="price-current-wireframe">
                          {product.original_price && product.original_price > product.current_price && (
                            <span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: '8px', fontSize: '12px' }}>
                              ₹{product.original_price}
                            </span>
                          )}
                          ₹{product.current_price}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-wireframe">
                <button 
                  className="page-btn-wireframe" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </button>
                <span className="page-current-wireframe">{currentPage} / {totalPages}</span>
                <button 
                  className="page-btn-wireframe" 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
