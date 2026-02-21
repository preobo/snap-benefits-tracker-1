import type { User, UserUpdate, ServiceResponse } from './users';

export const getUser = async (id: string): Promise<ServiceResponse<User>> => {
  // We wrap this in an object with 'data' and 'error' to match Supabase's return style
  return { 
    data: {
      id: 'demo-user',
      monthly_snap_budget: 300,
      household_size: 3,
      preferences: 'Vegetarian, No Peanuts'
    }, 
    error: null 
  };
};

export const updateUser = async (
  id: string,
  updates: UserUpdate
): Promise<ServiceResponse<User[]>> => {
  console.log('HACKATHON LOG: Mocking update with:', updates);
  return { 
    data: [{ id, ...updates } as User], 
    error: null 
  };
};