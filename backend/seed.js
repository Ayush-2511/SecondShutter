const supabase = require('./supabase');

const products = [
  {
    slug: "fujifilm-xt5-18-55mm",
    brand: "FUJIFILM",
    name: "X-T5 + 18-55mm",
    category: "mirrorless",
    condition: "LIKE NEW",
    condition_score: "9.5/10",
    condition_note: "Minor brassing on hot shoe only.",
    badge: "HOT",
    shutter_count: 8200,
    original_price: 159000,
    current_price: 112999,
    currency: "INR",
    rating: 4.8,
    review_count: 24,
    in_stock: true,
    image_count: 3,
    description: "Fujifilm X-T5 body with XF 18-55mm f/2.8-4 kit lens. Professionally inspected by our experts.",
    specs: { "Sensor": "40.2MP APS-C", "Mount": "Fujifilm X" },
    included_items: ["Body", "Lens", "Battery"],
    seller: { name: "Rohan M.", verified: true, rating: 4.9 }
  },
  {
    slug: "sony-a7-iii",
    brand: "SONY",
    name: "Alpha A7 III",
    category: "mirrorless",
    condition: "EXCELLENT",
    condition_score: "9/10",
    condition_note: "Light use. All accessories included.",
    badge: null,
    shutter_count: 21000,
    original_price: 184000,
    current_price: 133999,
    currency: "INR",
    rating: 4.9,
    review_count: 41,
    in_stock: true,
    image_count: 3,
    description: "Sony A7 III full-frame mirrorless. Light use, all accessories included.",
    specs: { "Sensor": "24.2MP Full-Frame", "Mount": "Sony E" },
    included_items: ["Body", "Battery", "Charger"],
    seller: { name: "Priya S.", verified: true, rating: 5.0 }
  },
  {
    slug: "canon-eos-r5",
    brand: "CANON",
    name: "EOS R5",
    category: "mirrorless",
    condition: "MINT",
    condition_score: "10/10",
    condition_note: "Pristine. Still in original sealed packaging.",
    badge: "RARE",
    shutter_count: 3100,
    original_price: 326000,
    current_price: 267999,
    currency: "INR",
    rating: 5.0,
    review_count: 12,
    in_stock: true,
    image_count: 3,
    description: "Canon EOS R5 in near-perfect condition.",
    specs: { "Sensor": "45MP Full-Frame", "Mount": "Canon RF" },
    included_items: ["Body", "Battery", "Charger"],
    seller: { name: "Arjun K.", verified: true, rating: 4.8 }
  },
  {
    slug: "leica-q2",
    brand: "LEICA",
    name: "Q2",
    category: "compact",
    condition: "GOOD",
    condition_score: "8/10",
    condition_note: "Visible wear on body but optics are completely flawless.",
    badge: "SALE",
    shutter_count: 45000,
    original_price: 418000,
    current_price: 284999,
    currency: "INR",
    rating: 4.7,
    review_count: 9,
    in_stock: true,
    image_count: 3,
    description: "Leica Q2 fixed lens compact. Visible wear on body but optics are flawless.",
    specs: { "Sensor": "47.3MP Full-Frame", "Lens": "Summilux 28mm f/1.7" },
    included_items: ["Body + Fixed Lens", "Battery"],
    seller: { name: "Sneha T.", verified: false, rating: 4.6 }
  }
];

async function seed() {
  console.log("Starting seed...");
  
  // Clear existing to avoid duplicate slug errors
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  const { data, error } = await supabase.from('products').insert(products).select();
  
  if (error) {
    console.error("Error seeding products:", error);
  } else {
    console.log(`Successfully seeded ${data.length} products!`);
  }
  process.exit();
}

seed();
