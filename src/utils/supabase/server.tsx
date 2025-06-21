// src/utils/supabase/server.ts
import { createServerClient as _createSupabaseServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers'; // Important for server-side cookie access

// Ensure these environment variables are set in your .env.local file
// They should NOT have the NEXT_PUBLIC_ prefix for server-side use.
// SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
// SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

const supabaseUrl = process.env.NEXT_LOCAL_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_LOCAL_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable for server client.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing SUPABASE_ANON_KEY environment variable for server client.');
}

/**
 * Creates and returns a new Supabase client instance for Server Components and Server Actions.
 * It uses the 'cookies' function to manage sessions correctly on the server.
 * @returns {import('@supabase/ssr').SupabaseClient} The Supabase client instance.
 */
export const createServerClient = () => {
  // cookies() returns a Promise, so we need to handle it asynchronously
  return _createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // New: getAll method
      getAll: async () => {
        // cookies() returns a Promise<ReadonlyRequestCookies>
        const cookieStore = await cookies();
        // getAll() returns an array of objects like { name: 'my-cookie', value: 'xyz' }
        return cookieStore.getAll();
      },
      // New: setAll method
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value }) => {
            cookieStore.set(name, value);
          });
        } catch (error) {
          // The `cookies()` may not be available in all contexts, especially during redirects.
          // This error can be ignored if you're not trying to set cookies in a Server Component context that doesn't support them.
          console.warn('Could not set all cookies in server client:', error);
        }
      },
      // The `remove` method is no longer needed with `setAll` handling empty values,
      // but if you really needed it for specific scenarios, it would set the cookie to '' with expired maxAge.
      // remove: (name: string, options: any) => {
      //   try {
      //     cookieStore.set(name, '', { ...options, maxAge: -1 }); // Set to empty string and expire immediately
      //   } catch (error) {
      //     console.warn('Could not remove cookie in server client:', error);
      //   }
      // },
    },
  });
};