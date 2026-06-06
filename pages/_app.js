import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
