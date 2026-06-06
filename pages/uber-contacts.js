import Head from 'next/head'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

// ── Verified social account data ────────────────────────────
// All handles verified June 2026 via direct search and platform confirmation.
// ⚡ = most effective for public complaint escalation

const GLOBAL_ACCOUNTS = {
  uber: {
    label: 'Uber (Corporate)',
    color: 'black',
    note: 'Uber\'s main corporate brand accounts',
    accounts: [
      { platform: 'X / Twitter', handle: '@Uber_Support', url: 'https://x.com/Uber_Support', badge: '⚡ Best for complaints', note: 'Public tweets get rapid responses. DM for private escalation. Monitored daily.' },
      { platform: 'X / Twitter', handle: '@Uber', url: 'https://x.com/Uber', note: 'Corporate brand account. Tag in tweets for visibility.' },
      { platform: 'Instagram', handle: '@uber', url: 'https://www.instagram.com/uber/', note: 'Corporate Instagram — DM or comment on posts.' },
      { platform: 'Facebook', handle: 'Uber', url: 'https://www.facebook.com/uber', note: 'Use the "Send Message" button or comment on recent posts.' },
      { platform: 'TikTok', handle: '@uber', url: 'https://www.tiktok.com/@uber', note: '2.7M followers. Comment on recent videos for public visibility.' },
      { platform: 'LinkedIn', handle: 'Uber', url: 'https://www.linkedin.com/company/uber-com', note: 'Best for executive-level escalation. Connect with and message regional managers.' },
      { platform: 'YouTube', handle: 'Uber', url: 'https://www.youtube.com/channel/UCgnxoUwDmmyzeigmmcf0hZA', note: 'Comment on recent videos for public pressure.' },
    ],
  },
  ubereats: {
    label: 'Uber Eats',
    color: 'green',
    note: 'Uber Eats brand accounts — most relevant for food delivery disputes',
    accounts: [
      { platform: 'X / Twitter', handle: '@UberEats', url: 'https://x.com/UberEats', badge: '⚡ Tag in complaints', note: 'Public mentions are monitored. Tag @UberEats and @Uber_Support together for best results.' },
      { platform: 'Instagram', handle: '@ubereats', url: 'https://www.instagram.com/ubereats/', note: 'DM or comment. Works best with screenshots attached.' },
      { platform: 'Facebook', handle: 'Uber Eats', url: 'https://www.facebook.com/UberEats/', note: '3.4M followers. Post on timeline or send a direct message.' },
      { platform: 'LinkedIn', handle: 'Uber Eats', url: 'https://www.linkedin.com/company/ubereat', note: 'Use for executive escalation to regional managers.' },
    ],
  },
}

const REGIONAL_ACCOUNTS = [
  {
    region: '🇬🇧 United Kingdom & Ireland',
    accounts: [
      { platform: 'X / Twitter', handle: '@ubereats_uk', url: 'https://x.com/ubereats_uk', badge: '⚡ Primary UK escalation' },
      { platform: 'X / Twitter', handle: '@UberUKI_Support', url: 'https://x.com/uberuki_support', note: 'UK & Ireland support handle' },
    ],
  },
  {
    region: '🇰🇪 Kenya',
    accounts: [
      { platform: 'X / Twitter', handle: '@uber_kenya', url: 'https://x.com/uber_kenya', badge: '⚡ Primary Kenya escalation' },
      { platform: 'X / Twitter', handle: '@UberEATS_Kenya', url: 'https://x.com/UberEATS_Kenya', note: 'Uber Eats Kenya–specific handle' },
      { platform: 'Instagram', handle: '@uber_kenya', url: 'https://www.instagram.com/uber_kenya/', },
    ],
  },
  {
    region: '🇮🇳 India',
    accounts: [
      { platform: 'X / Twitter', handle: '@Uber_India', url: 'https://x.com/Uber_India', badge: '⚡ Primary India escalation' },
      { platform: 'X / Twitter', handle: '@UberIN_Support', url: 'https://x.com/uberin_support', note: 'India, Sri Lanka & Bangladesh support' },
    ],
  },
  {
    region: '🇦🇺 Australia',
    accounts: [
      { platform: 'Instagram', handle: '@ubereats_aus', url: 'https://www.instagram.com/ubereats_aus/', badge: '⚡ Primary AU escalation' },
      { platform: 'Instagram', handle: '@uber_australia', url: 'https://www.instagram.com/uber_australia/' },
    ],
  },
  {
    region: '🇿🇦 South Africa',
    accounts: [
      { platform: 'X / Twitter', handle: '@Uber_RSA', url: 'https://x.com/uber_rsa', badge: '⚡ Primary SA escalation' },
      { platform: 'Instagram', handle: '@ubereats_za', url: 'https://www.instagram.com/ubereats_za/' },
    ],
  },
  {
    region: '🌎 Latin America',
    accounts: [
      { platform: 'Instagram', handle: '@ubereatslatam', url: 'https://www.instagram.com/ubereatslatam/', badge: '⚡ LATAM regional account' },
    ],
  },
]

const PLATFORM_ICONS = {
  'X / Twitter': '𝕏',
  'Instagram': '📷',
  'Facebook': '📘',
  'TikTok': '🎵',
  'LinkedIn': '💼',
  'YouTube': '▶️',
}

function AccountRow({ acc }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-xl w-6 text-center shrink-0">{PLATFORM_ICONS[acc.platform] || '🔗'}</span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <a href={acc.url} target="_blank" rel="noopener noreferrer"
            className="font-semibold text-blue-700 hover:underline">
            {acc.handle}
          </a>
          <span className="text-xs text-gray-400">{acc.platform}</span>
          {acc.badge && (
            <span className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">
              {acc.badge}
            </span>
          )}
        </div>
        {acc.note && <p className="text-xs text-gray-500 mt-0.5">{acc.note}</p>}
      </div>
      <a href={acc.url} target="_blank" rel="noopener noreferrer"
        className="shrink-0 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition">
        Visit →
      </a>
    </div>
  )
}

export default function UberContacts() {
  return (
    <>
      <Head>
        <title>Uber & Uber Eats Social Media Contacts — UberCheats</title>
        <meta
          name="description"
          content="All verified Uber and Uber Eats social media accounts — global and regional. Use these to publicly escalate billing disputes and get faster responses."
        />
        <link rel="canonical" href={`${SITE_URL}/uber-contacts`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Uber & Uber Eats Social Media Contacts',
          description: 'Verified Uber and Uber Eats social media accounts for consumer escalation',
          url: `${SITE_URL}/uber-contacts`,
        }) }} />
      </Head>

      <div className="min-h-screen bg-white">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="font-bold text-base hover:underline">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <Link href="/directory" className="text-gray-300 hover:underline">Directory</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Social Media Contacts</span>
          </div>
        </nav>

        <header className="bg-gray-900 text-white py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-4xl mb-3">📱</div>
            <h1 className="text-3xl font-bold mb-2">Uber & Uber Eats Social Media Contacts</h1>
            <p className="text-gray-300 max-w-2xl">
              Public social media escalation is often more effective than in-app support.
              Accounts marked <span className="bg-green-800 text-green-100 text-xs font-semibold px-1.5 py-0.5 rounded-full">⚡ Best for complaints</span> have the highest response rates.
              All handles verified June 2026.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6 space-y-10">

          {/* Strategy tip */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>💡 Escalation strategy:</strong> The most effective public escalation is a tweet tagging{' '}
            <a href="https://x.com/UberEats" target="_blank" rel="noopener noreferrer" className="underline">@UberEats</a>,{' '}
            <a href="https://x.com/Uber_Support" target="_blank" rel="noopener noreferrer" className="underline">@Uber_Support</a>,
            and your regional account simultaneously — include your order reference, amount, and a screenshot.
            Public posts with evidence are prioritised over private support tickets.
          </div>

          {/* Global accounts */}
          {Object.values(GLOBAL_ACCOUNTS).map(brand => (
            <section key={brand.label}>
              <div className="mb-3">
                <h2 className="text-xl font-bold text-gray-900">{brand.label}</h2>
                <p className="text-sm text-gray-500">{brand.note}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 divide-y divide-gray-100">
                {brand.accounts.map(acc => <AccountRow key={acc.handle} acc={acc} />)}
              </div>
            </section>
          ))}

          {/* Regional accounts */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Regional Accounts</h2>
            <p className="text-sm text-gray-500 mb-4">Country and region-specific handles — often more responsive to local issues than global accounts.</p>
            <div className="space-y-5">
              {REGIONAL_ACCOUNTS.map(region => (
                <div key={region.region} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 font-semibold text-gray-700 text-sm border-b border-gray-200">
                    {region.region}
                  </div>
                  <div className="px-4 divide-y divide-gray-100">
                    {region.accounts.map(acc => <AccountRow key={acc.handle} acc={acc} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Missing your country */}
          <section className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
            <h3 className="font-bold text-gray-800 mb-1">Missing a regional account?</h3>
            <p className="text-gray-700">
              Know an official Uber or Uber Eats social account for your country that isn&apos;t listed?
              Submit it via the{' '}
              <Link href="/directory" className="text-blue-700 underline">country directory page</Link>{' '}
              using the Contribute button. All submissions are reviewed before going live.
            </p>
          </section>

          {/* Legal */}
          <p className="text-xs text-gray-400">
            All handles listed here are publicly available official accounts. UberCheats is not affiliated with Uber Technologies, Inc.
            Verified June 2026 — handles may change; check platform profiles for the most current information.
          </p>

          <div className="text-center">
            <Link href="/directory" className="text-sm text-blue-600 hover:underline">← Back to Global Directory</Link>
          </div>
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12 text-sm">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
