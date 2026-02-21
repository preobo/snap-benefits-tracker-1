import * as mock from './users.mock';
import { supabase } from './supabase';
import { USE_MOCK } from './backend';

export type User = {
  id: string;
  monthly_snap_budget?: number;
  household_size?: number;
  preferences?: string;
  [key: string]: any;
};

export type UserUpdate = Partial<Omit<User, 'id'>>;

export type ServiceResponse<T> = {
  data: T | null;
  error: Error | null;
};

export const getUser = async (id: string): Promise<ServiceResponse<User>> => {
  if (USE_MOCK) return mock.getUser(id);

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return { data: null, error: error as Error };
    }

    return { data: data as User, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('Unexpected error fetching user:', error);
    return { data: null, error };
  }
};

export const updateUser = async (
  id: string,
  updates: UserUpdate
): Promise<ServiceResponse<User[]>> => {
  if (USE_MOCK) return mock.updateUser(id, updates);

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating user:', error);
      return { data: null, error: error as Error };
    }

    return { data: data as User[], error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('Unexpected error updating user:', error);
    return { data: null, error };
  }
};