/**
 * sellApi.js — Mock API layer for Trade-In/Selling operations
 *
 * Designed to mirror a real REST API endpoint (e.g., POST /api/trade-in/quote
 * and POST /api/trade-in/submit) so swapping to a real backend is seamless.
 */

const SIMULATED_DELAY_MS = 150;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simple deterministic model evaluation for estimation
const ESTIMATED_VALUES = {
  canon: { base: 60000, multi: 1.1 },
  sony: { base: 70000, multi: 1.2 },
  fujifilm: { base: 50000, multi: 1.0 },
  nikon: { base: 55000, multi: 1.05 },
  leica: { base: 180000, multi: 2.2 }
};

const CONDITION_MULTIPLIERS = {
  MINT: 1.0,
  EXCELLENT: 0.85,
  GOOD: 0.70,
  "HEAVILY USED": 0.50
};

/**
 * POST /api/trade-in/quote
 * Calculates an instant estimated quote based on gear details.
 */
export async function getEstimatedQuote({ brand, model, shutterCount, condition, accessories }) {
  await delay(SIMULATED_DELAY_MS);
  
  if (!brand || !condition) {
    throw new Error("Brand and Condition are required fields.");
  }

  const brandKey = brand.toLowerCase();
  const evaluation = ESTIMATED_VALUES[brandKey] || { base: 30000, multi: 0.8 };
  
  // Base calculation
  let estimatedValue = evaluation.base;
  
  // Adjust for condition
  const condMult = CONDITION_MULTIPLIERS[condition] || 0.70;
  estimatedValue = estimatedValue * condMult;

  // Small adjustment for shutter count (older shutters degrade value slightly)
  if (shutterCount) {
    const shutter = parseInt(shutterCount, 10);
    if (shutter > 100000) estimatedValue *= 0.8;
    else if (shutter > 50000) estimatedValue *= 0.9;
    else if (shutter > 20000) estimatedValue *= 0.95;
  }

  // Accessories adjustment
  if (accessories && accessories.length > 0) {
    estimatedValue += accessories.length * 1500; // Rs 1500 per accessory
  }

  const cashOffer = Math.round(estimatedValue);
  const creditOffer = Math.round(cashOffer * 1.1); // 10% bonus for store credit

  return {
    success: true,
    brand,
    model: model || "Unknown Model",
    condition,
    cashOffer,
    creditOffer,
    currency: "INR"
  };
}

/**
 * POST /api/trade-in/submit
 * Submits the trade-in request to the database.
 */
export async function submitTradeIn(tradeInData) {
  await delay(SIMULATED_DELAY_MS);
  
  // Simulates writing a record to a database trade-ins table
  const trackingId = `TRADE-T-${Math.floor(100 + Math.random() * 900)}`;
  
  return {
    success: true,
    trackingId,
    status: "processing", // initial state
    message: "Trade-in request registered successfully. Shipping label generated."
  };
}
