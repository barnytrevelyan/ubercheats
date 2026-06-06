import Head from 'next/head'
import Link from 'next/link'
import { fetchComplaint } from '../../lib/supabase'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubercheats.info'

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function getServerSideProps({ params }) {
  try {
    const complaint = await fetchComplaint(params.id)
    return { props: { complaint } }
  } catch {
    return { notFound: true }
  }
}

export default function ComplaintPage({ complaint }) {
  const canonicalUrl = `${SITE_URL}/complaints/${complaint.id}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Complaint',
    name: complaint.title,
    description: complaint.description,
    dateCreated: complaint.created_at,
    author: { '@type': 'Person', name: complaint.name },
    about: {
      '@type': 'Organization',
      name: 'Uber Technologies Inc.',
    },
    url: canonicalUrl,
  }

  const allImages = [
    ...(complaint.file_urls || []),
    ...(complaint.updates || []).flatMap((u) => u.file_urls || []),
  ]

  return (
    <>
      <Head>
        <title>{complaint.title} — UberCheats</title>
        <meta
          name="description"
          content={`${complaint.category}: ${complaint.description.slice(0, 155)}…`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${complaint.title} — UberCheats`} />
        <meta
          property="og:description"
          content={complaint.description.slice(0, 200)}
        />
        {allImages[0] && <meta property="og:image" content={allImages[0]} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="hover:underline font-bold text-base">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <Link href="/?tab=view" className="hover:underline text-gray-300">Cases</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400 truncate max-w-xs">{complaint.title}</span>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6">
          {/* Header */}
          <article>
            <header className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {complaint.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{complaint.title}</h1>
              <div className="text-sm text-gray-500 flex flex-wrap gap-4">
                <span>Reported by <strong className="text-gray-700">{complaint.name}</strong></span>
                <span>{formatDate(complaint.created_at)}</span>
                {complaint.order_date && <span>Order date: {formatDate(complaint.order_date)}</span>}
              </div>
            </header>

            {/* Financial details */}
            {(complaint.order_amount || complaint.uber_order_number) && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-wrap gap-6 text-sm">
                {complaint.order_amount && (
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold mb-1">Amount disputed</div>
                    <div className="text-lg font-bold text-gray-900">
                      {complaint.order_currency || 'USD'} {parseFloat(complaint.order_amount).toFixed(2)}
                    </div>
                    {complaint.order_amount_usd && complaint.order_currency !== 'USD' && (
                      <div className="text-gray-500 text-xs">≈ USD ${parseFloat(complaint.order_amount_usd).toFixed(2)}</div>
                    )}
                  </div>
                )}
                {complaint.uber_order_number && (
                  <div>
                    <div className="text-gray-500 text-xs uppercase font-semibold mb-1">Uber Order #</div>
                    <div className="font-mono text-gray-800">{complaint.uber_order_number}</div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">What happened</h2>
              <div className="prose prose-gray max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {complaint.description}
              </div>
            </section>

            {/* Original evidence photos */}
            {complaint.file_urls && complaint.file_urls.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Evidence</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {complaint.file_urls.map((url, i) =>
                    url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt={`Evidence ${i + 1}`} className="w-full h-40 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition" />
                      </a>
                    ) : (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition">
                        📎 Document {i + 1}
                      </a>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Updates */}
            {complaint.updates && complaint.updates.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Updates ({complaint.updates.length})
                </h2>
                <div className="space-y-4 border-l-2 border-blue-200 pl-4">
                  {complaint.updates.map((update) => (
                    <div key={update.id} className="bg-blue-50 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-2">{formatDate(update.created_at)}</div>
                      {update.update_text && (
                        <p className="text-gray-700 whitespace-pre-wrap text-sm">{update.update_text}</p>
                      )}
                      {update.file_urls && update.file_urls.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {update.file_urls.map((url, i) =>
                            url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                <img src={url} alt={`Update photo ${i + 1}`} className="w-full h-32 object-cover rounded border border-gray-200 hover:opacity-90 transition" />
                              </a>
                            ) : (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                                className="text-sm text-blue-600 underline">
                                📎 Attachment {i + 1}
                              </a>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* CTA */}
          <div className="mt-10 p-5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-800 mb-1">Is this your case?</p>
              <p>Sign in with your email to add updates, photos, or new evidence.</p>
            </div>
            <Link
              href="/my-complaints"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition whitespace-nowrap"
            >
              Manage my case
            </Link>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 underline">
              ← Back to all cases
            </Link>
          </div>
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12 text-sm">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
