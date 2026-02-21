// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"

// Types matching the frontend
type UserOnboardingData = {
  parentName: string;
  childrenCount: number;
  budget: string;
  reloadTime: string;
  priorities: string[];
  dietaryRestrictions: string[];
};

type GroceryItem = {
  id: string;
  name: string;
  subName: string;
  checked: boolean;
};

type Meal = {
  type: string;
  name: string;
};

type DailyPlan = {
  day: string;
  meals: Meal[];
};

type GroceryCategory = {
  category: string;
  items: GroceryItem[];
};

type AIMasterResponse = {
  mealPlan: DailyPlan[];
  groceryList: GroceryCategory[];
};

// Helper function to generate a unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Generate meal plan based on user data
function generateMealPlan(userData: UserOnboardingData): DailyPlan[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
  
  // Budget-friendly meal options
  const budgetMeals: Record<string, string[]> = {
    Breakfast: [
      'Oatmeal with Bananas',
      'Scrambled Eggs with Toast',
      'Cereal with Milk',
      'Pancakes with Syrup',
      'Yogurt with Granola',
      'French Toast',
      'Breakfast Burrito'
    ],
    Lunch: [
      'PB&J Sandwich',
      'Mac and Cheese',
      'Chicken Noodle Soup',
      'Grilled Cheese',
      'Rice and Beans',
      'Pasta with Tomato Sauce',
      'Tuna Salad Sandwich'
    ],
    Dinner: [
      'Spaghetti with Meat Sauce',
      'Chicken and Rice',
      'Bean Tacos',
      'Lentil Soup',
      'Baked Potatoes',
      'Stir Fry Vegetables',
      'Chili'
    ]
  };

  // Adjust meals based on dietary restrictions
  let availableMeals = { ...budgetMeals };
  if (userData.dietaryRestrictions.includes('Vegetarian') || userData.dietaryRestrictions.includes('Vegan')) {
    availableMeals.Dinner = availableMeals.Dinner.filter(m => !m.includes('Chicken') && !m.includes('Meat'));
  }
  if (userData.dietaryRestrictions.includes('No Peanuts')) {
    availableMeals.Lunch = availableMeals.Lunch.filter(m => !m.includes('PB&J'));
  }

  return days.map(day => ({
    day,
    meals: mealTypes.map(type => ({
      type,
      name: availableMeals[type][Math.floor(Math.random() * availableMeals[type].length)]
    }))
  }));
}

// Generate grocery list based on meal plan
function generateGroceryList(mealPlan: DailyPlan[], userData: UserOnboardingData): GroceryCategory[] {
  const categories: GroceryCategory[] = [
    {
      category: 'Produce',
      items: [
        { id: generateId(), name: 'Bananas', subName: '1 bunch', checked: false },
        { id: generateId(), name: 'Bread', subName: '1 loaf', checked: false },
        { id: generateId(), name: 'Milk', subName: '1 gallon', checked: false },
        { id: generateId(), name: 'Eggs', subName: '1 dozen', checked: false },
      ]
    },
    {
      category: 'Pantry',
      items: [
        { id: generateId(), name: 'Pasta', subName: '2 boxes', checked: false },
        { id: generateId(), name: 'Rice', subName: '1 bag', checked: false },
        { id: generateId(), name: 'Beans', subName: '2 cans', checked: false },
        { id: generateId(), name: 'Cereal', subName: '1 box', checked: false },
        { id: generateId(), name: 'Oatmeal', subName: '1 container', checked: false },
      ]
    },
    {
      category: 'Protein',
      items: [
        { id: generateId(), name: 'Chicken Breast', subName: '2 lbs', checked: false },
        { id: generateId(), name: 'Ground Beef', subName: '1 lb', checked: false },
      ]
    }
  ];

  // Adjust based on dietary restrictions
  if (userData.dietaryRestrictions.includes('Vegetarian') || userData.dietaryRestrictions.includes('Vegan')) {
    categories[2].items = categories[2].items.filter(item => 
      !item.name.includes('Chicken') && !item.name.includes('Beef')
    );
    categories[2].items.push(
      { id: generateId(), name: 'Tofu', subName: '1 package', checked: false },
      { id: generateId(), name: 'Lentils', subName: '1 bag', checked: false }
    );
  }

  // Adjust quantities based on household size
  const householdSize = userData.childrenCount + 1; // parent + children
  categories.forEach(category => {
    category.items.forEach(item => {
      if (householdSize > 3) {
        // Increase quantities for larger households
        const match = item.subName.match(/(\d+)/);
        if (match) {
          const quantity = parseInt(match[1]);
          item.subName = item.subName.replace(/\d+/, (quantity * Math.ceil(householdSize / 3)).toString());
        }
      }
    });
  });

  return categories;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    // Parse request body
    const { userData } = await req.json() as { userData: UserOnboardingData };

    if (!userData) {
      return new Response(
        JSON.stringify({ error: 'Missing userData in request body' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Validate required fields
    if (!userData.parentName || userData.childrenCount === undefined || !userData.budget) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: parentName, childrenCount, or budget' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Generate meal plan and grocery list
    const mealPlan = generateMealPlan(userData);
    const groceryList = generateGroceryList(mealPlan, userData);

    const response: AIMasterResponse = {
      mealPlan,
      groceryList,
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
