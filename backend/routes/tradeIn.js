const express = require('express');
const supabase = require('../supabase');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// ─── HIDDEN PRICING ALGORITHM ─────────────────────────────────────────────────
// This lives only on the server. Hackers cannot see these values.
const BRAND_BASE_VALUES = {
  canon:    { base: 60000, multi: 1.1 },
  sony:     { base: 70000, multi: 1.2 },
  fujifilm: { base: 50000, multi: 1.0 },
  nikon:    { base: 55000, multi: 1.05 },
  leica:    { base: 180000, multi: 2.2 },
};

const CONDITION_MULTIPLIERS = {
  MINT:           1.0,
  EXCELLENT:      0.85,
  GOOD:           0.70,
  'HEAVILY USED': 0.50,
};

function calculateQuote({ brand, condition, shutterCount, accessories }) {
  const brandKey = (brand || '').toLowerCase();
  const evaluation = BRAND_BASE_VALUES[brandKey] || { base: 30000, multi: 0.8 };

  let value = evaluation.base * evaluation.multi;
  value *= (CONDITION_MULTIPLIERS[condition] || 0.70);

  if (shutterCount) {
    const s = parseInt(shutterCount, 10);
    if (s > 100000)      value *= 0.80;
    else if (s > 50000)  value *= 0.90;
    else if (s > 20000)  value *= 0.95;
  }

  if (accessories && accessories.length > 0) {
    value += accessories.length * 1500;  // ₹1500 per included accessory
  }

  const cashOffer   = Math.round(value);
  const creditOffer = Math.round(cashOffer * 1.10); // 10% bonus for store credit

  return { cashOffer, creditOffer };
}

// POST /api/trade-in/quote — calculate a quote (no auth required to get a quote)
router.post('/quote', async (req, res) => {
  try {
    const { brand, model, condition, shutterCount, accessories } = req.body;

    if (!brand || !condition) {
      return res.status(400).json({ error: 'brand and condition are required' });
    }

    const { cashOffer, creditOffer } = calculateQuote({ brand, condition, shutterCount, accessories });

    res.json({
      success: true,
      brand,
      model: model || 'Unknown Model',
      condition,
      cashOffer,
      creditOffer,
      currency: 'INR',
    });
  } catch (err) {
    console.error('POST /api/trade-in/quote error:', err.message);
    res.status(500).json({ error: 'Failed to calculate quote' });
  }
});

// POST /api/trade-in/submit — submit a trade-in request (requires auth)
router.post('/submit', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { brand, model, condition, shutterCount, accessories } = req.body;

    if (!brand || !condition) {
      return res.status(400).json({ error: 'brand and condition are required' });
    }

    // Recalculate quote on the server — never trust the frontend's quote value
    const { cashOffer, creditOffer } = calculateQuote({ brand, condition, shutterCount, accessories });

    const initialSteps = [
      { key: 'quote',      label: 'Quote',      completed: true  },
      { key: 'shipped',    label: 'Shipped',    completed: false },
      { key: 'inspecting', label: 'Inspecting', completed: false },
      { key: 'paid',       label: 'Paid',       completed: false },
    ];

    const { data, error } = await supabase
      .from('trade_ins')
      .insert({
        user_id: userId,
        brand,
        model: model || 'Unknown Model',
        condition,
        accessories: accessories || [],
        cash_offer: cashOffer,
        credit_offer: creditOffer,
        status: 'quote',
        steps: initialSteps,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      tracking_id: data.id,
      cash_offer: cashOffer,
      credit_offer: creditOffer,
      status: 'quote',
      message: 'Trade-in submitted. We will email you a shipping label within 24 hours.',
    });
  } catch (err) {
    console.error('POST /api/trade-in/submit error:', err.message);
    res.status(500).json({ error: 'Failed to submit trade-in' });
  }
});

// GET /api/trade-in — list all trade-ins for the current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trade_ins')
      .select('*')
      .eq('user_id', req.user.id)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET /api/trade-in error:', err.message);
    res.status(500).json({ error: 'Failed to fetch trade-ins' });
  }
});

module.exports = router;
