// Re-export from the new structure
export { createClient } from './supabase/server';

// Admin client for server-side operations
import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase/types';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);