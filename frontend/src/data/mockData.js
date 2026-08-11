// Generate 50 mock products for pagination testing
const brands = ["CANON", "SONY", "LEICA", "FUJIFILM", "NIKON", "PANASONIC", "OLYMPUS"];
const conditions = ["MINT", "EXCELLENT", "GOOD", "LIKE NEW", "FAIR"];
const badges = ["HOT", "NEW IN", "RARE", "SALE", "RESTOCK", null, null, null]; // More nulls so not everything has a badge

const generateProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const badge = badges[Math.floor(Math.random() * badges.length)];
    const originalPrice = Math.floor(Math.random() * (4000 - 500 + 1) + 500);
    const discount = Math.floor(Math.random() * (originalPrice * 0.4)); // Up to 40% off
    const currentPrice = originalPrice - discount;
    const shutterCount = Math.floor(Math.random() * 50) + 1; // 1k to 50k

    let name = `Model ${i}X`;
    if (brand === "SONY") name = `Alpha A${Math.floor(Math.random() * 9)} II`;
    if (brand === "CANON") name = `EOS R${Math.floor(Math.random() * 8)}`;
    if (brand === "FUJIFILM") name = `X-T${Math.floor(Math.random() * 6)}`;

    products.push({
      id: i,
      brand,
      name,
      condition,
      badge,
      originalPrice,
      currentPrice,
      shutterCount: `${shutterCount}K Shutters`,
      rating: "★★★★★",
    });
  }
  return products;
};

export const productsData = generateProducts(50);
