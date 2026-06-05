import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query

      let query = supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) throw error

      res.status(200).json({ complaints: data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, category, title, description, orderAmount, orderDate } = req.body

      if (!name || !email || !category || !title || !description) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const { data, error } = await supabase
        .from('complaints')
        .insert([
          {
            name,
            email,
            category,
            title,
            description,
            order_amount: orderAmount,
            order_date: orderDate,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      res.status(201).json({ complaint: data[0] })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
