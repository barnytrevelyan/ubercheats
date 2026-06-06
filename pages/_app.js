import { useState } from 'react'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '../components/CookieConsent'

export default function MyApp({ Component, pageProps }) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Component {...pageProps} />
      <CookieConsent onConsent={setAnalyticsEnabled} />
      {analyticsEnabled && <Analytics />}
    </>
  )
}
