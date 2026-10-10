// ============================================================
// AVANI ORGANICS — PRODUCT DATA
// Prices are taken directly from the supplied Avani price list.
// No generated/fake pricing.
// No discounts.
// No promotional badges.
// ============================================================

import { v5 as uuidv5 } from 'uuid';

const NS = 'b3b6f8b4-3a2c-4b1c-9d2e-1f5a8c7d6e44';

const id = (value) => uuidv5(value, NS);

// ============================================================
// CATEGORY IMAGES
// ============================================================

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
  'Breakfast': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsvUxYSNefZEfFfSb4kExOX9NUvS8Ae0HGTQXpGt1jIj7q-mcab8mut0&s=10',
};

// ============================================================
// CATEGORY ICONS
// ============================================================

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
  
};

// ============================================================
// PRODUCT IMAGES
//
// Keep your existing images here.
// Products without an exact image currently use default.jpeg.
// You can replace those paths later.
// ============================================================

const PRODUCT_IMAGES = {
  // ---------------- RICE ----------------

  'Red Rice Unpolished':
    '/products/red rice unpolished.jpeg',

  'Red Rice Semi Polished':
    '/products/red rice semipolished.jpeg',

  'Rajamudi Rice Unpolished':
    '/products/raj_unpo.jpeg',

  'Rajamudi Rice Semi Polished':
    '/products/raj_semi.jpeg',

  'White Rajamudi Rice':
    '/products/raj_unpo.jpeg',

  'Rajabhoga Rice':
    '/products/raj_unpo.jpeg',

  'Black Rice':
    '/products/black rice.jpeg',

  'Brown Rice':
    '/products/brown rice.jpeg',

  'Boiled Rice':
    '/products/boiled rice.jpeg',

  'Basmati Rice':
    '/products/basmati rice.jpeg',

  'Diabetic Rice':
    '/products/diabetic rice.jpeg',

  'Dosa / Idli Rice':
    '/products/dosa idli rice.jpeg',

  'Navara Medicinal Rice':
    '/products/navara medice rice.jpeg',

  'Sona Masoori':
    '/products/sona masuri.jpeg',

  'Madhu Sanna':
    '/products/madhu_sanna.png',

  'Barley':
    '/products/barely.jpeg',

  'Sidda Sanna':
    '/products/sadda sanna.jpeg',

  // ---------------- MILLETS ----------------

  'Saave (Little Millet)':
    '/products/Saave01.png',

  'Navane (Foxtail Millet)':
    '/products/foxtail millet.jpeg',

  'Harka (Kodo Millet)':
    '/products/haraka.png',

  'Udalu (Barnyard Millet)':
    '/products/udalu.jpeg',

  'Baragu (Proso Millet)':
    '/products/Baragu.png',

  'Korale (Browntop Millet)':
    '/products/Korle(BTM).png',

  'Ragi (Finger Millet)':
    '/products/ragi flour.jpeg',

  'Pearl Millet':
    '/products/pearl_millet.png',

  'Sorghum (Jowar)':
    '/products/sor_jo.png',

  'Wheat':
    '/products/wheat flour.jpeg',

  'Java Wheat':
    '/products/jawa wheat flour.jpeg',

  // ---------------- PULSES ----------------

  'Horse Gram':
    '/products/horse gram.jpeg',

  'Bengal Gram':
    '/products/bengal gram.jpeg',

  'Roasted Gram':
    '/products/roasted gram.jpeg',

  'Roasted Channa Gola':
    '/products/default.jpeg',

  'Moong Whole':
    '/products/moong whole.jpeg',

  'Moong Dhal':
    '/products/moong dal.jpeg',

  'Channa Dhal':
    '/products/channa dal.jpeg',

  'Urad Dhal':
    '/products/urad dal.jpeg',

  'Urad Gola':
    '/products/Urad Gola01.png',

  'Toor Dhal':
    '/products/toor dal.jpeg',

  'Black Gram':
    '/products/default.jpeg',

  'Cow Pea (Red)':
    '/products/cowpea red.jpeg',

  'Madike (Moth Bean)':
    '/products/madike grah.jpeg',

  'Field Bean':
    '/products/default.jpeg',

  // ---------------- SWEETENERS ----------------

  'Jaggery Square':
    '/products/jaggery square.jpeg',

  'Jaggery Powder':
    '/products/jagerry powder.jpeg',

  'Joni Bella':
    '/products/bella.jpeg',

  'Brown Color Sugar':
    '/products/brown sugar.jpeg',

  // ---------------- SALTS ----------------

  'Rock Salt':
    '/products/rock salt.jpeg',

  'Rock Salt Crystal':
    '/products/rockcrys.png',

  'Black Salt':
    '/products/Black salt.png',

  'Sea Salt':
    '/products/sea salt (2).png',

  // ---------------- DRY FRUITS ----------------

  'Dry Dates':
    '/products/dates.jpeg',

  'Almond':
    '/products/almonds.jpeg',

  'Cashewnut':
    '/products/cashew.png',

  'Dry Grapes':
    '/products/dry graps.jpeg',

  // ---------------- SPICES ----------------

  'Mustard':
    '/products/mustard.jpeg',

  'Cumin (Jeera)':
    '/products/cumin seeds.jpeg',

  'Black Pepper':
    '/products/black pepper.jpeg',

  'Cardamom':
    '/products/cardamom.jpeg',

  'Cinnamon':
    '/products/cinamon.jpeg',

  'Clove':
    '/products/clove.jpeg',

  'Turmeric Powder':
    '/products/turmeric powder.jpeg',

  'Turmeric Cone':
    '/products/default.jpeg',

  'Kasthuri Turmeric':
    '/products/default.jpeg',

  'Methi (Fenugreek)':
    '/products/methi01.png',

  'Coffee Powder':
    '/products/coffee.jpeg',

  'Coriander (Local)':
    '/products/coriander seeds.jpeg',

  'Chilly Byadagi':
    '/products/default.jpeg',

  'Chilly Local':
    '/products/default.jpeg',

  'Chilly Guntur':
    '/products/default.jpeg',

  'Tamarind':
    '/products/default.jpeg',

  // ---------------- FLOURS ----------------

  'Ragi Flour':
    '/products/ragi flour.jpeg',

  'Rice Flour':
    '/products/rice flour.jpeg',

  'Wheat Flour':
    '/products/wheat flour.jpeg',

  'Java Wheat Flour':
    '/products/jawa wheat flour.jpeg',

  'Sorghum Flour':
    '/products/sor_flo.png',

  'Multi Grain Atta (12 cereals)':
    '/products/multi millet flour.png',

  'Channa Flour (Besan)':
    '/products/chana flour.jpeg',

  'Sajje Flour':
    '/products/default.jpeg',

  // ---------------- OILS ----------------

  'Sunflower Oil':
    '/products/sunflower oil.jpeg',

  'Groundnut Oil':
    '/products/groundnut oil.jpeg',

  'Coconut Oil':
    '/products/coconut oil.jpeg',

  'Virgin Coconut Oil':
    '/products/virgin coconut oil.jpeg',

  'Castor Oil':
    '/products/castor oil.jpeg',

  'Nizer Oil':
    '/products/nizer.jpeg',

  'Sesamum Oil':
    '/products/default.jpeg',

  'Lamp (Deepa) Oil':
    '/products/default.jpeg',

  'Safflower Oil':
    '/products/default.jpeg',

  'Flax Seeds':
    '/products/flax seeds.jpeg',

  'Groundnut':
    '/products/groundnut.jpeg',

  'Black Sesame':
    '/products/black sesame.jpeg',

  'White Sesame':
    '/products/white sesame.jpeg',

  'Nizer Seeds':
    '/products/nizer.jpeg',

  // ---------------- SUPER FOODS ----------------

  'Chia Seeds':
    '/products/chia seeds.jpeg',

  'Sabja (Kama Kasturi) Seeds':
    '/products/sabja.png',

  'Kaloonji (Kari Jeerige) Seeds':
    '/products/kaloonji seeds.png',

  'Sunflower Seeds':
    '/products/sunflower seeds.png',

  'Pumpkin Seeds':
    '/products/pumpkin seeds.png',

  'Alvi Seeds':
    '/products/alviseeds.png',

  'Fenneel Seeds':
    '/products/default.jpeg',

  'Watermelon Seeds':
    '/products/water_seeds.png',

  // ---------------- BREAKFAST / RAVA / NUCHHU ----------------

  'Akki Nuchhu - Broken':
    '/products/default.jpeg',

  'Black Rice Nuchhu - Broken':
    '/products/default.jpeg',

  'Rajamudi Rava':
    '/products/rajamudi-upma-rava.jpeg',

  'Rajamudi Kadubina Tari':
    '/products/default.jpeg',

  'Java Wheat Upma Rava':
    '/products/java-wheat-upma-rava.jpeg',

  'Wheat Sooji Rava':
    '/products/sooji rava.jpeg',

  'Bansi Rava':
    '/products/bansi rava.jpeg',

  'Idli Rava':
    '/products/default.jpeg',

  'Maida':
    '/products/organic-maida.jpeg',

  'Wheat Dalia':
    '/products/wheat-dalia.jpeg',

  'Methi Mudde Flour':
    '/products/methi01.png',

  'Rajamudi Nuchhu':
    '/products/default.jpeg',

  'Red Rice Nuchhu':
    '/products/default.jpeg',

  'Foxtail Millet Rava':
    '/products/default.jpeg',

  'Little Millet Rava':
    '/products/default.jpeg',

  // ---------------- VALUE ADDED ----------------

  'Horsegram Papad':
    '/products/default.jpeg',

  'Rice Papad':
    '/products/default.jpeg',

  // ---------------- GHEE ----------------

  'Malnaad Gidda Pure Cow Ghee':
    '/products/cow ghee.jpeg',

  // ---------------- PERSONAL CARE ----------------

  'Shikakai Powder':
    '/products/default.jpeg',

  'Chigare Powder':
    '/products/default.jpeg',

  'Soapnut Powder':
    '/products/default.jpeg',

  
};

// ============================================================
// WEIGHT PARSER
// ============================================================

function parseWeight(weight) {
  const m = String(weight || '')
    .toUpperCase()
    .replace(/\s+/g, '');

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

  if (m.includes('LTR') || m.endsWith('L')) {
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

// ============================================================
// CATEGORY DESCRIPTIONS
// ============================================================

const descriptions = {
  'Traditional Rice':
    'Traditional rice varieties sourced from organic farming communities in Karnataka.',

  'Millets':
    'Nutritious traditional grains grown using sustainable and organic farming practices.',

  'Pulses':
    'Naturally grown pulses, carefully cleaned and packed for everyday cooking.',

  'Flours':
    'Freshly milled flours made from quality grains and traditional ingredients.',

  'Oils & Oil Seeds':
    'Traditional oils and oil seeds sourced with quality and purity in mind.',

  'Sweeteners':
    'Traditional sweeteners made without unnecessary additives.',

  'Salts':
    'Naturally sourced salts selected for everyday cooking.',

  'Dry Fruits':
    'Quality nuts and dried fruits with no unnecessary additives.',

  'Spices':
    'Aromatic spices selected for authentic flavour and everyday cooking.',

  'Super Foods':
    'Nutrient-rich seeds, grains and traditional foods for a wholesome diet.',

  'Breakfast':
    'Traditional breakfast staples including avalakki, rava, dalia and more.',

  
};

// ============================================================
// CATEGORIES
// ============================================================

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
  
];

export {
  CATEGORY_IMAGES,
  CATEGORY_ICONS,
};

// ============================================================
// MASTER PRODUCT LIST
//
// [name, category, weight, MRP, margin]
// ============================================================

const raw = [

  // ==========================================================
  // RICES
  // ==========================================================

  ['Red Rice Unpolished', 'Traditional Rice', '1 Kg', 80, 15],
  ['Red Rice Unpolished', 'Traditional Rice', '5 Kg', 390, 15],

  ['Red Rice Semi Polished', 'Traditional Rice', '1 Kg', 80, 15],
  ['Red Rice Semi Polished', 'Traditional Rice', '5 Kg', 390, 15],

  ['Rajamudi Rice Unpolished', 'Traditional Rice', '1 Kg', 95, 15],
  ['Rajamudi Rice Unpolished', 'Traditional Rice', '5 Kg', 465, 15],
  ['Rajamudi Rice Unpolished', 'Traditional Rice', '10 Kg', 900, 15],
  ['Rajamudi Rice Unpolished', 'Traditional Rice', '26 Kg', 2210, 10],

  ['Rajamudi Rice Semi Polished', 'Traditional Rice', '1 Kg', 95, 15],
  ['Rajamudi Rice Semi Polished', 'Traditional Rice', '5 Kg', 465, 15],
  ['Rajamudi Rice Semi Polished', 'Traditional Rice', '10 Kg', 900, 15],
  ['Rajamudi Rice Semi Polished', 'Traditional Rice', '26 Kg', 2210, 10],

  ['White Rajamudi Rice', 'Traditional Rice', '1 Kg', 85, 15],

  ['Rajabhoga Rice', 'Traditional Rice', '1 Kg', 75, 15],

  ['Black Rice', 'Traditional Rice', '1 Kg', 185, 15],
  ['Black Rice', 'Traditional Rice', '500 Gm', 95, 15],

  ['Brown Rice', 'Traditional Rice', '1 Kg', 85, 15],
  ['Brown Rice', 'Traditional Rice', '5 Kg', 385, 15],

  ['Boiled Rice', 'Traditional Rice', '1 Kg', 75, 15],
  ['Boiled Rice', 'Traditional Rice', '5 Kg', 365, 15],

  ['Basmati Rice', 'Traditional Rice', '1 Kg', 140, 15],

  ['Diabetic Rice', 'Traditional Rice', '1 Kg', 85, 15],

  ['Dosa / Idli Rice', 'Traditional Rice', '1 Kg', 60, 15],
  ['Dosa / Idli Rice', 'Traditional Rice', '5 Kg', 265, 15],
  ['Dosa / Idli Rice', 'Traditional Rice', '10 Kg', 500, 15],

  ['Navara Medicinal Rice', 'Traditional Rice', '1 Kg', 90, 15],

  ['Sona Masoori', 'Traditional Rice', '1 Kg', 85, 15],
  ['Sona Masoori', 'Traditional Rice', '5 Kg', 415, 15],
  ['Sona Masoori', 'Traditional Rice', '10 Kg', 800, 15],

  ['Madhu Sanna', 'Traditional Rice', '1 Kg', 85, 15],
  ['Madhu Sanna', 'Traditional Rice', '5 Kg', 415, 15],
  ['Madhu Sanna', 'Traditional Rice', '10 Kg', 800, 15],

  ['Barley', 'Traditional Rice', '500 Gm', 65, 15],

  ['Sidda Sanna', 'Traditional Rice', '1 Kg', 85, 15],
  ['Sidda Sanna', 'Traditional Rice', '5 Kg', 415, 15],
  ['Sidda Sanna', 'Traditional Rice', '10 Kg', 800, 15],

  // ==========================================================
  // MILLETS / CEREALS
  // ==========================================================

  ['Saave (Little Millet)', 'Millets', '1 Kg', 185, 20],
  ['Saave (Little Millet)', 'Millets', '500 Gm', 95, 20],

  ['Navane (Foxtail Millet)', 'Millets', '1 Kg', 125, 20],
  ['Navane (Foxtail Millet)', 'Millets', '500 Gm', 65, 20],

  ['Harka (Kodo Millet)', 'Millets', '1 Kg', 125, 20],
  ['Harka (Kodo Millet)', 'Millets', '500 Gm', 65, 20],

  ['Udalu (Barnyard Millet)', 'Millets', '1 Kg', 175, 20],
  ['Udalu (Barnyard Millet)', 'Millets', '500 Gm', 95, 20],

  ['Baragu (Proso Millet)', 'Millets', '1 Kg', 145, 20],
  ['Baragu (Proso Millet)', 'Millets', '500 Gm', 75, 20],

  ['Korale (Browntop Millet)', 'Millets', '1 Kg', 245, 20],
  ['Korale (Browntop Millet)', 'Millets', '500 Gm', 125, 20],

  ['Ragi (Finger Millet)', 'Millets', '1 Kg', 65, 20],
  ['Ragi (Finger Millet)', 'Millets', '5 Kg', 310, 20],
  ['Ragi (Finger Millet)', 'Millets', '10 Kg', 600, 20],

  ['Pearl Millet', 'Millets', '1 Kg', 65, 20],
  ['Pearl Millet', 'Millets', '500 Gm', 35, 20],

  ['Sorghum (Jowar)', 'Millets', '1 Kg', 65, 20],
  ['Sorghum (Jowar)', 'Millets', '500 Gm', 35, 20],
  ['Sorghum (Jowar)', 'Millets', '5 Kg', 315, 20],
  ['Sorghum (Jowar)', 'Millets', '10 Kg', 600, 20],

  ['Wheat', 'Millets', '1 Kg', 60, 20],
  ['Wheat', 'Millets', '5 Kg', 290, 20],
  ['Wheat', 'Millets', '10 Kg', 550, 20],

  ['Java Wheat', 'Millets', '1 Kg', 135, 20],
  ['Java Wheat', 'Millets', '5 Kg', 665, 20],
  ['Java Wheat', 'Millets', '10 Kg', 1250, 20],

  // ==========================================================
  // PULSES
  // ==========================================================

  ['Horse Gram', 'Pulses', '1 Kg', 105, 20],
  ['Horse Gram', 'Pulses', '500 Gm', 55, 20],

  ['Bengal Gram', 'Pulses', '1 Kg', 115, 20],
  ['Bengal Gram', 'Pulses', '500 Gm', 60, 20],

  ['Roasted Gram', 'Pulses', '400 Gm', 60, 20],
  ['Roasted Gram', 'Pulses', '1 Kg', 140, 20],

  ['Moong Whole', 'Pulses', '1 Kg', 150, 20],
  ['Moong Whole', 'Pulses', '500 Gm', 80, 20],

  ['Moong Dhal', 'Pulses', '1 Kg', 165, 20],
  ['Moong Dhal', 'Pulses', '500 Gm', 85, 20],

  ['Channa Dhal', 'Pulses', '1 Kg', 120, 20],
  ['Channa Dhal', 'Pulses', '500 Gm', 65, 20],

  ['Urad Dhal', 'Pulses', '1 Kg', 175, 20],
  ['Urad Dhal', 'Pulses', '500 Gm', 90, 20],

  ['Urad Gola', 'Pulses', '1 Kg', 185, 20],
  ['Urad Gola', 'Pulses', '500 Gm', 95, 20],

  ['Toor Dhal', 'Pulses', '1 Kg', 180, 20],
  ['Toor Dhal', 'Pulses', '500 Gm', 95, 20],

  ['Cow Pea (Red)', 'Pulses', '250 Gm', 40, 20],

  ['Madike (Moth Bean)', 'Pulses', '250 Gm', 40, 20],

  // ==========================================================
  // SWEETENERS
  // ==========================================================

  ['Jaggery Square', 'Sweeteners', '12 Pcs', 90, 22],
  ['Jaggery Square', 'Sweeteners', '6 Pcs', 45, 22],

  ['Jaggery Powder', 'Sweeteners', '1 Kg', 95, 22],
  ['Jaggery Powder', 'Sweeteners', '500 Gm', 50, 22],

  ['Joni Bella', 'Sweeteners', '1 Kg', 160, 22],

  ['Brown Color Sugar', 'Sweeteners', '1 Kg', 135, 22],
  ['Brown Color Sugar', 'Sweeteners', '500 Gm', 70, 22],

  // ==========================================================
  // SALTS
  // ==========================================================

  ['Rock Salt', 'Salts', '1 Kg', 80, 22],
  ['Rock Salt', 'Salts', '500 Gm', 45, 22],

  ['Rock Salt Crystal', 'Salts', '1 Kg', 95, 22],
  ['Rock Salt Crystal', 'Salts', '400 Gm', 45, 22],

  ['Black Salt', 'Salts', '250 Gm', 45, 22],

  ['Sea Salt', 'Salts', '1 Kg', 30, 22],

  // ==========================================================
  // DRY FRUITS
  // ==========================================================

  ['Dry Dates', 'Dry Fruits', '200 Gm', 120, 22],
  ['Dry Dates', 'Dry Fruits', '80 Gm', 50, 22],

  ['Almond', 'Dry Fruits', '200 Gm', 315, 22],
  ['Almond', 'Dry Fruits', '80 Gm', 135, 22],

  ['Cashewnut', 'Dry Fruits', '200 Gm', 295, 22],
  ['Cashewnut', 'Dry Fruits', '80 Gm', 125, 22],

  ['Dry Grapes', 'Dry Fruits', '200 Gm', 175, 22],
  ['Dry Grapes', 'Dry Fruits', '80 Gm', 75, 22],

  // ==========================================================
  // SPICES
  // ==========================================================

  ['Mustard', 'Spices', '200 Gm', 50, 22],
  ['Mustard', 'Spices', '80 Gm', 25, 22],

  ['Cumin (Jeera)', 'Spices', '200 Gm', 130, 22],
  ['Cumin (Jeera)', 'Spices', '80 Gm', 55, 22],

  ['Black Pepper', 'Spices', '50 Gm', 75, 22],

  ['Cardamom', 'Spices', '30 Gm', 150, 22],

  ['Cinnamon', 'Spices', '50 Gm', 40, 22],

  ['Clove', 'Spices', '30 Gm', 65, 22],

  ['Turmeric Powder', 'Spices', '200 Gm', 85, 22],
  ['Turmeric Powder', 'Spices', '80 Gm', 40, 22],

  ['Methi (Fenugreek)', 'Spices', '500 Gm', 70, 22],
  ['Methi (Fenugreek)', 'Spices', '250 Gm', 45, 22],

  ['Coffee Powder', 'Spices', '200 Gm', 170, 22],
  ['Coffee Powder', 'Spices', '80 Gm', 75, 22],

  ['Coriander (Local)', 'Spices', '100 Gm', 35, 22],
  ['Coriander (Local)', 'Spices', '500 Gm', 140, 22],

  // ==========================================================
  // FLOURS
  // ==========================================================

  ['Ragi Flour', 'Flours', '1 Kg', 75, 15],
  ['Ragi Flour', 'Flours', '5 Kg', 360, 15],

  ['Rice Flour', 'Flours', '1 Kg', 65, 15],

  ['Wheat Flour', 'Flours', '1 Kg', 70, 15],
  ['Wheat Flour', 'Flours', '5 Kg', 335, 15],

  ['Java Wheat Flour', 'Flours', '1 Kg', 145, 15],
  ['Java Wheat Flour', 'Flours', '5 Kg', 715, 15],

  ['Sorghum Flour', 'Flours', '1 Kg', 75, 15],
  ['Sorghum Flour', 'Flours', '5 Kg', 360, 15],

  ['Multi Grain Atta (12 cereals)', 'Flours', '1 Kg', 120, 15],

  ['Channa Flour (Besan)', 'Flours', '500 Gm', 70, 15],
  ['Channa Flour (Besan)', 'Flours', '1 Kg', 135, 15],

  // ==========================================================
  // OILS & OIL SEEDS
  // ==========================================================

  ['Sunflower Oil', 'Oils & Oil Seeds', '5 Ltr', 1785, 15],
  ['Sunflower Oil', 'Oils & Oil Seeds', '1 Ltr', 360, 15],

  ['Groundnut Oil', 'Oils & Oil Seeds', '5 Ltr', 1865, 15],
  ['Groundnut Oil', 'Oils & Oil Seeds', '1 Ltr', 375, 15],

  ['Coconut Oil', 'Oils & Oil Seeds', '1 Ltr', 575, 15],
  ['Coconut Oil', 'Oils & Oil Seeds', '500 Ml', 290, 15],
  ['Coconut Oil', 'Oils & Oil Seeds', '250 Ml', 150, 15],

  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '5 Ltr', 3235, 15],
  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '1 Ltr', 650, 15],
  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '500 Ml', 330, 15],
  ['Virgin Coconut Oil', 'Oils & Oil Seeds', '250 Ml', 170, 15],

  ['Castor Oil', 'Oils & Oil Seeds', '500 Ml', 150, 15],
  ['Castor Oil', 'Oils & Oil Seeds', '200 Ml', 70, 15],

  ['Flax Seeds', 'Oils & Oil Seeds', '500 Gm', 135, 15],
  ['Flax Seeds', 'Oils & Oil Seeds', '250 Gm', 70, 15],
  ['Flax Seeds', 'Oils & Oil Seeds', '80 Gm', 40, 15],

  ['Groundnut', 'Oils & Oil Seeds', '1 Kg', 195, 15],
  ['Groundnut', 'Oils & Oil Seeds', '500 Gm', 100, 15],

  ['Black Sesame', 'Oils & Oil Seeds', '500 Gm', 140, 15],
  ['Black Sesame', 'Oils & Oil Seeds', '200 Gm', 60, 15],

  ['White Sesame', 'Oils & Oil Seeds', '200 Gm', 65, 15],
  ['White Sesame', 'Oils & Oil Seeds', '500 Gm', 150, 15],

  ['Nizer Seeds', 'Oils & Oil Seeds', '500 Gm', 140, 15],
  ['Nizer Seeds', 'Oils & Oil Seeds', '200 Gm', 60, 15],

  // ==========================================================
  // SUPER FOODS
  // ==========================================================

  ['Chia Seeds', 'Super Foods', '80 Gm', 95, 30],

  ['Sabja (Kama Kasturi) Seeds', 'Super Foods', '80 Gm', 105, 30],

  ['Kaloonji (Kari Jeerige) Seeds', 'Super Foods', '80 Gm', 105, 30],

  ['Sunflower Seeds', 'Super Foods', '80 Gm', 95, 30],

  ['Pumpkin Seeds', 'Super Foods', '80 Gm', 110, 30],

  ['Alvi Seeds', 'Super Foods', '80 Gm', 65, 30],

  ['Watermelon Seeds', 'Super Foods', '100 Gm', 140, 30],

  // ==========================================================
  // BREAKFAST / RAVA / TRADITIONAL PRODUCTS
  // ==========================================================

  ['Wheat Sooji Rava', 'Breakfast', '1 Kg', 95, 20],
  ['Wheat Sooji Rava', 'Breakfast', '500 Gm', 50, 20],

  ['Bansi Rava', 'Breakfast', '1 Kg', 75, 20],
  ['Bansi Rava', 'Breakfast', '500 Gm', 40, 20],

  ['Methi Mudde Flour', 'Breakfast', '1 Kg', 150, 20],
  ['Methi Mudde Flour', 'Breakfast', '500 Gm', 80, 20],

  // ==========================================================
  // VALUE ADDED
  // ==========================================================

  // ==========================================================
  // GHEE
  // ==========================================================

  ['Malnaad Gidda Pure Cow Ghee', 'Super Foods', '300 Ml', 550, 10],
  ['Malnaad Gidda Pure Cow Ghee', 'Super Foods', '500 Ml', 850, 10],

  // ==========================================================
  // PERSONAL CARE
  // ==========================================================


  // ==========================================================
  // EXISTING DAIRY CATALOGUE
  //
  // These were in your previous product file but NOT in the
  // supplied spreadsheet. Kept here so we don't accidentally
  // delete your existing dairy catalogue.
  // ==========================================================

];

// ============================================================
// PRODUCT CREATION
// ============================================================

export const PRODUCTS = raw.map(
  ([name, category, weight, price, margin], index) => {
    const seed = `${name}-${weight}`;

    const stock_quantity = 10 + (index % 40);

    return {
      id: id(seed),

      // Products with different weights share the same group.
      group_id: id(name),

      name,
      category,
      weight,

      // Actual MRP from the supplied price list.
      // null means this product came from the previous dairy
      // catalogue and does not have a price in the supplied sheet.
      price,

      // Internal margin from the supplied sheet.
      margin,

      image:
        PRODUCT_IMAGES[name] ||
        '/products/default.jpeg',

      gallery: [
        PRODUCT_IMAGES[name] ||
          '/products/default.jpeg',
      ],

      description:
        descriptions[category] ||
        'Quality products from Avani Organics.',

      stock_quantity,

      in_stock: stock_quantity > 0,

      low_stock_threshold: 5,

      // Backward compatibility.
      stock: stock_quantity,

      // Existing UI compatibility.
      // These are NOT promotional claims.
      rating: 4.5,

      reviews: 0,

      // Explicitly no promotional badge.
      badge: null,
    };
  }
);

// ============================================================
// VARIANT HELPERS
// ============================================================

function weightSortKey(weight) {
  const parsed = parseWeight(weight);

  return parsed.grams || 0;
}

export function getVariants(name) {
  return PRODUCTS
    .filter((product) => product.name === name)
    .sort(
      (a, b) =>
        weightSortKey(a.weight) -
        weightSortKey(b.weight)
    );
}

// ============================================================
// GROUP PRODUCTS
// ============================================================

export function getGroupedProducts() {
  const seen = new Map();

  for (const product of PRODUCTS) {
    if (!seen.has(product.name)) {
      const variants = getVariants(product.name);

      const representative = variants[0];

      const pricedVariants = variants.filter(
        (variant) =>
          typeof variant.price === 'number'
      );

      const prices = pricedVariants.map(
        (variant) => variant.price
      );

      seen.set(product.name, {
        ...representative,

        variant_count: variants.length,

        variants: variants.map((variant) => ({
          id: variant.id,
          weight: variant.weight,
          price: variant.price,
          margin: variant.margin,
        })),

        min_price:
          prices.length > 0
            ? Math.min(...prices)
            : null,

        max_price:
          prices.length > 0
            ? Math.max(...prices)
            : null,
      });
    }
  }

  return Array.from(seen.values());
}

// ============================================================
// LOOKUP HELPERS
// ============================================================

export const getProductById = (productId) =>
  PRODUCTS.find(
    (product) => product.id === productId
  );

export const getByCategory = (category) =>
  PRODUCTS.filter(
    (product) => product.category === category
  );

// ============================================================
// DATA VALIDATION HELPERS
// ============================================================

// Useful while checking the catalogue.
// You can call these from the browser console if needed.

export function getProductsWithoutPrice() {
  return PRODUCTS.filter(
    (product) =>
      product.price === null ||
      typeof product.price !== 'number'
  );
}

export function getProductsWithoutImage() {
  return PRODUCTS.filter(
    (product) =>
      !product.image ||
      product.image === '/products/default.jpeg'
  );
}

export function getProductCount() {
  return PRODUCTS.length;
}