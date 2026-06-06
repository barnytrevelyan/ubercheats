import Head from 'next/head'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about`,
    name: 'About UberCheats',
    description: 'UberCheats is an independent consumer advocacy platform documenting Uber Eats refund failures and billing disputes worldwide.',
    publisher: {
      '@type': 'Organization',
      name: 'UberCheats',
      url: SITE_URL,
      foundingDate: '2026',
      areaServed: 'Worldwide',
      description: 'Independent consumer advocacy database for Uber billing disputes.',
    },
  }

  return (
    <>
      <Head>
        <title>About UberCheats — Independent Consumer Advocacy</title>
        <meta name="description" content="UberCheats is an independent, consumer-run platform documenting Uber Eats refund failures and billing disputes worldwide. Not affiliated with Uber Technologies." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="font-black text-base hover:underline">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">About</span>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-black text-gray-900 mb-2">About UberCheats</h1>
          <p className="text-gray-500 text-sm mb-10">Independent consumer advocacy · Worldwide · Founded 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">What is UberCheats?</h2>
              <p>
                UberCheats is an independent, consumer-run platform that documents Uber Eats refund failures, double
                charges, cancelled orders without refunds, and unresponsive customer service — worldwide. Every case
                submitted becomes a permanent, searchable public record.
              </p>
              <p>
                We exist because Uber&apos;s in-app support systematically fails to resolve legitimate billing disputes,
                leaving customers with no recourse. UberCheats gives those customers a voice, a paper trail, and a
                practical toolkit for getting their money back.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">What we offer</h2>
              <ul className="space-y-2 list-none">
                {[
                  ['📝 Case documentation', 'A permanent public record of your dispute, timestamped and searchable. You can add photos, updates, and mark it resolved when you succeed.'],
                  ['🌍 Global Recourse Directory', 'Country-specific guides covering local Uber executives, payment dispute routes (including mobile money gateways like Gladys and M-Pesa), and regulatory bodies across 40+ countries.'],
                  ['📖 Step-by-step refund guide', 'A practical escalation ladder from in-app dispute through to small claims court, with country-specific tips.'],
                  ['⚖️ Legal & regulatory tracker', 'A living record of government actions against Uber worldwide — including the FTC\'s 2025 lawsuit, New York\'s Attorney General suit, and Australia\'s ACCC $21M fine.'],
                  ['📱 Uber social media contacts', 'All verified global and regional Uber and Uber Eats social handles, with guidance on which accounts respond fastest to public complaints.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <span className="font-semibold text-gray-800 shrink-0">{title}:</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Our principles</h2>
              <ul className="space-y-2">
                <li><strong>Facts only.</strong> We document what happened — amounts, dates, reference numbers. We don&apos;t allow speculation or unverified claims.</li>
                <li><strong>Public records only.</strong> The executive and regulator directory uses only publicly available information from corporate announcements, LinkedIn, and government registries. No private contact details.</li>
                <li><strong>Community-maintained.</strong> The directory is crowdsourced. All community contributions are reviewed before going live.</li>
                <li><strong>No legal advice.</strong> We provide information and practical guidance. We are not a law firm and nothing here constitutes legal advice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Legal notice</h2>
              <p className="p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
                UberCheats is an independent consumer advocacy and educational platform. It is not affiliated with,
                authorised, or endorsed by Uber Technologies, Inc. or any of its subsidiaries. All registered
                trademarks belong to their respective owners. All user-submitted content represents the individual
                experience of the submitting user.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/guide" className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg text-sm hover:bg-red-700 transition">
              📖 Refund guide
            </Link>
            <Link href="/directory" className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg text-sm hover:bg-gray-900 transition">
              🌍 Global directory
            </Link>
            <Link href="/" className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition">
              📝 Report a case
            </Link>
          </div>
        </main>

        <footer className="bg-gray-900 text-gray-500 text-center py-6 mt-12 text-xs">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
