const BASE_PRICE = 499;

const PREMIUM_INGREDIENT_COSTS = {
  'Argan Oil': 120,
  'Keratin': 150,
  'Biotin': 140,
  'Rosemary Extract': 90,
  'Shea Butter': 110,
};

const BOTTLE_SIZE_COSTS = {
  '100ml': 0,
  '250ml': 250,
  '500ml': 550,
  '1 Liter': 1050,
};

const BOTTLE_DESIGN_COSTS = {
  'Classic Gold': 120,
  'Luxury Purple': 160,
  'Rose Gold': 180,
  'Premium Black': 220,
};

export function calculateCustomShampooPrice({ ingredients = [], bottleSize, bottleDesign }) {
  const ingredientTotal = ingredients.reduce(
    (sum, item) => sum + (PREMIUM_INGREDIENT_COSTS[item] || 60),
    0
  );
  const sizeTotal = BOTTLE_SIZE_COSTS[bottleSize] || 0;
  const designTotal = BOTTLE_DESIGN_COSTS[bottleDesign] || 0;

  return {
    basePrice: BASE_PRICE,
    ingredientTotal,
    sizeTotal,
    designTotal,
    total: BASE_PRICE + ingredientTotal + sizeTotal + designTotal,
  };
}

export { BASE_PRICE, PREMIUM_INGREDIENT_COSTS, BOTTLE_SIZE_COSTS, BOTTLE_DESIGN_COSTS };
