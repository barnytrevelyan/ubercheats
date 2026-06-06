import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Single shared client — works for both browser (with auth session) and server-side reads
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export async function getComplaints(category = null) {
  let query = supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function addComplaint(complaintData) {
  const { data, error } = await supabase
    .from('complaints')
    .insert([complaintData])
    .select()

  if (error) throw error
  return data[0]
}

// Fetch a single complaint with its updates
export async function fetchComplaint(id) {
  const { data: complaint, error } = await supabase
    .from('complaints')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  const { data: updates } = await supabase
    .from('complaint_updates')
    .select('*')
    .eq('complaint_id', id)
    .order('created_at', { ascending: true })

  return { ...complaint, updates: updates || [] }
}
