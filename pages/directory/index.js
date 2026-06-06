import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

const REGION_ORDER = ['Africa','Asia Pacific','Europe','Latin America','Middle East','North America']

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const { data } = await supabase
    .from('countries')
    .select('*, regions(name, slug)')
    .order('name')

  return { props: { countries: data || [] } }
}

export default function DirectoryIndex({ countries }) {
  // Group by region
  const byRegion = {}
  for (const c of countries) {
    const r = c.regions?.name || 'Other'
    if (!byRegion[r]) byRegion[r] = []
    byRegion[r].push(c)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UberCheats Global Recourse Directory',
    description: 'Country-by-country consumer recourse guide for Uber Eats billing disputes',
    numberOfItems: countries.length,
    itemListElement: countries.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.flag_emoji || ''} ${c.name} — Uber Eats Recourse Guide`,
      url: `${SITE_URL}/directory/${c.slug}`,
    })),
  }

  return (
    <>
      <Head>
        <title>Global Recourse Directory — UberCheats</title>
        <meta
          name="description"
          content="Country-by-country guide to getting your money back from Uber Eats. Find local executives, regulators, payment dispute routes, and consumer protection agencies for 24+ countries."
        />
        <link rel="canonical" href={`${SITE_URL}/directory`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-white">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-6xl mx-auto flex items-center gap-2">
            <Link href="/" className="hover:underline font-bold text-base">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Global Directory</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gray-900 text-white py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-4xl mb-3">🌍</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Global Recourse Directory</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Select your country to find the executives, payment dispute routes, and regulatory bodies
              that can actually get your money back from Uber Eats.
            </p>
          </div>
        </div>

        <main id="main-content" className="max-w-6xl mx-auto px-4 py-12 sm:px-6">

          {/* How it works */}
          <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            {[
              { icon: '👔', title: 'Part A: Escalation Ladder', desc: 'Country Managers and regional executives who respond to public reputation pressure.' },
              { icon: '💳', title: 'Part B: Payment Partners', desc: 'The financial infrastructure Uber uses in your country — and how to dispute charges through it.' },
              { icon: '🏛️', title: 'Part C: Regulators', desc: 'Official government bodies that can investigate, fine, and compel refunds.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-5 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="font-semibold text-gray-800 mb-1">{title}</div>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </section>

          {/* Social media shortcut */}
          <div className="mb-10 flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl">
            <div>
              <p className="font-semibold text-sm">📱 Need Uber&apos;s social media accounts?</p>
              <p className="text-xs text-gray-400 mt-0.5">All verified global + regional handles for public complaint escalation</p>
            </div>
            <Link href="/uber-contacts"
              className="shrink-0 ml-4 bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              View all →
            </Link>
          </div>

          {/* Country list by region */}
          {REGION_ORDER.filter(r => byRegion[r]).map(region => (
            <section key={region} className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{region}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byRegion[region].map(c => (
                  <Link
                    key={c.slug}
                    href={`/directory/${c.slug}`}
                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                  >
                    <span className="text-2xl">{c.flag_emoji || '🏳️'}</span>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{c.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* Contribute CTA */}
          <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="font-bold text-gray-800 mb-1">Your country missing or out of date?</h2>
            <p className="text-sm text-gray-700 mb-3">
              This is a community-driven directory. If you know the current Country Manager, a local regulator,
              or payment dispute route — contribute it. All submissions are reviewed before going live.
            </p>
            <p className="text-sm text-gray-600">
              Click into any country page and use the <strong>Contribute to this page</strong> button at the bottom.
            </p>
          </section>

          {/* Legal disclaimer */}
          <section className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500">
            <strong>Legal notice:</strong> All executive names and contact routes listed here are sourced from publicly
            available corporate announcements, LinkedIn, and government registries. No private phone numbers or home
            addresses are listed. UberCheats is an independent consumer advocacy platform and is not affiliated with,
            authorized, or endorsed by Uber Technologies, Inc.
          </section>
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12 text-sm">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
