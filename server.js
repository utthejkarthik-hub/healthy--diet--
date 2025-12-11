// Simple Express API to serve food details and static frontend.
// Put index.html, styles.css, script.js into a `public/` folder (or keep them at project root and adjust express.static)
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory dataset — expand as needed
const foods = [
  {
    id: 'oatmeal-01',
    name: 'Hearty Oatmeal Bowl',
    category: 'Breakfast',
    diet: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=60',
    description: 'Warm oats with berries, nuts and a splash of milk. High fiber and slow-release energy.',
    nutrition: { calories: 320, protein: '10g', carbs: '48g', fat: '9g', fiber: '8g', sugar: '8g' },
    ingredients: ['Rolled oats', 'Blueberries', 'Almonds', 'Milk (or plant milk)', 'Cinnamon', 'Honey (optional)'],
    serving: '1 bowl (about 300–350g). Great for breakfast or post-workout carb replenishment.'
  },
  {
    id: 'greek-salad-01',
    name: 'Greek Chickpea Salad',
    category: 'Salad',
    diet: 'Vegan',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=60',
    description: 'Fresh salad with chickpeas, cucumber, tomatoes, olives and lemon-olive oil dressing.',
    nutrition: { calories: 280, protein: '12g', carbs: '28g', fat: '12g', fiber: '7g', sugar: '5g' },
    ingredients: ['Chickpeas', 'Cucumber', 'Tomato', 'Red onion', 'Olives', 'Olive oil', 'Lemon juice', 'Parsley'],
    serving: '1 plate (about 350g). Good lunch option — balanced protein and fiber.'
  },
  {
    id: 'grilled-chicken-01',
    name: 'Grilled Chicken & Quinoa',
    category: 'Main',
    diet: 'High-Protein',
    image: 'https://images.unsplash.com/photo-1604908177522-7f2e1b6a7e33?w=800&auto=format&fit=crop&q=60',
    description: 'Lean grilled chicken breast served with quinoa and steamed greens.',
    nutrition: { calories: 420, protein: '36g', carbs: '40g', fat: '10g', fiber: '5g', sugar: '2g' },
    ingredients: ['Chicken breast', 'Quinoa', 'Broccoli', 'Lemon', 'Olive oil', 'Garlic'],
    serving: '1 serving: ~400g. Excellent for lean muscle maintenance and satiety.'
  },
  {
    id: 'smoothie-01',
    name: 'Green Smoothie',
    category: 'Beverage',
    diet: 'Vegan',
    image: 'https://images.unsplash.com/photo-1542446888-8b1c8fca9c6a?w=800&auto=format&fit=crop&q=60',
    description: 'Spinach, banana, avocado, and plant milk blended for a nutrient-dense drink.',
    nutrition: { calories: 210, protein: '4g', carbs: '28g', fat: '9g', fiber: '6g', sugar: '15g' },
    ingredients: ['Spinach', 'Banana', 'Avocado', 'Almond milk', 'Chia seeds'],
    serving: '1 glass (300ml). Great as a snack or light breakfast.'
  },
  {
    id: 'nuts-yogurt-01',
    name: 'Greek Yogurt with Nuts & Honey',
    category: 'Snack',
    diet: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1514511010155-09d02e6d31a6?w=800&auto=format&fit=crop&q=60',
    description: 'Creamy Greek yogurt topped with mixed nuts and a drizzle of honey — protein-rich snack.',
    nutrition: { calories: 220, protein: '14g', carbs: '14g', fat: '12g', fiber: '2g', sugar: '10g' },
    ingredients: ['Greek yogurt', 'Walnuts', 'Almonds', 'Honey', 'Berries (optional)'],
    serving: '1 small bowl (150–200g). Good between meals to maintain energy.'
  },
  {
    id: 'quinoa-bowl-01',
    name: 'Quinoa & Roasted Veg Bowl',
    category: 'Main',
    diet: 'Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60',
    description: 'Roasted seasonal vegetables on a bed of quinoa with tahini dressing.',
    nutrition: { calories: 380, protein: '11g', carbs: '54g', fat: '12g', fiber: '9g', sugar: '6g' },
    ingredients: ['Quinoa', 'Sweet potato', 'Zucchini', 'Bell pepper', 'Tahini', 'Lemon'],
    serving: '1 bowl. Ideal vegetarian lunch with good micronutrient variety.'
  }
];

// Serve static frontend from 'public' folder (create it and drop index.html, styles.css, script.js there)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/foods', (req, res) => {
  // Optionally support basic query params for category or q
  const { category, q } = req.query;
  let list = foods.map(f => ({
    id: f.id, name: f.name, category: f.category, image: f.image,
    nutrition: { calories: f.nutrition.calories }
  }));
  if(category) list = list.filter(i => i.category === category);
  if(q) {
    const qq = q.toLowerCase();
    list = list.filter(i => i.name.toLowerCase().includes(qq));
  }
  res.json(list);
});

app.get('/api/foods/:id', (req, res) => {
  const item = foods.find(f => f.id === req.params.id);
  if(!item) return res.status(404).json({error:'not found'});
  res.json(item);
});

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if(!q) return res.json([]);
  const matches = foods.filter(f =>
    f.name.toLowerCase().includes(q) ||
    (f.description || '').toLowerCase().includes(q) ||
    f.ingredients.some(i => i.toLowerCase().includes(q)) ||
    Object.values(f.nutrition).some(v => String(v).toLowerCase().includes(q))
  ).map(f => ({ id:f.id, name:f.name, category:f.category, image:f.image }));
  res.json(matches);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
