import { useState, useEffect } from 'react'

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

      if (!response.ok) {
        throw new Error('Failed to fetch complaints')
      }

      const data = await response.json()
      setComplaints(data.complaints)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Documented Cases</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Filter by Category:</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
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

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading complaints...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {selectedCategory === 'All'
              ? 'No complaints yet. Be the first to share your experience.'
              : `No complaints in this category yet.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            {complaints.length} {complaints.length === 1 ? 'case' : 'cases'} reported
          </p>

          {complaints.map((complaint) => (
            <div key={complaint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{complaint.title}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{complaint.name}</span> • {formatDate(complaint.created_at)}
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {complaint.category}
                </span>
              </div>

              <p className="text-gray-700 mb-3">{complaint.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                {complaint.order_amount && (
                  <div>
                    <span className="font-semibold">Amount:</span> ${parseFloat(complaint.order_amount).toFixed(2)}
                  </div>
                )}
                {complaint.order_date && (
                  <div>
                    <span className="font-semibold">Order Date:</span> {complaint.order_date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
