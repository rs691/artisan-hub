// src/utils/supabase/client.ts

import { createClient as _createClient } from '@supabase/supabase-js';

// Ensure these environment variables are set in your .env.local file
// NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
// NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw an error if environment variables are not set, which is critical for the app to function.
if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing SUPABASE_ANON_KEY environment variable.');
}

/**
 * Creates and returns a new Supabase client instance for client-side usage.
 * This function should be called inside client components when you need to interact with Supabase.
 * @returns {import('@supabase/supabase-js').SupabaseClient} The Supabase client instance.
 */
export const createClient = () => {
  return _createClient(supabaseUrl, supabaseAnonKey);
};