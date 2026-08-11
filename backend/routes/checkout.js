const express = require('express');
const supabase = require('../supabase');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// ─── SERVER-SIDE PRICING CONSTANTS ───────────────────────────────────────────
// These NEVER leave the server. The frontend cannot see or tamper with them.
const TAX_RATE = 0.07;  // 7% GST
const SHIPPING_RATES = {
  ship_standard: 0,
  ship_express: 999,
};

// POST /api/checkout — securely calculate totals and place an order
router.post('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { shipping_address, shipping_option = 'ship_standard' } = req.body;

    if (!shipping_address) {
      return res.status(400).json({ error: 'shipping_address is required' });
    }

    // 1. Fetch the user's cart from the database (trust nothing from the frontend)
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select('product_id, product:product_id (id, current_price, in_stock, name)')
      .eq('user_id', userId);

    if (cartError) throw cartError;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. Verify every item is still in stock
    const outOfStock = cartItems.filter(ci => !ci.product?.in_stock);
    if (outOfStock.length > 0) {
      return res.status(409).json({
        error: 'One or more items are no longer available',
        products: outOfStock.map(ci => ci.product?.name),
      });
    }

    // 3. Calculate totals SERVER-SIDE — the frontend total is completely ignored
    const subtotal = cartItems.reduce((sum, ci) => sum + ci.product.current_price, 0);
    const shippingCost = SHIPPING_RATES[shipping_option] ?? SHIPPING_RATES.ship_standard;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shippingCost + tax;

    // 4. Create the order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        status: 'processing',
        shipping_address,
        subtotal,
        shipping_cost: shippingCost,
        tax,
        total,
        currency: 'INR',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 5. Create order_items join records (one per product)
    const orderItems = cartItems.map(ci => ({
      order_id: order.id,
      product_id: ci.product_id,
      price_at_purchase: ci.product.current_price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 6. Mark products as out of stock (they are single physical units)
    const productIds = cartItems.map(ci => ci.product_id);
    const { error: stockError } = await supabase
      .from('products')
      .update({ in_stock: false })
      .in('id', productIds);

    if (stockError) throw stockError;

    // 7. Clear the user's cart
    const { error: clearError } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (clearError) throw clearError;

    // 8. Return the confirmed order summary
    res.status(201).json({
      success: true,
      order_id: order.id,
      subtotal,
      shipping_cost: shippingCost,
      tax,
      total,
      currency: 'INR',
      status: 'processing',
    });
  } catch (err) {
    console.error('POST /api/checkout error:', err.message);
    res.status(500).json({ error: 'Checkout failed. Please try again.' });
  }
});

module.exports = router;
