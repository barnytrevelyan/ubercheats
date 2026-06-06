import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const EXCHANGE_RATES = {
  AED: 3.67,
  ARS: 834.5,
  AUD: 1.53,
  BDT: 104.72,
  BRL: 4.97,
  CAD: 1.36,
  CHF: 0.89,
  CLP: 873.45,
  CNY: 7.24,
  COP: 3948.3,
  CZK: 23.45,
  DKK: 6.86,
  EGP: 30.85,
  EUR: 0.92,
  GBP: 0.79,
  GHS: 12.45,
  HKD: 7.81,
  HRK: 6.86,
  HUF: 363.2,
  IDR: 16245,
  ILS: 3.68,
  INR: 83.12,
  ISK: 137.45,
  JOD: 0.71,
  JPY: 149.5,
  KES: 145.3,
  KWD: 0.31,
  KZT: 436.5,
  LKR: 312.5,
  MXN: 17.05,
  MYR: 4.71,
  NGN: 1540.5,
  NOK: 10.68,
  NPR: 132.4,
  NZD: 1.65,
  OMR: 0.38,
  PEN: 3.68,
  PHP: 56.78,
  PKR: 278.45,
  PLN: 4.02,
  QAR: 3.64,
  RON: 4.97,
  RUB: 97.5,
  SAR: 3.75,
  SEK: 10.42,
  SGD: 1.35,
  THB: 35.92,
  TRY: 33.28,
  UGX: 3725,
  USD: 1,
  UZS: 11850,
  VND: 24680,
  ZAR: 18.65,
}

const convertToUSD = (amount, currency) => {
  const rate = EXCHANGE_RATES[currency] || 1
  return parseFloat((amount / rate).toFixed(2))
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category, email } = req.query

      let query = supabase
        .from('complaints')
        .select('id, name, category, title, description, order_amount, order_currency, order_amount_usd, order_date, uber_order_number, file_urls, resolved, resolved_at, resolution_note, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      if (email) {
        // Require auth header to filter by email — prevents enumeration
        const authHeader = req.headers.authorization
        if (!authHeader) {
          return res.status(401).json({ error: 'Authentication required to filter by email' })
        }
        const { data: { user }, error: authErr } = await supabase.auth.getUser(
          authHeader.replace('Bearer ', '')
        )
        if (authErr || !user || user.email !== email) {
          return res.status(403).json({ error: 'Forbidden' })
        }
        // For authenticated user's own complaints, include email in select
        query = supabase
          .from('complaints')
          .select('*')
          .eq('email', email)
          .order('created_at', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error

      res.status(200).json({ complaints: data })
    } catch (error) {
      console.error('GET error:', error)
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, category, title, description, orderAmount, orderCurrency, orderDate, uberOrderNumber } = req.body

      if (!name || !email || !category || !title || !description) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const amountInUSD = orderAmount && orderCurrency ? convertToUSD(orderAmount, orderCurrency) : null

      const { data, error } = await supabase
        .from('complaints')
        .insert([
          {
            name,
            email,
            category,
            title,
            description,
            order_amount: orderAmount || null,
            order_currency: orderCurrency || 'USD',
            order_amount_usd: amountInUSD,
            order_date: orderDate || null,
            uber_order_number: uberOrderNumber || null,
            file_urls: null,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      res.status(201).json({ complaint: data[0] })
    } catch (error) {
      console.error('POST error:', error)
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
