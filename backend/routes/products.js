const express = require('express');
const supabase = require('../supabase');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// GET /api/products — list all in-stock products
router.get('/', async (req, res) => {
  try {
    const { category, brand, sort } = req.query;

    let query = supabase
      .from('products')
      // Join with users table to get real seller information
      .select('*, seller:users(id, first_name, last_name)')
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
      .select('*, seller:users(id, first_name, last_name)')
      .eq('slug', req.params.slug)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Product not found' });

    res.json(data);
  } catch (err) {
    console.error('GET /api/products/:slug error:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products — create a new listing (marketplace)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, brand, category, condition, condition_note, current_price, description } = req.body;
    
    // Generate a simple slug from name and timestamp
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const newProduct = {
      slug,
      brand,
      name,
      category,
      condition,
      condition_note,
      current_price: parseInt(current_price),
      original_price: parseInt(current_price), // Satisfy DB NOT NULL constraint
      description,
      seller_id: req.user.id, // Tie to the authenticated user!
      in_stock: true,
      image_count: 1
    };

    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);

  } catch (err) {
    console.error('POST /api/products error:', err.message);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

module.exports = router;
