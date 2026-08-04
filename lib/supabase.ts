import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Public client for code that is explicitly protected by Supabase RLS.
 * This project currently does not use it for bookings or admin operations.
 */
export function getSupabasePublic() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase public configuration is missing.");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Server-only client for privileged operations. Never fall back to the anon
 * key here: a missing production secret must fail closed, not change the
 * security model of booking storage.
 */
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase server configuration is missing.");
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
