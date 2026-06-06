import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import BRAND from '../config/brand.config'

async function uploadFile(file, complaintId) {
  const ext = file.name.split('.').pop()
  const path = `complaint-${complaintId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { data, error } = await supabase.storage.from('complaints').upload(path, file, { upsert: false })
  if (error) throw error
  const { data: urlData } = supabase.storage.from('complaints').getPublicUrl(data.path)
  return urlData.publicUrl
}


const CATEGORIES = BRAND.categories.map(c => c.label)

const CURRENCIES = [
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', rate: 834.50 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 104.72 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 4.97 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.89 },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', rate: 873.45 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', rate: 3948.30 },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', rate: 23.45 },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rate: 6.86 },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound', rate: 30.85 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', rate: 12.45 },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 7.81 },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', rate: 6.86 },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', rate: 363.20 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 16245.00 },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', rate: 3.68 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', rate: 137.45 },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', rate: 0.71 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  { code: 'KES', symbol: 'Sh', name: 'Kenyan Shilling', rate: 145.30 },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', rate: 0.31 },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', rate: 436.50 },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rate: 312.50 },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', rate: 17.05 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 4.71 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1540.50 },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rate: 10.68 },
  { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee', rate: 132.40 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 1.65 },
  { code: 'OMR', symbol: '﷼', name: 'Omani Rial', rate: 0.38 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 56.78 },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rate: 278.45 },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rate: 4.02 },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal', rate: 3.64 },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', rate: 4.97 },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', rate: 97.50 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 3.75 },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rate: 10.42 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.35 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 35.92 },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 33.28 },
  { code: 'UGX', symbol: 'Sh', name: 'Ugandan Shilling', rate: 3725.00 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'UZS', symbol: 'сўм', name: 'Uzbekistani Som', rate: 11850.00 },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rate: 24680.00 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 18.65 },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', rate: 3.68 },
]

export default function ComplaintForm({ onSubmitSuccess, initialCategory }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Sync category when user clicks a category card on homepage
  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({ ...prev, category: initialCategory }))
    }
  }, [initialCategory])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: initialCategory || 'Refund Not Issued',
    title: '',
    description: '',
    orderAmount: '',
    orderCurrency: 'USD',
    orderDate: '',
    uberOrderNumber: '',
  })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          title: formData.title,
          description: formData.description,
          orderAmount: formData.orderAmount ? parseFloat(formData.orderAmount) : null,
          orderCurrency: formData.orderCurrency,
          orderDate: formData.orderDate,
          uberOrderNumber: formData.uberOrderNumber,
        }),
      })

      if (!response.ok) {
        const responseData = await response.json()
        throw new Error(responseData.error || 'Failed to submit complaint')
      }

      const responseData = await response.json()
      const complaintId = responseData.complaint?.id

      // Upload any evidence files
      if (uploadedFiles.length > 0 && complaintId) {
        try {
          const urls = await Promise.all(uploadedFiles.map((f) => uploadFile(f, complaintId)))
          // Attach file URLs to the complaint
          await fetch(`/api/complaints/${complaintId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file_urls: urls }),
          })
        } catch (uploadErr) {
          console.error('File upload failed:', uploadErr)
          // Don't fail the whole submission over a file upload error
        }
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        category: initialCategory || 'Refund Not Issued',
        title: '',
        description: '',
        orderAmount: '',
        orderCurrency: 'USD',
        orderDate: '',
        uberOrderNumber: '',
      })
      setUploadedFiles([])
      if (fileRef.current) fileRef.current.value = ''

      if (onSubmitSuccess) {
        onSubmitSuccess()
      }

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Report Your Experience</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Thank you! Your complaint has been recorded. Your case will help others affected by this issue.
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">{BRAND.formFields.amountLabel}</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="orderAmount"
            value={formData.orderAmount}
            onChange={handleChange}
            step="0.01"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
          <select
            name="orderCurrency"
            value={formData.orderCurrency}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-gray-500 mt-1">{BRAND.formFields.amountHelper}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">{BRAND.formFields.dateLabel}</label>
        <input
          type="date"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">{BRAND.formFields.refLabel}</label>
        <input
          type="text"
          name="uberOrderNumber"
          value={formData.uberOrderNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={BRAND.formFields.refPlaceholder}
        />
        <p className="text-xs text-gray-500 mt-1">{BRAND.formFields.refHelper}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">{BRAND.formFields.titleLabel}</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={BRAND.formFields.titlePlaceholder}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">{BRAND.formFields.descLabel}</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={BRAND.formFields.descPlaceholder}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">📎 Upload Evidence (optional)</label>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100"
        />
        {uploadedFiles.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">{uploadedFiles.length} file(s) selected</p>
        )}
        <p className="text-xs text-gray-500 mt-1">Screenshots, PDFs, receipts — anything that supports your case. Uploaded securely.</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
      >
        {loading ? 'Submitting...' : 'Submit Complaint'}
      </button>

      <p className="text-xs text-gray-500 mt-4">
        {BRAND.disclaimer.formTruthfulness}
      </p>
    </form>
  )
}
