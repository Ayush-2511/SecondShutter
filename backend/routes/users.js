const express = require('express');
const supabase = require('../supabase');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// POST /api/users/sync — Upsert Firebase user into Supabase users table
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const { id, email, name, avatar_url } = req.user; // from Firebase decoded token
    
    // Split name into first and last
    const nameParts = (name || '').split(' ');
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';

    // Upsert into Supabase
    const { data, error } = await supabase
      .from('users')
      .upsert([{
        id,
        email,
        first_name,
        last_name,
        avatar_url
      }], { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('POST /api/users/sync error:', err.message);
    res.status(500).json({ error: 'Failed to sync user' });
  }
});

// GET /api/users/me — get the authenticated user's profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, avatar_url, phone, address, created_at')
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

// GET /api/users/me/orders — get the authenticated user's order history
router.get('/me/orders', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, product:products(*))')
      .eq('user_id', req.user.id)
      .order('placed_at', { ascending: false });

    if (error) throw error;
    
    // Format orders for the frontend
    const formattedOrders = data.map(order => ({
      ...order,
      items: order.order_items.map(item => ({
        ...item,
        brand: item.product?.brand,
        name: item.product?.name,
        condition: item.product?.condition,
      }))
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error('GET /api/users/me/orders error:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/users/me/listings — get the authenticated user's marketplace listings
router.get('/me/listings', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('GET /api/users/me/listings error:', err.message);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

module.exports = router;
