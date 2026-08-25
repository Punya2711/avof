// Avani Organics product seed data — derived from supplied spreadsheet
import { v5 as uuidv5 } from 'uuid';

const NS = 'b3b6f8b4-3a2c-4b1c-9d2e-1f5a8c7d6e44';
const id = (s) => uuidv5(s, NS);

const CATEGORY_IMAGES = {
  'Traditional Rice': '/products/cat rice.jpg',
  'Millets': '/products/cat millet.jpg',
  'Pulses': '/products/cat pulses.webp',
  'Flours': '/products/cat flours.jpg',
  'Oils & Oil Seeds': '/products/cat oil.jpg',
  'Sweeteners': '/products/cat sweet.webp',
  'Salts': '/products/cat salt.jpg',
  'Dry Fruits': '/products/cat dry.jpg',
  'Spices': '/products/cat spices.avif',
  'Super Foods': '/products/cat super.jpg',
  'Breakfast': 'https://images.unsplash.com/photo-1455853828816-0c301a011711?w=800&q=80',
  'Dairy': '/products/dd.jpg',
};

const CATEGORY_ICONS = {
  'Traditional Rice': '🌾',
  'Millets': '🌿',
  'Pulses': '🫘',
  'Flours': '🥣',
  'Oils & Oil Seeds': '🫒',
  'Sweeteners': '🍯',
  'Salts': '🧂',
  'Dry Fruits': '🥜',
  'Spices': '🌶️',
  'Super Foods': '✨',
  'Breakfast': '🍚',
  'Dairy': '🥛',
};

const PRODUCT_IMAGES = {
  "Red Rice Unpolished": "/products/red rice unpolished.jpeg",
  "Red Rice Semi Polished": "/products/red rice semipolished.jpeg",
  "Rajamudi Rice Unpolished": "/products/raj_unpo.jpeg",
  "Rajamudi Rice Semi Polished": "/products/raj_semi.jpeg",
  "Black Rice": "/products/black rice.jpeg",
  "Brown Rice": "/products/brown rice.jpeg",
  "Boiled Rice": "/products/boiled rice.jpeg",
  "Diabetic Rice": "/products/diabetic rice.jpeg",
  "Dosa / Idli Rice": "/products/dosa idli rice.jpeg",
  "Navara Medicinal Rice": "/products/navara medice rice.jpeg",
  "Sona Masoori": "/products/sona masuri.jpeg",
  "Madhu Sanna": "/products/madhu_sanna.png",
  "Sidda Sanna": "/products/sadda sanna.jpeg",
  "Basmati Rice": "/products/basmati rice.jpeg",
  "Barley": "/products/barely.jpeg",

  "Saave (Little Millet)": "/products/Saave01.png",
  "Navane (Foxtail Millet)": "/products/foxtail millet.jpeg",
  "Harka (Kodo Millet)": "/products/haraka.png",
  "Udalu (Barnyard Millet)": "/products/udalu.jpeg",
  "Baragu (Proso Millet)": "/products/Baragu.png",
  "Korale (Browntop Millet)": "/products/Korle(BTM).png",
  "Ragi (Finger Millet)": "/products/ragi flour.jpeg",
  "Pearl Millet (Bajra)": "/products/pearl-millet.jpeg",
  "Sorghum (Jowar)": "/products/sor_jo.png",
  "Wheat": "/products/wheat flour.jpeg",
  "Java Wheat": "/products/jawa wheat flour.jpeg",

  "Horse Gram": "/products/horse gram.jpeg",
  "Bengal Gram": "/products/bengal gram.jpeg",
  "Roasted Gram": "/products/roasted gram.jpeg",
  "Moong Whole": "/products/moong whole.jpeg",
  "Moong Dhal": "/products/moong dal.jpeg",
  "Channa Dhal": "/products/channa dal.jpeg",
  "Urad Dhal": "/products/urad dal.jpeg",
  "Urad Gola": "/products/Urad Gola01.png",
  "Toor Dhal": "/products/toor dal.jpeg",
  "Cow Pea (Red)": "/products/cowpea red.jpeg",
  "Madike (Moth Bean)": "/products/madike grah.jpeg",

  "Ragi Flour": "/products/ragi flour.jpeg",
  "Rice Flour": "/products/rice flour.jpeg",
  "Wheat Flour": "/products/wheat flour.jpeg",
  "Java Wheat Flour": "/products/jawa wheat flour.jpeg",
  "Sorghum Flour": "/products/sor_flo.png",
  "Multi Grain Atta (12 cereals)": "/products/multigrain-atta.jpeg",
  "Methi Mudde Hittu": "/products/methi01.png",
  "Channa Flour (Besan)": "/products/chana flour.jpeg",

  "Sunflower Oil": "/products/sunflower oil.jpeg",
  "Groundnut Oil": "/products/groundnut oil.jpeg",
  "Coconut Oil": "/products/coconut oil.jpeg",
  "Virgin Coconut Oil": "/products/virgin coconut oil.jpeg",
  "Castor Oil": "/products/castor oil.jpeg",
  "Flax Seeds": "/products/flax seeds.jpeg",
  "Groundnut": "/products/groundnut.jpeg",
  "Black Sesame": "/products/black sesame.jpeg",
  "White Sesame": "/products/white sesame.jpeg",
  "Niger Seeds": "/products/nizer.jpeg",

  "Jaggery Square": "/products/jaggery square.jpeg",
  "Jaggery Powder": "/products/jagerry powder.jpeg",
  "Joni Bella": "/products/bella.jpeg",
  "Brown Sugar": "/products/brown sugar.jpeg",
  "Diabliss Diabetic Sugar": "/products/diabliss-diabetic-sugar.jpeg",

  "Rock Salt": "/products/rock salt.jpeg",
  "Rock Salt Crystal": "/products/rock-salt-crystal.jpeg",
  "Sea Salt": "/products/sea salt.png",

  "Avani Dry Dates": "/products/dates.jpeg",
  "Avani Almonds": "/products/almonds.jpeg",
  "Avani Cashewnuts": "/products/cashewnuts.jpeg",
  "Avani Dry Grapes (Raisins)": "/products/dry graps.jpeg",

  "Mustard": "/products/mustard.jpeg",
  "Cumin (Jeera)": "/products/cumin seeds.jpeg",
  "Black Pepper": "/products/black pepper.jpeg",
  "Cardamom": "/products/cardamom.jpeg",
  "Cinnamon": "/products/cinamon.jpeg",
  "Clove": "/products/clove.jpeg",
  "Turmeric Powder": "/products/turmeric powder.jpeg",
  "Coffee Powder": "/products/coffee.jpeg",
  "Methi (Fenugreek)": "/products/methi01.png",
  "Coriander (Local)": "/products/coriander seeds.jpeg",

  "Pure Malnad Gidda A2 Cow Ghee": "/products/cow ghee.jpeg",
  "Naati Eggs (BV380)": "/products/eggs.jpeg",
  "Chia Seeds": "/products/chia seeds.jpeg",

  "Sabja (Kama Kasturi) Seeds": "/products/sabja-seeds.jpeg",
  "Kaloonji (Kari Jeerige) Seeds": "/products/kaloonji.jpeg",
  "Alsi Seeds": "/products/alsi-seeds.jpeg",
  "Pumpkin Seeds": "/products/pumpkin-seeds.jpeg",
  "Watermelon Seeds": "/products/watermelon-seeds.jpeg",

  "White Avalakki Thick": "/products/white-avalakki-thick.jpeg",
  "Red Avalakki Thick": "/products/red avalakki Thick.png",
  "Red Avalakki Thin": "/products/red-avalakki-thin.jpeg",

  "Rajamudi Upma Rava": "/products/rajamudi-upma-rava.jpeg",
  "Java Wheat Upma Rava": "/products/java-wheat-upma-rava.jpeg",

  "Wheat Sooji Rava": "/products/sooji rava.jpeg",
  "Bansi Rava": "/products/bansi rava.jpeg",
  "Wheat Dalia": "/products/wheat-dalia.jpeg",
  "Organic Maida": "/products/organic-maida.jpeg",

  "Milking — Organic Cow Milk (A2)": "/products/cow milk a2.png",
  "Milking — Organic Cow Milk": "/products/cow milk whole (2).png",
  "Milking — Organic Curd (A2)": "/products/milking curd.jpeg",
  "Milking — Organic Curd Probiotic": "/products/curd probiotic.png",
  "Milking — Organic Slim Curd": "/products/slim curd.png",
  "Milking — Organic Set Curd": "/products/milking set curd.jpeg",
  "Milking — High Protein Paneer": "/products/high_pro_pan.png",
  "Milking — Malai Paneer": "/products/malai paneer.png",
  "Milking — Organic Lassi": "/products/milking lassi.jpeg",
  "Milking — Organic Cow Ghee": "/products/milking cow ghee.jpeg",
};

function parseWeight(w) {
  const m = (w || '').toString().toUpperCase().replace(/\s+/g, '');
  const num = parseFloat(m);

  if (m.includes('KG')) {
    return {
      val: num,
      unit: 'kg',
      grams: num * 1000,
    };
  }

  if (m.includes('ML')) {
    return {
      val: num,
      unit: 'ml',
      grams: num,
    };
  }

  if (m.includes('LTR') || m.includes('L')) {
    return {
      val: num,
      unit: 'L',
      grams: num * 1000,
    };
  }

  if (m.includes('PC')) {
    return {
      val: num,
      unit: 'pcs',
      grams: num * 30,
    };
  }

  return {
    val: num,
    unit: 'g',
    grams: num,
  };
}

const BASE_PER_GRAM = {
  'Traditional Rice': 0.12,
  'Millets': 0.16,
  'Pulses': 0.22,
  'Flours': 0.10,
  'Oils & Oil Seeds': 0.42,
  'Sweeteners': 0.18,
  'Salts': 0.06,
  'Dry Fruits': 1.2,
  'Spices': 1.0,
  'Super Foods': 1.8,
  'Breakfast': 0.14,
  'Dairy': 0.20,
};

function calcPrice(cat, weight, nameSeed) {
  const w = parseWeight(weight);
  const per = BASE_PER_GRAM[cat] || 0.15;

  let base = Math.round(w.grams * per);

  // Small deterministic jitter
  let h = 0;

  for (let i = 0; i < nameSeed.length; i++) {
    h = (h * 31 + nameSeed.charCodeAt(i)) >>> 0;
  }

  const jitter = (h % 18) - 6;
  base = Math.max(20, base + jitter);

  // Round nicely
  return Math.round(base / 5) * 5;
}

const raw = [
  ['Red Rice Unpolished', 'Traditional Rice', '1 Kg'],
  ['Red Rice Unpolished', 'Traditional Rice', '5 Kg'],
  ['Red Rice Semi Polished', 'Traditional Rice', '1 Kg'],
  ['Red Rice Semi Polished', 'Traditional Rice', '5 Kg'],
  ['Rajamudi Rice Unpolished', 'Traditional Rice', '1 Kg'],
  ['Rajamudi Rice Unpolished', 'Traditional Rice', '5 Kg'],
  ['Rajamudi Rice Semi Polished', 'Traditional Rice', '1 Kg'],
  ['Rajamudi Rice Semi Polished', 'Traditional Rice', '5 Kg'],
  ['Black Rice', 'Traditional Rice', '500 G'],
  ['Brown Rice', 'Traditional Rice', '1 Kg'],
  ['Boiled Rice', 'Traditional Rice', '1 Kg'],
  ['Diabetic Rice', 'Traditional Rice', '1 Kg'],
  ['Dosa / Idli Rice', 'Traditional Rice', '1 Kg'],
  ['Dosa / Idli Rice', 'Traditional Rice', '5 Kg'],
  ['Navara Medicinal Rice', 'Traditional Rice', '1 Kg'],
  ['Sona Masoori', 'Traditional Rice', '1 Kg'],
  ['Sona Masoori', 'Traditional Rice', '5 Kg'],
  ['Madhu Sanna', 'Traditional Rice', '1 Kg'],
  ['Madhu Sanna', 'Traditional Rice', '5 Kg'],
  ['Sidda Sanna', 'Traditional Rice', '1 Kg'],
  ['Sidda Sanna', 'Traditional Rice', '5 Kg'],
  ['Basmati Rice', 'Traditional Rice', '1 Kg'],
  ['Barley', 'Traditional Rice', '500 G'],

  ['Saave (Little Millet)', 'Millets', '1 Kg'],
  ['Saave (Little Millet)', 'Millets', '500 G'],
  ['Navane (Foxtail Millet)', 'Millets', '1 Kg'],
  ['Navane (Foxtail Millet)', 'Millets', '500 G'],
  ['Harka (Kodo Millet)', 'Millets', '1 Kg'],
  ['Harka (Kodo Millet)', 'Millets', '500 G'],
  ['Udalu (Barnyard Millet)', 'Millets', '1 Kg'],
  ['Udalu (Barnyard Millet)', 'Millets', '500 G'],
  ['Baragu (Proso Millet)', 'Millets', '1 Kg'],
  ['Baragu (Proso Millet)', 'Millets', '500 G'],
  ['Korale (Browntop Millet)', 'Millets', '1 Kg'],
  ['Korale (Browntop Millet)', 'Millets', '500 G'],
  ['Ragi (Finger Millet)', 'Millets', '1 Kg'],
  ['Ragi (Finger Millet)', 'Millets', '5 Kg'],
  ['Pearl Millet (Bajra)', 'Millets', '1 Kg'],
  ['Pearl Millet (Bajra)', 'Millets', '500 G'],
  ['Sorghum (Jowar)', 'Millets', '1 Kg'],
  ['Sorghum (Jowar)', 'Millets', '500 G'],
  ['Sorghum (Jowar)', 'Millets', '5 Kg'],
  ['Wheat', 'Millets', '1 Kg'],
  ['Wheat', 'Millets', '5 Kg'],
  ['Java Wheat', 'Millets', '1 Kg'],
  ['Java Wheat', 'Millets', '5 Kg'],

  ['Horse Gram', 'Pulses', '1 Kg'],
  ['Horse Gram', 'Pulses', '500 G'],
  ['Bengal Gram', 'Pulses', '500 G'],
  ['Roasted Gram', 'Pulses', '1 Kg'],
  ['Roasted Gram', 'Pulses', '400 G'],
  ['Moong Whole', 'Pulses', '1 Kg'],
  ['Moong Whole', 'Pulses', '500 G'],
  ['Moong Dhal', 'Pulses', '1 Kg'],
  ['Moong Dhal', 'Pulses', '500 G'],
  ['Channa Dhal', 'Pulses', '1 Kg'],
  ['Channa Dhal', 'Pulses', '500 G'],
  ['Urad Dhal', 'Pulses', '1 Kg'],
  ['Urad Dhal', 'Pulses', '500 G'],
  ['Urad Gola', 'Pulses', '500 G'],
  ['Toor Dhal', 'Pulses', '1 Kg'],
  ['Toor Dhal', 'Pulses', '500 G'],
  ['Cow Pea (Red)', 'Pulses', '250 G'],
  ['Madike (Moth Bean)', 'Pulses', '250 G'],

  ['Ragi Flour', 'Flours', '1 Kg'],
  ['Ragi Flour', 'Flours', '5 Kg'],
  ['Rice Flour', 'Flours', '1 Kg'],
  ['Wheat Flour', 'Flours', '1 Kg'],
  ['Wheat Flour', 'Flours', '5 Kg'],
  ['Java Wheat Flour', 'Flours', '1 Kg'],
  ['Java Wheat Flour', 'Flours', '5 Kg'],
  ['Sorghum Flour', 'Flours', '1 Kg'],
  ['Sorghum Flour', 'Flours', '5 Kg'],
  ['Multi Grain Atta (12 cereals)', 'Flours', '1 Kg'],
  ['Methi Mudde Hittu', 'Flours', '1 Kg'],
  ['Methi Mudde Hittu', 'Flours', '500 G'],
  ['Channa Flour (Besan)', 'Flours', '500 G'],

  ['Sunflower Oil', 'Oils & Oil Seeds', '1 Ltr'],
  ['Sunflower Oil', 'Oils & Oil Seeds', '5 Ltr'],
  ['Groundnut Oil', 'Oils & Oil Seeds', '1 Ltr'],
  ['Groundnut Oil', 'Oils & Oil Seeds', '5 Ltr'],
  ['Coconut Oil', 'Oils & Oil Seeds', '1 Ltr'],
  ['Coconut Oil', 'Oils & Oil Seeds', '500 ML'],
  ['Coconut Oil', 'Oils & Oil Seeds', '250 ML'],
  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '1 Ltr'],
  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '500 ML'],
  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '250 ML'],
  ['Castor Oil', 'Oils & Oil Seeds', '500 ML'],
  ['Castor Oil', 'Oils & Oil Seeds', '200 ML'],
  ['Flax Seeds', 'Oils & Oil Seeds', '500 G'],
  ['Flax Seeds', 'Oils & Oil Seeds', '250 G'],
  ['Groundnut', 'Oils & Oil Seeds', '1 Kg'],
  ['Groundnut', 'Oils & Oil Seeds', '500 G'],
  ['Black Sesame', 'Oils & Oil Seeds', '200 G'],
  ['White Sesame', 'Oils & Oil Seeds', '200 G'],
  ['Niger Seeds', 'Oils & Oil Seeds', '200 G'],

  ['Jaggery Square', 'Sweeteners', '12 Pcs'],
  ['Jaggery Square', 'Sweeteners', '6 Pcs'],
  ['Jaggery Powder', 'Sweeteners', '1 Kg'],
  ['Jaggery Powder', 'Sweeteners', '500 G'],
  ['Joni Bella', 'Sweeteners', '1 Kg'],
  ['Brown Sugar', 'Sweeteners', '1 Kg'],
  ['Brown Sugar', 'Sweeteners', '500 G'],
  ['Diabliss Diabetic Sugar', 'Sweeteners', '1 Kg'],
  ['Diabliss Diabetic Sugar', 'Sweeteners', '500 G'],

  ['Rock Salt', 'Salts', '1 Kg'],
  ['Rock Salt', 'Salts', '500 G'],
  ['Rock Salt Crystal', 'Salts', '1 Kg'],
  ['Rock Salt Crystal', 'Salts', '400 G'],
  ['Sea Salt', 'Salts', '1 Kg'],

  ['Avani Dry Dates', 'Dry Fruits', '200 G'],
  ['Avani Almonds', 'Dry Fruits', '200 G'],
  ['Avani Cashewnuts', 'Dry Fruits', '200 G'],
  ['Avani Dry Grapes (Raisins)', 'Dry Fruits', '200 G'],

  ['Mustard', 'Spices', '200 G'],
  ['Mustard', 'Spices', '80 G'],
  ['Cumin (Jeera)', 'Spices', '200 G'],
  ['Cumin (Jeera)', 'Spices', '80 G'],
  ['Black Pepper', 'Spices', '50 G'],
  ['Cardamom', 'Spices', '30 G'],
  ['Cinnamon', 'Spices', '50 G'],
  ['Clove', 'Spices', '30 G'],
  ['Turmeric Powder', 'Spices', '200 G'],
  ['Turmeric Powder', 'Spices', '80 G'],
  ['Coffee Powder', 'Spices', '200 G'],
  ['Coffee Powder', 'Spices', '80 G'],
  ['Methi (Fenugreek)', 'Spices', '500 G'],
  ['Methi (Fenugreek)', 'Spices', '250 G'],
  ['Coriander (Local)', 'Spices', '500 G'],

  ['Pure Malnad Gidda A2 Cow Ghee', 'Super Foods', '300 ML'],
  ['Pure Malnad Gidda A2 Cow Ghee', 'Super Foods', '500 ML'],
  ['Naati Eggs (BV380)', 'Super Foods', '6 Pcs'],
  ['Chia Seeds', 'Super Foods', '80 G'],
  ['Sabja (Kama Kasturi) Seeds', 'Super Foods', '80 G'],
  ['Kaloonji (Kari Jeerige) Seeds', 'Super Foods', '80 G'],
  ['Alvi Seeds', 'Super Foods', '80 G'],
  ['Pumpkin Seeds', 'Super Foods', '80 G'],
  ['Watermelon Seeds', 'Super Foods', '80 G'],

  ['White Avalakki Thick', 'Breakfast', '1 Kg'],
  ['White Avalakki Thick', 'Breakfast', '500 G'],
  ['Red Avalakki Thick', 'Breakfast', '1 Kg'],
  ['Red Avalakki Thick', 'Breakfast', '500 G'],
  ['Red Avalakki Thin', 'Breakfast', '500 G'],
  ['Rajamudi Upma Rava', 'Breakfast', '500 G'],
  ['Java Wheat Upma Rava', 'Breakfast', '500 G'],
  ['Wheat Sooji Rava', 'Breakfast', '1 Kg'],
  ['Wheat Sooji Rava', 'Breakfast', '500 G'],
  ['Bansi Rava', 'Breakfast', '1 Kg'],
  ['Bansi Rava', 'Breakfast', '500 G'],
  ['Wheat Dalia', 'Breakfast', '500 G'],
  ['Organic Maida', 'Breakfast', '500 G'],

  ['Milking — Organic Cow Milk (A2)', 'Dairy', '500 ML'],
  ['Milking — Organic Cow Milk', 'Dairy', '500 ML'],
  ['Milking — Organic Curd (A2)', 'Dairy', '400 G'],
  ['Milking — Organic Curd Probiotic', 'Dairy', '400 G'],
  ['Milking — Organic Slim Curd', 'Dairy', '400 G'],
  ['Milking — Organic Set Curd', 'Dairy', '1 Kg'],
  ['Milking — Organic Set Curd', 'Dairy', '400 G'],
  ['Milking — Organic Set Curd', 'Dairy', '200 G'],
  ['Milking — High Protein Paneer', 'Dairy', '200 G'],
  ['Milking — Malai Paneer', 'Dairy', '200 G'],
  ['Milking — Organic Lassi', 'Dairy', '200 ML'],
  ['Milking — Organic Cow Ghee', 'Dairy', '190 ML'],
  ['Milking — Organic Cow Ghee', 'Dairy', '500 ML'],
];

const descriptions = {
  'Traditional Rice':
    'Heirloom variety, grown organically by Karnataka farmers. Rich in nutrients, free from chemicals.',
  'Millets':
    'Climate-smart ancient grain. Naturally gluten-free, high in fiber and minerals.',
  'Pulses':
    'Hand-cleaned, organically grown pulses — your daily dose of plant protein.',
  'Flours':
    'Stone-ground from organically grown grains. Retains nutrients & natural aroma.',
  'Oils & Oil Seeds':
    'Cold-pressed in small batches. No chemicals, no refining, just pure goodness.',
  'Sweeteners':
    'Traditional unrefined sweetness. Iron-rich, mineral-rich, and chemical-free.',
  'Salts':
    'Mineral-rich unrefined salt sourced from natural reserves.',
  'Dry Fruits':
    'Premium grade nuts and dried fruits — naturally dried, no additives.',
  'Spices':
    'Sun-dried & stone-ground spices from organic farms. Bold aroma, deep flavor.',
  'Super Foods':
    'Nutrient-dense traditional power foods for modern wellness.',
  'Breakfast':
    'Wholesome breakfast staples ready in minutes — fuel your day naturally.',
  'Dairy':
    'A2 desi cow milk products from Malnad Gidda breed — pure & probiotic.',
};

export const CATEGORIES = [
  'Traditional Rice',
  'Millets',
  'Pulses',
  'Flours',
  'Oils & Oil Seeds',
  'Sweeteners',
  'Salts',
  'Dry Fruits',
  'Spices',
  'Super Foods',
  'Breakfast',
  'Dairy',
];

export { CATEGORY_IMAGES, CATEGORY_ICONS };

// Generate product data
export const PRODUCTS = raw.map(([name, category, weight], i) => {
  const seed = `${name}-${weight}`;
  const price = calcPrice(category, weight, seed);

  const stock_quantity = 10 + (i % 40);

  return {
    id: id(seed),
    group_id: id(name),

    name,
    category,
    weight,
    price,

    image: PRODUCT_IMAGES[name] || "/products/default.jpeg",

    gallery: [
      PRODUCT_IMAGES[name] || "/products/default.jpeg",
    ],

    description: descriptions[category],

    stock_quantity,
    in_stock: stock_quantity > 0,
    low_stock_threshold: 5,
    stock: stock_quantity,

    rating: 4.2 + ((i % 8) * 0.1),
    reviews: 12 + ((i * 7) % 280),

    // No Bestseller, New, Limited or other promotional badges
    badge: null,
  };
});

// === Grouping helpers ===

// Sort weight string for variant display:
// 250g < 500g < 1kg < 5kg
function weightSortKey(w) {
  const p = parseWeight(w);
  return p.grams || 0;
}

export function getVariants(name) {
  return PRODUCTS
    .filter((p) => p.name === name)
    .sort((a, b) => weightSortKey(a.weight) - weightSortKey(b.weight));
}

// Returns one representative per product-name group + variants count
export function getGroupedProducts() {
  const seen = new Map();

  for (const p of PRODUCTS) {
    if (!seen.has(p.name)) {
      const variants = getVariants(p.name);

      // Representative = smallest variant
      const rep = variants[0];

      seen.set(p.name, {
        ...rep,

        variant_count: variants.length,

        variants: variants.map((v) => ({
          id: v.id,
          weight: v.weight,
          price: v.price,
        })),

        min_price: Math.min(
          ...variants.map((v) => v.price)
        ),

        max_price: Math.max(
          ...variants.map((v) => v.price)
        ),
      });
    }
  }

  return Array.from(seen.values());
}

export const getProductById = (pid) =>
  PRODUCTS.find((p) => p.id === pid);

export const getByCategory = (cat) =>
  PRODUCTS.filter((p) => p.category === cat);