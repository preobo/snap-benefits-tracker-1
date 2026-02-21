import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type {
  AIMasterResponse,
  GroceryCategory,
  DailyPlan,
  UserOnboardingData,
} from '@/hooks/use-recomm';
import { mockSuggestedDeals } from '@/services/deals';

export type SuggestedDeal = {
  id: string;
  title: string;
  store: string;
  discount: string;
  expiresAt: string;
  snapEligible: boolean;
};

export type SNAPStatus = {
  balance: number;
  reloadDate: string;
  reloadTime: string; // 'Start' | 'Middle' | 'End'
};

type FamilyContextType = {
  // SNAP benefits – easily accessible
  snap: SNAPStatus | null;
  setSnap: (s: SNAPStatus | null) => void;

  // Family-viewable: meal plan & grocery list (from AI/onboarding)
  mealPlan: DailyPlan[];
  groceryList: GroceryCategory[];
  setMealPlanAndGrocery: (data: AIMasterResponse | null) => void;

  // User prefs from onboarding (for personalization / discover)
  userPrefs: UserOnboardingData | null;
  setUserPrefs: (p: UserOnboardingData | null) => void;

  // Suggested deals – viewable by all family
  suggestedDeals: SuggestedDeal[];
  setSuggestedDeals: (d: SuggestedDeal[]) => void;

  // Favorites (recipe ids) – can be family-shared or per-device
  favoriteRecipeIds: string[];
  toggleFavorite: (id: string) => void;
};

const defaultContext: FamilyContextType = {
  snap: null,
  setSnap: () => {},
  mealPlan: [],
  groceryList: [],
  setMealPlanAndGrocery: () => {},
  userPrefs: null,
  setUserPrefs: () => {},
  suggestedDeals: [],
  setSuggestedDeals: () => {},
  favoriteRecipeIds: [],
  toggleFavorite: () => {},
};

const FamilyContext = createContext<FamilyContextType>(defaultContext);

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  const [snap, setSnap] = useState<SNAPStatus | null>(null);
  const [mealPlan, setMealPlan] = useState<DailyPlan[]>([]);
  const [groceryList, setGroceryList] = useState<GroceryCategory[]>([]);
  const [userPrefs, setUserPrefs] = useState<UserOnboardingData | null>(null);
  const [suggestedDeals, setSuggestedDeals] = useState<SuggestedDeal[]>([]);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);

  useEffect(() => {
    setSuggestedDeals(mockSuggestedDeals);
    setSnap({ balance: 287.50, reloadDate: 'March 1', reloadTime: 'Start' });
  }, []);

  const setMealPlanAndGrocery = useCallback((data: AIMasterResponse | null) => {
    if (!data) {
      setMealPlan([]);
      setGroceryList([]);
      return;
    }
    setMealPlan(data.mealPlan ?? []);
    setGroceryList(data.groceryList ?? []);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const value: FamilyContextType = {
    snap,
    setSnap,
    mealPlan,
    groceryList,
    setMealPlanAndGrocery,
    userPrefs,
    setUserPrefs,
    suggestedDeals,
    setSuggestedDeals,
    favoriteRecipeIds,
    toggleFavorite,
  };

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamily must be used within FamilyProvider');
  return ctx;
}
