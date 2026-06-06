import Head from 'next/head'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

const CASES = [
  {
    id: 'ftc-2025',
    status: 'active',
    statusLabel: 'Active — Ongoing',
    statusColor: 'red',
    flag: '🇺🇸',
    jurisdiction: 'United States — Federal',
    title: 'FTC v. Uber Technologies, Inc.',
    authority: 'Federal Trade Commission + 21 States',
    filed: 'April 2025',
    updated: 'December 2025 (amended complaint)',
    summary: 'The FTC, joined by 21 US states, sued Uber for enrolling consumers in Uber One subscriptions without consent, charging them before free trials ended, failing to deliver promised $25/month savings while still charging hidden delivery fees, and making it nearly impossible to cancel despite "cancel anytime" claims.',
    allegations: [
      'Enrolling users in Uber One without explicit consent',
      'Charging subscribers before free trial periods ended',
      'Advertising "$0 delivery fee" while charging hidden delivery fees through service charges',
      'Routing cancellation attempts through "seemingly endless loops" to prevent cancellations',
      'Violations of the FTC Act and the Restore Online Shoppers\' Confidence Act (ROSCA)',
    ],
    outcome: 'Ongoing — case filed in US District Court for the Northern District of California. Amended complaint filed December 2025 expanding the allegations.',
    relevance: 'If you were charged for Uber One without consent or denied cancellation, file at reportfraud.ftc.gov — your complaint directly contributes to this case.',
    sources: [
      { label: 'FTC press release (April 2025)', url: 'https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-takes-action-against-uber-deceptive-billing-cancellation-practices' },
      { label: 'Amended complaint (December 2025)', url: 'https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-states-file-amended-complaint-against-uber-deceptive-billing-cancellation-practices' },
      { label: 'FTC case page', url: 'https://www.ftc.gov/legal-library/browse/cases-proceedings/2423092-uber-ftc-v' },
    ],
  },
  {
    id: 'ny-ag-2025',
    status: 'active',
    statusLabel: 'Active',
    statusColor: 'red',
    flag: '🇺🇸',
    jurisdiction: 'United States — New York State',
    title: 'NY Attorney General v. Uber — Subscription Trap',
    authority: 'New York State Attorney General (Letitia James)',
    filed: '2025',
    updated: '2025',
    summary: 'New York\'s Attorney General sued Uber separately for trapping customers in Uber One subscriptions, using misleading pop-ups claiming users would "save $25 every month" and making cancellation deliberately difficult.',
    allegations: [
      'Misleading pop-ups falsely claiming guaranteed $25/month savings',
      'Deceptive subscription sign-up flows targeting existing app users',
      'Deliberate obstruction of cancellation processes',
    ],
    outcome: 'Ongoing litigation.',
    relevance: 'New York consumers affected by Uber One billing can contact the NY AG office.',
    sources: [
      { label: 'NY AG press release', url: 'https://ag.ny.gov/press-release/2025/attorney-general-james-sues-uber-trapping-customers-costly-subscriptions' },
    ],
  },
  {
    id: 'accc-2024',
    status: 'resolved',
    statusLabel: 'Resolved — $21M penalty',
    statusColor: 'green',
    flag: '🇦🇺',
    jurisdiction: 'Australia — Federal',
    title: 'ACCC v. Uber — Misleading Consumers',
    authority: 'Australian Competition and Consumer Commission (ACCC)',
    filed: '2022–2024',
    updated: '2024 (penalty finalised)',
    summary: 'The ACCC took Uber to Federal Court for misleading Australian consumers with false cancellation fee warnings (falsely telling users they\'d be charged a fee when they wouldn\'t be) and inaccurate UberTAXI fare estimates. The Federal Court ordered Uber to pay $21 million.',
    allegations: [
      'False cancellation warning messages shown to over 2 million Australian consumers',
      'Misleading UberTAXI fare estimates (higher than actual metered fares)',
      'Breaches of the Australian Consumer Law',
    ],
    outcome: 'Federal Court ordered Uber to pay $21 million in penalties. Uber also committed to a compliance programme.',
    relevance: 'This establishes Uber\'s pattern of deceptive consumer practices in Australia. The ACCC has demonstrated willingness to act — file your complaint at accc.gov.au.',
    sources: [
      { label: 'ACCC media release — $21M penalty', url: 'https://www.accc.gov.au/media-release/uber-to-pay-21m-for-misleading-representations-about-uber-taxi-fares-and-cancellation-fees' },
      { label: 'ACCC media release — Uber Eats contracts', url: 'https://www.accc.gov.au/media-release/uber-eats-amends-its-contracts' },
    ],
  },
  {
    id: 'california-ab578',
    status: 'resolved',
    statusLabel: 'Law in force',
    statusColor: 'green',
    flag: '🇺🇸',
    jurisdiction: 'United States — California',
    title: 'California AB 578 — Mandatory Refunds for Undelivered Orders',
    authority: 'California State Legislature',
    filed: '2024 (enacted)',
    updated: '2024',
    summary: 'California passed Assembly Bill 578 requiring food delivery platforms including Uber Eats to provide full refunds when orders are never delivered or delivered incorrectly. Platforms must also display itemised fee breakdowns and provide real human customer service if automated responses fail to resolve a complaint.',
    allegations: [],
    outcome: 'Law enacted. California consumers are legally entitled to full refunds from Uber Eats for undelivered or incorrect orders — Uber has no discretion to refuse.',
    relevance: 'California consumers: if Uber Eats refuses your refund for an undelivered or wrong order, they are in violation of state law. File with the California AG.',
    sources: [],
  },
]

const STATUS_COLORS = {
  red: 'bg-red-100 text-red-800 border-red-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  amber: 'bg-amber-100 text-amber-800 border-amber-200',
}

export default function Legal() {
  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: 'Uber Legal & Regulatory Tracker — FTC Lawsuit, ACCC Fine',
          url: `${SITE_URL}/legal`,
          datePublished: '2025-04-01',
          dateModified: '2026-06-06',
          author: { '@type': 'Organization', name: 'UberCheats', url: SITE_URL },
          publisher: { '@type': 'Organization', name: 'UberCheats', url: SITE_URL },
        }) }} />
        <title>Uber Legal & Regulatory Tracker — FTC Lawsuit, ACCC Fine | UberCheats</title>
        <meta name="description" content="Tracker of regulatory actions and lawsuits against Uber: FTC v. Uber (2025), NY AG lawsuit, ACCC $21M fine, California AB 578. Know your rights." />
        <link rel="canonical" href={`${SITE_URL}/legal`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="font-black text-base hover:underline">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Legal & Regulatory Tracker</span>
          </div>
        </nav>

        <header className="relative bg-gray-900 text-white py-14 px-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop"
            alt="Legal documents and gavel"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black mb-3">⚖️ Legal & Regulatory Tracker</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              A living record of regulatory actions, lawsuits, and consumer protection orders against Uber worldwide.
              Use this to understand your rights and find the right authority to escalate to.
            </p>
          </div>
        </header>

        <main id="main-content" className="max-w-4xl mx-auto px-4 py-12 sm:px-6 space-y-8">

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
            <strong>Why this matters for your dispute:</strong> Regulators track patterns across thousands of complaints.
            Your individual report contributes to the aggregate evidence that triggers investigations, fines, and legislation.
            Links to each authority&apos;s complaint portal are included below.
          </div>

          {CASES.map(c => (
            <article key={c.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-xs text-gray-500 font-medium">{c.jurisdiction}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[c.statusColor]}`}>
                        {c.statusLabel}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-gray-900">{c.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {c.authority} &nbsp;·&nbsp; Filed: {c.filed}
                      {c.updated !== c.filed && ` · Updated: ${c.updated}`}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">{c.summary}</p>

                {c.allegations.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Key allegations</div>
                    <ul className="space-y-1">
                      {c.allegations.map((a, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-red-500 shrink-0 mt-0.5">•</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="font-semibold text-gray-700">Outcome: </span>
                  <span className="text-gray-600">{c.outcome}</span>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <span className="font-semibold">What this means for you: </span>
                  {c.relevance}
                </div>

                {c.sources.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.sources.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                        📄 {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}

          {/* Know your rights CTA */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/guide" className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-red-300 transition">
              <span className="text-3xl">📖</span>
              <div>
                <div className="font-bold text-gray-800">Step-by-step refund guide</div>
                <div className="text-sm text-gray-500">How to escalate your dispute effectively</div>
              </div>
            </Link>
            <Link href="/directory" className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-red-300 transition">
              <span className="text-3xl">🌍</span>
              <div>
                <div className="font-bold text-gray-800">Your country&apos;s regulators</div>
                <div className="text-sm text-gray-500">Direct links to file complaints in 40+ countries</div>
              </div>
            </Link>
          </section>

          {/* Contribute */}
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm">
            <h3 className="font-bold text-gray-800 mb-1">Know of a case not listed here?</h3>
            <p className="text-gray-700">
              If you know of a regulatory action, fine, court order, or class action against Uber in any country that isn&apos;t listed,
              please contribute it via the{' '}
              <Link href="/directory" className="text-blue-700 underline">Global Directory</Link>.
              This tracker is community-maintained and updated as new cases emerge.
            </p>
          </div>

          <p className="text-xs text-gray-400 text-center">
            All information sourced from official government and court records. Last updated June 2026.
            UberCheats is not a law firm — this is not legal advice.
          </p>
        </main>

        <footer className="bg-gray-900 text-gray-500 text-center py-6 mt-12 text-xs">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
