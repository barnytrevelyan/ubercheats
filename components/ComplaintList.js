import { useState, useEffect } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  'All',
  'Refund Not Issued',
  'Charged Twice',
  'Order Cancelled but Not Refunded',
  'Customer Service Unresponsive',
  'Other',
]

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchComplaints()
  }, [selectedCategory])

  const fetchComplaints = async () => {
    setLoading(true)
    setError('')
    try {
      const category = selectedCategory === 'All' ? '' : selectedCategory
      const url = `/api/complaints${category ? `?category=${encodeURIComponent(category)}` : ''}`
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch complaints')
      const data = await response.json()
      setComplaints(data.complaints)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  const filtered = complaints.filter(c =>
    !search.trim() ||
    [c.title, c.description, c.name, c.uber_order_number, c.category]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Documented Cases</h2>

      {/* Category filter */}
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-3">Filter by Category:</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search cases by keyword, amount, or order number…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading complaints...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {search
              ? `No cases match "${search}".`
              : selectedCategory === 'All'
              ? 'No complaints yet. Be the first to share your experience.'
              : `No complaints in this category yet.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm mb-2">
            {filtered.length} {filtered.length === 1 ? 'case' : 'cases'}
            {search && ` matching "${search}"`}
          </p>

          {filtered.map(complaint => (
            <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Link href={`/complaints/${complaint.id}`} className="text-lg font-bold text-gray-800 hover:text-blue-700 hover:underline">
                    {complaint.title}
                  </Link>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{complaint.name}</span> • {formatDate(complaint.created_at)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {complaint.category}
                  </span>
                  {complaint.resolved && (
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                      ✅ Resolved
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-3">{complaint.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3 mb-3">
                {complaint.order_amount && (
                  <div className="bg-blue-50 px-3 py-2 rounded">
                    <span className="font-semibold">Amount:</span> {complaint.order_currency || 'USD'} {parseFloat(complaint.order_amount).toFixed(2)}
                    {complaint.order_amount_usd && complaint.order_currency !== 'USD' && (
                      <div className="text-xs text-gray-600 mt-1">≈ USD ${parseFloat(complaint.order_amount_usd).toFixed(2)}</div>
                    )}
                  </div>
                )}
                {complaint.order_date && (
                  <div><span className="font-semibold">Order Date:</span> {complaint.order_date}</div>
                )}
                {complaint.uber_order_number && (
                  <div><span className="font-semibold">Uber Order #:</span> {complaint.uber_order_number}</div>
                )}
              </div>

              {complaint.file_urls && complaint.file_urls.length > 0 && (
                <div className="border-t border-gray-100 pt-3 mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Attached Evidence:</p>
                  <div className="flex flex-wrap gap-2">
                    {complaint.file_urls.map((fileUrl, idx) => (
                      <a key={idx} href={fileUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded text-xs hover:bg-blue-100 transition">
                        <span className="mr-1">📎</span>View Evidence {idx + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <Link href={`/complaints/${complaint.id}`} className="text-xs text-blue-600 hover:underline">
                  View full case →
                </Link>
                <button
                  onClick={() => {
                    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/complaints/${complaint.id}`
                    navigator.clipboard?.writeText(url).then(() => alert('Link copied!'))
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 transition"
                  title="Copy link to this case"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
