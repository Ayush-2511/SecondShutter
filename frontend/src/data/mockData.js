/**
 * mockData.js — Generated product catalogue for Browse page (pagination testing)
 *
 * Each product has a `slug` that the productApi can resolve.
 * Prices are in INR.
 */

const brands = ["CANON", "SONY", "LEICA", "FUJIFILM", "NIKON", "PANASONIC", "OLYMPUS"];
const conditions = ["MINT", "EXCELLENT", "GOOD", "LIKE NEW", "FAIR"];
const badges = ["HOT", "NEW IN", "RARE", "SALE", "RESTOCK", null, null, null];

// Deterministic pseudo-random so slugs don't change on every reload
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const generateProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    const brand = brands[Math.floor(seededRandom(i * 7) * brands.length)];
    const condition = conditions[Math.floor(seededRandom(i * 13) * conditions.length)];
    const badge = badges[Math.floor(seededRandom(i * 17) * badges.length)];
    const originalPrice = Math.floor(seededRandom(i * 3) * (400000 - 30000) + 30000);
    const discount = Math.floor(seededRandom(i * 11) * (originalPrice * 0.4));
    const currentPrice = originalPrice - discount;
    const shutterCount = Math.floor(seededRandom(i * 19) * 50) + 1;

    let name = `Model ${i}X`;
    if (brand === "SONY")     name = `Alpha A${Math.floor(seededRandom(i * 5) * 9)} II`;
    if (brand === "CANON")    name = `EOS R${Math.floor(seededRandom(i * 23) * 8)}`;
    if (brand === "FUJIFILM") name = `X-T${Math.floor(seededRandom(i * 29) * 6)}`;
    if (brand === "NIKON")    name = `Z${Math.floor(seededRandom(i * 31) * 9)}`;

    // slug: lowercase, brand + name + id  — unique and URL-safe
    const slug = `${brand.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}-${i}`;

    products.push({
      id: `gen_${i}`,
      slug,
      brand,
      name,
      category: "mirrorless",
      condition,
      badge,
      original_price: originalPrice,
      current_price: currentPrice,
      currency: "INR",
      shutterCount: `${shutterCount}K Shutters`,
      shutter_count: shutterCount * 1000,
      rating: 4 + Math.round(seededRandom(i * 41) * 10) / 10,
      review_count: Math.floor(seededRandom(i * 43) * 50) + 1,
      in_stock: true,
      images: [],
      image_count: 3,
      description: `Pre-owned ${brand} ${name} in ${condition} condition. Fully inspected and tested by our experts.`,
      specs: [
        { label: "Brand", value: brand },
        { label: "Condition", value: condition },
        { label: "Shutter Count", value: `~${(shutterCount * 1000).toLocaleString('en-IN')} (Verified)` },
      ],
      included_items: ["Body", "Battery", "Charger"],
      seller: { name: "Verified Seller", verified: true, rating: 4.7 },
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
    });
  }
  return products;
};

export const productsData = generateProducts(50);
