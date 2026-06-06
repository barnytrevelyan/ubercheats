import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { country: slug } = req.query

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { data: country, error: countryErr } = await supabase
    .from('countries')
    .select('*, regions(name, slug)')
    .eq('slug', slug)
    .single()

  if (countryErr || !country) return res.status(404).json({ error: 'Country not found' })

  const { data: entries } = await supabase
    .from('directory_entries')
    .select('*')
    .eq('country_id', country.id)
    .eq('verified', true)
    .order('section')
    .order('display_order')

  const executives     = (entries || []).filter(e => e.section === 'executive')
  const paymentPartners = (entries || []).filter(e => e.section === 'payment_partner')
  const regulators     = (entries || []).filter(e => e.section === 'regulator')

  res.setHeader('Cache-Control', 'public, s-maxage=1800')
  res.status(200).json({ country, executives, paymentPartners, regulators })
}
