import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ComplaintForm from '../components/ComplaintForm'
import ComplaintList from '../components/ComplaintList'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubercheats.info'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'UberCheats',
      description:
        'Public database of Uber refund failures, double charges, and billing disputes. Document your case and help others affected by the same problems.',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'UberCheats',
      url: SITE_URL,
      description: 'Independent consumer advocacy database for Uber billing disputes.',
    },
  ],
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('report')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmitSuccess = () => {
    setRefreshKey((prev) => prev + 1)
    setTimeout(() => setActiveTab('view'), 1000)
  }

  return (
    <>
      <Head>
        <title>UberCheats — Uber Refund Failures &amp; Billing Disputes Database</title>
        <meta
          name="description"
          content="Public record of Uber refund failures, double charges, and unresolved billing disputes. Submit your case, browse documented complaints, and help hold Uber accountable."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="UberCheats — Uber Refund Failures & Billing Disputes" />
        <meta
          property="og:description"
          content="Public record of Uber refund failures, double charges, and unresolved billing disputes. Submit your case and help others."
        />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UberCheats — Uber Refund Failures & Billing Disputes" />
        <meta
          name="twitter:description"
          content="Public record of Uber refund failures, double charges, and unresolved billing disputes."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <header className="relative h-96 bg-gray-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop"
            alt="Documents and complaints"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">UberCheats</h1>
            <p className="text-lg text-gray-100 max-w-2xl">
              A public record of Uber refund and charging failures. Document your case, browse others, and help build evidence of systemic problems.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/directory"
                className="inline-block bg-white text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
              >
                🌍 Global Recourse Directory
              </Link>
              <Link
                href="/my-complaints"
                className="inline-block text-sm text-gray-300 underline hover:text-white transition self-center"
              >
                Already submitted? Manage your case →
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex gap-2 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-3 font-semibold transition duration-200 border-b-2 ${
                activeTab === 'report'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Report an Issue
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-3 font-semibold transition duration-200 border-b-2 ${
                activeTab === 'view'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              View Cases
            </button>
          </div>

          {activeTab === 'report' && (
            <div className="max-w-2xl">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="font-semibold text-blue-900 mb-2">Why Report Here?</h2>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Creates a permanent public record of Uber&apos;s refund failures</li>
                  <li>✓ Helps others facing the same problem find your case</li>
                  <li>✓ Builds evidence for potential collective or legal action</li>
                  <li>✓ You can add photos and updates to your case at any time</li>
                </ul>
              </div>
              <ComplaintForm onSubmitSuccess={handleSubmitSuccess} />
            </div>
          )}

          {activeTab === 'view' && <ComplaintList key={refreshKey} />}

          <section className="mt-12 p-6 bg-gray-100 rounded-lg text-sm text-gray-700">
            <h2 className="font-semibold mb-2">About UberCheats</h2>
            <p>
              UberCheats is an independent, consumer-run documentation of Uber service failures
              related to refunds and billing. This site exists because Uber systematically fails to
              resolve these issues. Every case submitted here becomes a permanent public record.
              Your story matters — it helps expose patterns and supports others in the same situation.
            </p>
            <p className="mt-2">
              Use the <Link href="/directory" className="text-blue-700 underline">Global Recourse Directory</Link> to
              find country-specific executives, payment dispute routes, and regulatory bodies.
            </p>
          </section>
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12 text-sm">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
          <p className="mt-1 text-gray-500 space-x-4">
            <Link href="/directory" className="hover:text-gray-300 underline">Global Directory</Link>
            <Link href="/my-complaints" className="hover:text-gray-300 underline">Manage your case</Link>
          </p>
        </footer>
      </div>
    </>
  )
}
