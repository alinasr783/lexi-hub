import { createClient } from '@supabase/supabase-js';
import type { Database } from '../client/src/integrations/supabase/types';

const SUPABASE_URL = "https://uxbluzkvpfzkdibuaztp.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  throw new Error('SUPABASE_SERVICE_KEY environment variable is required');
}

// Create server-side Supabase client with service role key
export const supabaseServer = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});