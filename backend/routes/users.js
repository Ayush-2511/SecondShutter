const express = require('express');
const supabase = require('../supabase');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// GET /api/users/me — get the authenticated user's profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, address, created_at')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.json(data);
  } catch (err) {
    console.error('GET /api/users/me error:', err.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PATCH /api/users/me — update profile fields
router.patch('/me', requireAuth, async (req, res) => {
  try {
    const { first_name, last_name, phone, address } = req.body;

    const updates = {};
    if (first_name !== undefined) updates.first_name = first_name;
    if (last_name  !== undefined) updates.last_name  = last_name;
    if (phone      !== undefined) updates.phone      = phone;
    if (address    !== undefined) updates.address    = address;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('PATCH /api/users/me error:', err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET /api/users/me/orders — get order history with product details
router.get('/me/orders', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          price_at_purchase,
          product:product_id (id, slug, brand, name, condition, image_count)
        )
      `)
      .eq('user_id', req.user.id)
      .order('placed_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET /api/users/me/orders error:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
