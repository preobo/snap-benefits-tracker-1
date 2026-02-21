export type FoodDrive = {
  id: string;
  name: string;
  organization: string;
  address: string;
  date: string;
  time: string;
  distance?: string;
  notes: string;
};

export const mockFoodDrives: FoodDrive[] = [
  { id: '1', name: 'Community Pantry Saturday', organization: 'City Relief', address: '123 Main St', date: 'Feb 22', time: '9am–12pm', distance: '0.5 mi', notes: 'Bring ID. Drive-thru available.' },
  { id: '2', name: 'Weekly Fresh Produce', organization: 'Harvest Hope', address: '456 Oak Ave', date: 'Feb 24', time: '10am–2pm', distance: '1.2 mi', notes: 'SNAP recipients welcome. No appointment.' },
  { id: '3', name: 'School District Food Giveaway', organization: 'Local Schools', address: '789 Education Dr', date: 'Feb 25', time: '3pm–6pm', distance: '2.0 mi', notes: 'For families with students.' },
  { id: '4', name: 'Church Pantry', organization: 'First Community Church', address: '321 Church St', date: 'Feb 26', time: '11am–1pm', distance: '0.8 mi', notes: 'Non-perishables + fresh when available.' },
  { id: '5', name: 'Mobile Food Bank', organization: 'Feeding America', address: '555 Park Rd', date: 'Feb 28', time: '8am–10am', distance: '3.0 mi', notes: 'First come, first served.' },
];
