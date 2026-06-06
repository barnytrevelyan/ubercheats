import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: complaint, error } = await supabase
      .from('complaints')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !complaint) {
      return res.status(404).json({ error: 'Complaint not found' })
    }

    const { data: updates } = await supabase
      .from('complaint_updates')
      .select('*')
      .eq('complaint_id', id)
      .order('created_at', { ascending: true })

    res.status(200).json({ complaint: { ...complaint, updates: updates || [] } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
