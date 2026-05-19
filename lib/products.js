// Avani Organics product seed data — derived from supplied spreadsheet
import { v5 as uuidv5 } from 'uuid';
const NS = 'b3b6f8b4-3a2c-4b1c-9d2e-1f5a8c7d6e44';
const id = (s) => uuidv5(s, NS);

const CATEGORY_IMAGES = {
  'Traditional Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
  'Millets': 'https://images.unsplash.com/photo-1622597467836-f3e6c1ec0697?w=800&q=80',
  'Pulses': 'https://images.pexels.com/photos/5988202/pexels-photo-5988202.jpeg?w=800',
  'Flours': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  'Oils & Oil Seeds': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  'Sweeteners': 'https://images.unsplash.com/photo-1610450243210-c4f5395b1b3a?w=800&q=80',
  'Salts': 'https://images.unsplash.com/photo-1518110925495-b37653c33c0c?w=800&q=80',
  'Dry Fruits': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80',
  'Spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
  'Super Foods': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80',
  'Breakfast': 'https://images.unsplash.com/photo-1455853828816-0c301a011711?w=800&q=80',
  'Dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80',
};

const CATEGORY_ICONS = {
  'Traditional Rice': '🌾','Millets': '🌿','Pulses': '🫘','Flours': '🥣','Oils & Oil Seeds': '🫒','Sweeteners': '🍯','Salts': '🧂','Dry Fruits': '🥜','Spices': '🌶️','Super Foods': '✨','Breakfast': '🍚','Dairy': '🥛'
};

function parseWeight(w) {
  const m = (w || '').toString().toUpperCase().replace(/\s+/g, '');
  const num = parseFloat(m);
  if (m.includes('KG')) return { val: num, unit: 'kg', grams: num * 1000 };
  if (m.includes('ML')) return { val: num, unit: 'ml', grams: num };
  if (m.includes('LTR') || m.includes('L')) return { val: num, unit: 'L', grams: num * 1000 };
  if (m.includes('PC')) return { val: num, unit: 'pcs', grams: num * 30 };
  return { val: num, unit: 'g', grams: num };
}

const BASE_PER_GRAM = {
  'Traditional Rice': 0.12, 'Millets': 0.16, 'Pulses': 0.22, 'Flours': 0.10,
  'Oils & Oil Seeds': 0.42, 'Sweeteners': 0.18, 'Salts': 0.06, 'Dry Fruits': 1.2,
  'Spices': 1.0, 'Super Foods': 1.8, 'Breakfast': 0.14, 'Dairy': 0.20,
};

function calcPrice(cat, weight, nameSeed) {
  const w = parseWeight(weight);
  const per = BASE_PER_GRAM[cat] || 0.15;
  let base = Math.round(w.grams * per);
  // small deterministic jitter
  let h = 0; for (let i = 0; i < nameSeed.length; i++) h = (h * 31 + nameSeed.charCodeAt(i)) >>> 0;
  const jitter = (h % 18) - 6; // -6..+11
  base = Math.max(20, base + jitter);
  // round nicely
  return Math.round(base / 5) * 5;
}

const raw = [
  ['Red Rice Unpolished','Traditional Rice','1 Kg'],['Red Rice Unpolished','Traditional Rice','5 Kg'],
  ['Red Rice Semi Polished','Traditional Rice','1 Kg'],['Red Rice Semi Polished','Traditional Rice','5 Kg'],
  ['Rajamudi Rice Unpolished','Traditional Rice','1 Kg'],['Rajamudi Rice Unpolished','Traditional Rice','5 Kg'],
  ['Rajamudi Rice Semi Polished','Traditional Rice','1 Kg'],['Rajamudi Rice Semi Polished','Traditional Rice','5 Kg'],
  ['Black Rice','Traditional Rice','500 G'],['Brown Rice','Traditional Rice','1 Kg'],
  ['Boiled Rice','Traditional Rice','1 Kg'],['Diabetic Rice','Traditional Rice','1 Kg'],
  ['Dosa / Idli Rice','Traditional Rice','1 Kg'],['Dosa / Idli Rice','Traditional Rice','5 Kg'],
  ['Navara Medicinal Rice','Traditional Rice','1 Kg'],['Sona Masoori','Traditional Rice','1 Kg'],['Sona Masoori','Traditional Rice','5 Kg'],
  ['Madhu Sanna','Traditional Rice','1 Kg'],['Madhu Sanna','Traditional Rice','5 Kg'],
  ['Sidda Sanna','Traditional Rice','1 Kg'],['Sidda Sanna','Traditional Rice','5 Kg'],
  ['Basmati Rice','Traditional Rice','1 Kg'],['Barley','Traditional Rice','500 G'],
  ['Saave (Little Millet)','Millets','1 Kg'],['Saave (Little Millet)','Millets','500 G'],
  ['Navane (Foxtail Millet)','Millets','1 Kg'],['Navane (Foxtail Millet)','Millets','500 G'],
  ['Harka (Kodo Millet)','Millets','1 Kg'],['Harka (Kodo Millet)','Millets','500 G'],
  ['Udalu (Barnyard Millet)','Millets','1 Kg'],['Udalu (Barnyard Millet)','Millets','500 G'],
  ['Baragu (Proso Millet)','Millets','1 Kg'],['Baragu (Proso Millet)','Millets','500 G'],
  ['Korale (Browntop Millet)','Millets','1 Kg'],['Korale (Browntop Millet)','Millets','500 G'],
  ['Ragi (Finger Millet)','Millets','1 Kg'],['Ragi (Finger Millet)','Millets','5 Kg'],
  ['Pearl Millet (Bajra)','Millets','1 Kg'],['Pearl Millet (Bajra)','Millets','500 G'],
  ['Sorghum (Jowar)','Millets','1 Kg'],['Sorghum (Jowar)','Millets','500 G'],['Sorghum (Jowar)','Millets','5 Kg'],
  ['Wheat','Millets','1 Kg'],['Wheat','Millets','5 Kg'],
  ['Java Wheat','Millets','1 Kg'],['Java Wheat','Millets','5 Kg'],
  ['Horse Gram','Pulses','1 Kg'],['Horse Gram','Pulses','500 G'],
  ['Bengal Gram','Pulses','500 G'],['Roasted Gram','Pulses','1 Kg'],['Roasted Gram','Pulses','400 G'],
  ['Moong Whole','Pulses','1 Kg'],['Moong Whole','Pulses','500 G'],
  ['Moong Dhal','Pulses','1 Kg'],['Moong Dhal','Pulses','500 G'],
  ['Channa Dhal','Pulses','1 Kg'],['Channa Dhal','Pulses','500 G'],
  ['Urad Dhal','Pulses','1 Kg'],['Urad Dhal','Pulses','500 G'],['Urad Gola','Pulses','500 G'],
  ['Toor Dhal','Pulses','1 Kg'],['Toor Dhal','Pulses','500 G'],
  ['Cow Pea (Red)','Pulses','250 G'],['Madike (Moth Bean)','Pulses','250 G'],
  ['Ragi Flour','Flours','1 Kg'],['Ragi Flour','Flours','5 Kg'],
  ['Rice Flour','Flours','1 Kg'],['Wheat Flour','Flours','1 Kg'],['Wheat Flour','Flours','5 Kg'],
  ['Java Wheat Flour','Flours','1 Kg'],['Java Wheat Flour','Flours','5 Kg'],
  ['Sorghum Flour','Flours','1 Kg'],['Sorghum Flour','Flours','5 Kg'],
  ['Multi Grain Atta (12 cereals)','Flours','1 Kg'],
  ['Methi Mudde Hittu','Flours','1 Kg'],['Methi Mudde Hittu','Flours','500 G'],
  ['Channa Flour (Besan)','Flours','500 G'],
  ['Sunflower Oil','Oils & Oil Seeds','1 Ltr'],['Sunflower Oil','Oils & Oil Seeds','5 Ltr'],
  ['Groundnut Oil','Oils & Oil Seeds','1 Ltr'],['Groundnut Oil','Oils & Oil Seeds','5 Ltr'],
  ['Coconut Oil','Oils & Oil Seeds','1 Ltr'],['Coconut Oil','Oils & Oil Seeds','500 ML'],['Coconut Oil','Oils & Oil Seeds','250 ML'],
  ['Virgin Coconut Oil','Oils & Oil Seeds','1 Ltr'],['Virgin Coconut Oil','Oils & Oil Seeds','500 ML'],['Virgin Coconut Oil','Oils & Oil Seeds','250 ML'],
  ['Castor Oil','Oils & Oil Seeds','500 ML'],['Castor Oil','Oils & Oil Seeds','200 ML'],
  ['Flax Seeds','Oils & Oil Seeds','500 G'],['Flax Seeds','Oils & Oil Seeds','250 G'],
  ['Groundnut','Oils & Oil Seeds','1 Kg'],['Groundnut','Oils & Oil Seeds','500 G'],
  ['Black Sesame','Oils & Oil Seeds','200 G'],['White Sesame','Oils & Oil Seeds','200 G'],['Niger Seeds','Oils & Oil Seeds','200 G'],
  ['Jaggery Square','Sweeteners','12 Pcs'],['Jaggery Square','Sweeteners','6 Pcs'],
  ['Jaggery Powder','Sweeteners','1 Kg'],['Jaggery Powder','Sweeteners','500 G'],
  ['Joni Bella','Sweeteners','1 Kg'],
  ['Brown Sugar','Sweeteners','1 Kg'],['Brown Sugar','Sweeteners','500 G'],
  ['Diabliss Diabetic Sugar','Sweeteners','1 Kg'],['Diabliss Diabetic Sugar','Sweeteners','500 G'],
  ['Rock Salt','Salts','1 Kg'],['Rock Salt','Salts','500 G'],
  ['Rock Salt Crystal','Salts','1 Kg'],['Rock Salt Crystal','Salts','400 G'],['Sea Salt','Salts','1 Kg'],
  ['Avani Dry Dates','Dry Fruits','200 G'],['Avani Almonds','Dry Fruits','200 G'],
  ['Avani Cashewnuts','Dry Fruits','200 G'],['Avani Dry Grapes (Raisins)','Dry Fruits','200 G'],
  ['Mustard','Spices','200 G'],['Mustard','Spices','80 G'],
  ['Cumin (Jeera)','Spices','200 G'],['Cumin (Jeera)','Spices','80 G'],
  ['Black Pepper','Spices','50 G'],['Cardamom','Spices','30 G'],['Cinnamon','Spices','50 G'],['Clove','Spices','30 G'],
  ['Turmeric Powder','Spices','200 G'],['Turmeric Powder','Spices','80 G'],
  ['Coffee Powder','Spices','200 G'],['Coffee Powder','Spices','80 G'],
  ['Methi (Fenugreek)','Spices','500 G'],['Methi (Fenugreek)','Spices','250 G'],
  ['Coriander (Local)','Spices','500 G'],
  ['Pure Malnad Gidda A2 Cow Ghee','Super Foods','300 ML'],['Pure Malnad Gidda A2 Cow Ghee','Super Foods','500 ML'],
  ['Naati Eggs (BV380)','Super Foods','6 Pcs'],
  ['Chia Seeds','Super Foods','80 G'],['Sabja (Kama Kasturi) Seeds','Super Foods','80 G'],
  ['Kaloonji (Kari Jeerige) Seeds','Super Foods','80 G'],['Alvi Seeds','Super Foods','80 G'],
  ['Pumpkin Seeds','Super Foods','80 G'],['Watermelon Seeds','Super Foods','80 G'],
  ['White Avalakki Thick','Breakfast','1 Kg'],['White Avalakki Thick','Breakfast','500 G'],
  ['Red Avalakki Thick','Breakfast','1 Kg'],['Red Avalakki Thick','Breakfast','500 G'],
  ['Red Avalakki Thin','Breakfast','500 G'],
  ['Rajamudi Upma Rava','Breakfast','500 G'],['Java Wheat Upma Rava','Breakfast','500 G'],
  ['Wheat Sooji Rava','Breakfast','1 Kg'],['Wheat Sooji Rava','Breakfast','500 G'],
  ['Bansi Rava','Breakfast','1 Kg'],['Bansi Rava','Breakfast','500 G'],
  ['Wheat Dalia','Breakfast','500 G'],['Organic Maida','Breakfast','500 G'],
  ['Milking — Organic Cow Milk (A2)','Dairy','500 ML'],['Milking — Organic Cow Milk','Dairy','500 ML'],
  ['Milking — Organic Curd (A2)','Dairy','400 G'],['Milking — Organic Curd Probiotic','Dairy','400 G'],
  ['Milking — Organic Slim Curd','Dairy','400 G'],
  ['Milking — Organic Set Curd','Dairy','1 Kg'],['Milking — Organic Set Curd','Dairy','400 G'],['Milking — Organic Set Curd','Dairy','200 G'],
  ['Milking — High Protein Paneer','Dairy','200 G'],['Milking — Malai Paneer','Dairy','200 G'],
  ['Milking — Organic Lassi','Dairy','200 ML'],
  ['Milking — Organic Cow Ghee','Dairy','190 ML'],['Milking — Organic Cow Ghee','Dairy','500 ML'],
];

const descriptions = {
  'Traditional Rice': 'Heirloom variety, grown organically by Karnataka farmers. Rich in nutrients, free from chemicals.',
  'Millets': 'Climate-smart ancient grain. Naturally gluten-free, high in fiber and minerals.',
  'Pulses': 'Hand-cleaned, organically grown pulses — your daily dose of plant protein.',
  'Flours': 'Stone-ground from organically grown grains. Retains nutrients & natural aroma.',
  'Oils & Oil Seeds': 'Cold-pressed in small batches. No chemicals, no refining, just pure goodness.',
  'Sweeteners': 'Traditional unrefined sweetness. Iron-rich, mineral-rich, and chemical-free.',
  'Salts': 'Mineral-rich unrefined salt sourced from natural reserves.',
  'Dry Fruits': 'Premium grade nuts and dried fruits — naturally dried, no additives.',
  'Spices': 'Sun-dried & stone-ground spices from organic farms. Bold aroma, deep flavor.',
  'Super Foods': 'Nutrient-dense traditional power foods for modern wellness.',
  'Breakfast': 'Wholesome breakfast staples ready in minutes — fuel your day naturally.',
  'Dairy': 'A2 desi cow milk products from Malnad Gidda breed — pure & probiotic.',
};

export const CATEGORIES = ['Traditional Rice','Millets','Pulses','Flours','Oils & Oil Seeds','Sweeteners','Salts','Dry Fruits','Spices','Super Foods','Breakfast','Dairy'];
export { CATEGORY_IMAGES, CATEGORY_ICONS };

// 46 real product photos downloaded from BHOOMI/Avani Drive folder
const LOCAL_PRODUCT_IMAGES = Array.from({ length: 46 }, (_, i) => `/products/img-${String(i + 1).padStart(3, '0')}.jpg`);

// Map each category to a starting offset in the photo set so products of same category cluster similar photos
const CAT_OFFSETS = {
  'Traditional Rice': 0, 'Millets': 4, 'Pulses': 8, 'Flours': 12,
  'Oils & Oil Seeds': 16, 'Sweeteners': 20, 'Salts': 23, 'Dry Fruits': 26,
  'Spices': 29, 'Super Foods': 34, 'Breakfast': 38, 'Dairy': 42,
};

export const PRODUCTS = raw.map(([name, category, weight], i) => {
  const seed = `${name}-${weight}`;
  const price = calcPrice(category, weight, seed);
  const mrp = Math.round(price * (1.15 + ((i % 5) * 0.03)) / 5) * 5;
  const offset = CAT_OFFSETS[category] ?? 0;
  // pick image deterministically: offset + variant inside category
  let h = 0; for (let k = 0; k < seed.length; k++) h = (h * 31 + seed.charCodeAt(k)) >>> 0;
  const imgIdx = (offset + (h % 4)) % LOCAL_PRODUCT_IMAGES.length;
  return {
    id: id(seed),
    name, category, weight, price, mrp,
    discount: Math.round(((mrp - price) / mrp) * 100),
    image: LOCAL_PRODUCT_IMAGES[imgIdx],
    gallery: [LOCAL_PRODUCT_IMAGES[imgIdx], LOCAL_PRODUCT_IMAGES[(imgIdx + 1) % 46], LOCAL_PRODUCT_IMAGES[(imgIdx + 2) % 46], LOCAL_PRODUCT_IMAGES[(imgIdx + 3) % 46]],
    description: descriptions[category],
    stock: 10 + (i % 40),
    rating: 4.2 + ((i % 8) * 0.1),
    reviews: 12 + (i * 7) % 280,
    badge: i % 11 === 0 ? 'Bestseller' : i % 13 === 0 ? 'New' : i % 7 === 0 ? 'Limited' : null,
  };
});

export const getProductById = (pid) => PRODUCTS.find(p => p.id === pid);
export const getByCategory = (cat) => PRODUCTS.filter(p => p.category === cat);
