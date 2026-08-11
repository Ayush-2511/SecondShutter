const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

// GET /api/products — list all in-stock products
router.get('/', async (req, res) => {
  try {
    const { category, brand, sort } = req.query;

    let query = supabase
      .from('products')
      .select('*')
      .eq('in_stock', true);

    if (category) query = query.eq('category', category);
    if (brand) query = query.ilike('brand', brand);

    // Sorting
    if (sort === 'price_asc') query = query.order('current_price', { ascending: true });
    else if (sort === 'price_desc') query = query.order('current_price', { ascending: false });
    else query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET /api/products error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slug — get single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', req.params.slug)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Product not found' });

    res.json(data);
  } catch (err) {
    console.error('GET /api/products/:slug error:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
