// Use mock data if explicitly set to true via environment variable
// Set EXPO_PUBLIC_USE_MOCK=true in your .env file to use mock data
// Defaults to false (use real Supabase backend)
export const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';