import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations that require admin privileges (e.g. creating bookings without RLS issues if needed)
export const supabaseAdmin = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : supabase
