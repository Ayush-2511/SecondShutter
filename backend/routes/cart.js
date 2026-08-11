const express = require('express');
const supabase = require('../supabase');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// GET /api/cart — get current user's cart with product details
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        added_at,
        product:product_id (
          id, slug, brand, name, condition, current_price, currency, image_count
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    res.json(cartItems);
  } catch (err) {
    console.error('GET /api/cart error:', err.message);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart — add a product to cart
router.post('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id } = req.body;

    if (!product_id) return res.status(400).json({ error: 'product_id is required' });

    // Verify the product exists and is still in stock
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, in_stock')
      .eq('id', product_id)
      .single();

    if (productError || !product) return res.status(404).json({ error: 'Product not found' });
    if (!product.in_stock) return res.status(409).json({ error: 'Product is no longer available' });

    // Add to cart (UNIQUE constraint handles duplicates gracefully)
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id })
      .select()
      .single();

    if (error) {
      // Unique constraint violation = already in cart
      if (error.code === '23505') return res.status(409).json({ error: 'Already in cart' });
      throw error;
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('POST /api/cart error:', err.message);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:product_id — remove a product from cart
router.delete('/:product_id', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id } = req.params;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', product_id);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/cart error:', err.message);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

module.exports = router;
