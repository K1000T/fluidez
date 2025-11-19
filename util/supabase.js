import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  // don't throw at import time in case some routes don't use supabase
  console.warn('[supabase] SUPABASE_URL or SUPABASE_SERVICE_KEY not set');
}

export function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Supabase config missing (SUPABASE_URL or SUPABASE_SERVICE_KEY)');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    // Use server-side settings if needed
    auth: { persistSession: false },
  });
}
