import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent({ onConsent }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (!stored) setVisible(true)
    else onConsent(stored === 'accepted')
  }, [])

  const handleChoice = (accepted) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined')
    setVisible(false)
    onConsent(accepted)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-4 shadow-2xl border-t border-gray-700">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-300">
          <strong className="text-white">Cookies:</strong> We use Vercel Analytics to count page visits (no personal data stored).
          See our <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => handleChoice(false)}
            className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition text-gray-300">
            Decline
          </button>
          <button onClick={() => handleChoice(true)}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
