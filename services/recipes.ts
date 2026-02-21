export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  rating: number;
  calories: number;
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Pasta Carbonara',
    description: 'Classic Italian pasta with crispy bacon, eggs, and parmesan cheese',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g parmesan cheese',
      'Black pepper',
      'Salt'
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Fry pancetta until crispy',
      'Whisk eggs with grated parmesan',
      'Drain pasta and mix with pancetta',
      'Add egg mixture off heat, stirring constantly',
      'Season with black pepper and serve'
    ],
    tags: ['pasta', 'italian', 'comfort food'],
    rating: 4.8,
    calories: 520
  },
  {
    id: '2',
    title: 'Grilled Salmon with Vegetables',
    description: 'Healthy and delicious salmon with roasted seasonal vegetables',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    cookTime: 30,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Mediterranean',
    ingredients: [
      '2 salmon fillets',
      '1 zucchini',
      '1 bell pepper',
      '1 red onion',
      'Olive oil',
      'Lemon',
      'Herbs'
    ],
    instructions: [
      'Preheat grill to medium-high',
      'Season salmon with salt and pepper',
      'Cut vegetables into chunks',
      'Toss vegetables with olive oil',
      'Grill salmon 6-8 minutes per side',
      'Roast vegetables until tender',
      'Serve with lemon wedges'
    ],
    tags: ['healthy', 'seafood', 'grilled'],
    rating: 4.6,
    calories: 380
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    description: 'Soft and chewy homemade chocolate chip cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    cookTime: 20,
    servings: 24,
    difficulty: 'Easy',
    cuisine: 'American',
    ingredients: [
      '2 1/4 cups flour',
      '1 tsp baking soda',
      '1 cup butter',
      '3/4 cup sugar',
      '3/4 cup brown sugar',
      '2 eggs',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F',
      'Mix dry ingredients',
      'Cream butter and sugars',
      'Add eggs and vanilla',
      'Combine wet and dry ingredients',
      'Fold in chocolate chips',
      'Bake 9-11 minutes'
    ],
    tags: ['dessert', 'baking', 'sweet'],
    rating: 4.9,
    calories: 150
  },
  {
    id: '4',
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with tender chicken and aromatic spices',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800',
    cookTime: 45,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Indian',
    ingredients: [
      '500g chicken breast',
      '1 cup yogurt',
      '2 tbsp garam masala',
      '1 can tomatoes',
      '1 cup cream',
      '1 onion',
      'Garlic and ginger'
    ],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Grill chicken until cooked',
      'Sauté onions, garlic, and ginger',
      'Add tomatoes and spices',
      'Simmer until sauce thickens',
      'Add cream and cooked chicken',
      'Serve with rice or naan'
    ],
    tags: ['curry', 'indian', 'spicy'],
    rating: 4.7,
    calories: 450
  },
  {
    id: '5',
    title: 'Avocado Toast',
    description: 'Simple and healthy breakfast with perfectly ripe avocado',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800',
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    cuisine: 'American',
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      'Salt and pepper',
      'Red pepper flakes',
      'Lemon juice',
      'Optional: eggs'
    ],
    instructions: [
      'Toast bread until golden',
      'Mash avocado with lemon juice',
      'Season with salt and pepper',
      'Spread on toast',
      'Top with red pepper flakes',
      'Add poached egg if desired'
    ],
    tags: ['breakfast', 'healthy', 'quick'],
    rating: 4.5,
    calories: 280
  },
  {
    id: '6',
    title: 'Beef Stir Fry',
    description: 'Quick and flavorful Asian-style stir fry with vegetables',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    cookTime: 20,
    servings: 3,
    difficulty: 'Easy',
    cuisine: 'Asian',
    ingredients: [
      '400g beef strips',
      '1 bell pepper',
      '1 broccoli head',
      '2 carrots',
      'Soy sauce',
      'Ginger',
      'Garlic'
    ],
    instructions: [
      'Slice beef into thin strips',
      'Heat wok or large pan',
      'Stir fry beef until browned',
      'Add vegetables',
      'Add soy sauce and seasonings',
      'Cook until vegetables are crisp-tender',
      'Serve over rice'
    ],
    tags: ['stir fry', 'asian', 'quick'],
    rating: 4.6,
    calories: 420
  },
  {
    id: '7',
    title: 'Caesar Salad',
    description: 'Classic salad with crisp romaine, parmesan, and homemade dressing',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'American',
    ingredients: [
      '1 head romaine lettuce',
      '1/2 cup parmesan cheese',
      'Croutons',
      'Anchovies',
      'Lemon juice',
      'Olive oil',
      'Garlic'
    ],
    instructions: [
      'Wash and chop romaine',
      'Make dressing with anchovies and garlic',
      'Whisk in lemon juice and olive oil',
      'Toss lettuce with dressing',
      'Add parmesan and croutons',
      'Serve immediately'
    ],
    tags: ['salad', 'healthy', 'classic'],
    rating: 4.4,
    calories: 220
  },
  {
    id: '8',
    title: 'Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella and basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    cookTime: 15,
    servings: 2,
    difficulty: 'Medium',
    cuisine: 'Italian',
    ingredients: [
      'Pizza dough',
      'Tomato sauce',
      'Fresh mozzarella',
      'Fresh basil',
      'Olive oil',
      'Salt'
    ],
    instructions: [
      'Preheat oven to highest temperature',
      'Roll out pizza dough',
      'Spread tomato sauce',
      'Add mozzarella slices',
      'Bake 8-10 minutes',
      'Top with fresh basil',
      'Drizzle with olive oil'
    ],
    tags: ['pizza', 'italian', 'vegetarian'],
    rating: 4.8,
    calories: 320
  }
];

export const getRecipeById = (id: string): Recipe | undefined => {
  return mockRecipes.find(recipe => recipe.id === id);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowerQuery = query.toLowerCase();
  return mockRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(lowerQuery) ||
    recipe.description.toLowerCase().includes(lowerQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    recipe.cuisine.toLowerCase().includes(lowerQuery)
  );
};

export const getRecipesByCuisine = (cuisine: string): Recipe[] => {
  return mockRecipes.filter(recipe => recipe.cuisine === cuisine);
};

export const getRecipesByDifficulty = (difficulty: string): Recipe[] => {
  return mockRecipes.filter(recipe => recipe.difficulty === difficulty);
};

/** Recipes that fit meal plan / SNAP: budget-friendly, quick, or match common meal names */
export const getRecipesRecommendedForPlan = (mealNames: string[] = []): Recipe[] => {
  const snapFriendlyTags = ['quick', 'healthy', 'comfort food', 'budget', 'breakfast'];
  const nameSet = new Set(mealNames.map((n) => n.toLowerCase()));
  return mockRecipes.filter((recipe) => {
    const titleMatch = nameSet.has(recipe.title.toLowerCase());
    const tagMatch = recipe.tags.some((t) => snapFriendlyTags.some((s) => t.toLowerCase().includes(s)));
    const mealNameMatch = mealNames.some(
      (m) => recipe.title.toLowerCase().includes(m.toLowerCase()) || recipe.description.toLowerCase().includes(m.toLowerCase())
    );
    return titleMatch || tagMatch || mealNameMatch || recipe.difficulty === 'Easy';
  });
}
