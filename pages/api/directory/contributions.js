import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { country_slug, section, role_or_type, name, notes, contact_url, source_url, submitted_by_email } = req.body

  if (!name || !section || !country_slug) {
    return res.status(400).json({ error: 'country_slug, section, and name are required' })
  }

  // Look up country id
  const { data: country } = await supabase
    .from('countries')
    .select('id')
    .eq('slug', country_slug)
    .single()

  if (!country) return res.status(404).json({ error: 'Country not found' })

  const { error } = await supabase.from('directory_contributions').insert([{
    country_id: country.id,
    section,
    role_or_type,
    name,
    notes,
    contact_url,
    source_url,
    submitted_by_email: submitted_by_email || null,
    status: 'pending',
  }])

  if (error) return res.status(500).json({ error: error.message })

  res.status(201).json({ message: 'Contribution submitted — thank you! It will appear after review.' })
}
