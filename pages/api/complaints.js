import { createClient } from '@supabase/supabase-js'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const config = {
  api: {
    bodyParser: false,
  },
}

const EXCHANGE_RATES = {
  // Major/Reserve Currencies
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CHF: 0.89,
  CNY: 7.24,

  // Americas
  CAD: 1.36,
  MXN: 17.05,
  BRL: 4.97,
  ARS: 834.5,
  CLP: 873.45,
  COP: 3948.3,
  PEN: 3.68,

  // Europe
  SEK: 10.42,
  NOK: 10.68,
  DKK: 6.86,
  PLN: 4.02,
  CZK: 23.45,
  HUF: 363.2,
  RON: 4.97,
  HRK: 6.86,
  RUB: 97.5,
  TRY: 33.28,

  // Asia-Pacific
  AUD: 1.53,
  NZD: 1.65,
  SGD: 1.35,
  HKD: 7.81,
  KRW: 1305.6,
  THB: 35.92,
  MYR: 4.71,
  PHP: 56.78,
  IDR: 16245,
  VND: 24680,

  // South Asia
  INR: 83.12,
  PKR: 278.45,
  BDT: 104.72,
  LKR: 312.5,
  NPR: 132.4,

  // Middle East & Africa
  AED: 3.67,
  SAR: 3.75,
  KWD: 0.31,
  QAR: 3.64,
  OMR: 0.38,
  JOD: 0.71,
  ILS: 3.68,
  EGP: 30.85,
  ZAR: 18.65,
  GHS: 12.45,
  NGN: 1540.5,
  KES: 145.3,
  UGX: 3725,

  // Central Asia
  KZT: 436.5,
  UZS: 11850,

  // Others
  ISK: 137.45,
}

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

const convertToUSD = (amount, currency) => {
  const rate = EXCHANGE_RATES[currency] || 1
  return parseFloat((amount / rate).toFixed(2))
}

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
      const { fields, files } = await parseForm(req)

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description
      const orderAmount = Array.isArray(fields.orderAmount) ? fields.orderAmount[0] : fields.orderAmount
      const orderCurrency = Array.isArray(fields.orderCurrency) ? fields.orderCurrency[0] : fields.orderCurrency
      const orderDate = Array.isArray(fields.orderDate) ? fields.orderDate[0] : fields.orderDate
      const uberOrderNumber = Array.isArray(fields.uberOrderNumber) ? fields.uberOrderNumber[0] : fields.uberOrderNumber

      if (!name || !email || !category || !title || !description) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      let fileUrls = []

      // Upload files to Supabase Storage if present
      if (files.files) {
        const fileArray = Array.isArray(files.files) ? files.files : [files.files]

        for (const file of fileArray) {
          const fileContent = fs.readFileSync(file.filepath)
          const fileName = `${Date.now()}-${file.originalFilename}`
          const filePath = `complaints/${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('complaints')
            .upload(filePath, fileContent, {
              contentType: file.mimetype,
              upsert: false,
            })

          if (uploadError) {
            console.warn('File upload warning:', uploadError)
          } else {
            const { data: publicUrl } = supabase.storage
              .from('complaints')
              .getPublicUrl(filePath)
            if (publicUrl) {
              fileUrls.push(publicUrl.publicUrl)
            }
          }
        }
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
            file_urls: fileUrls.length > 0 ? fileUrls : null,
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
