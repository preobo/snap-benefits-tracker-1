import type { SuggestedDeal } from '@/contexts/FamilyContext';

export const mockSuggestedDeals: SuggestedDeal[] = [
  { id: '1', title: 'Buy 1 Get 1 Cereal', store: 'Walmart', discount: '50% off', expiresAt: 'Feb 28', snapEligible: true },
  { id: '2', title: '$0.99/lb Chicken Thighs', store: 'Kroger', discount: 'Limit 2 lbs', expiresAt: 'Feb 25', snapEligible: true },
  { id: '3', title: 'Double SNAP at Farmers Market', store: 'Downtown Market', discount: 'Up to $20 match', expiresAt: 'Ongoing', snapEligible: true },
  { id: '4', title: 'Milk $2.99/gal', store: 'Aldi', discount: 'SNAP accepted', expiresAt: 'Mar 1', snapEligible: true },
  { id: '5', title: 'Pasta & Sauce Combo', store: 'Food Lion', discount: '2 for $3', expiresAt: 'Feb 22', snapEligible: true },
];
