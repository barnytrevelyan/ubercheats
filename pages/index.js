import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import BRAND from '../config/brand.config'
import ComplaintForm from '../components/ComplaintForm'
import ComplaintList from '../components/ComplaintList'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || BRAND.domain

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND.name,
      description: BRAND.jsonLd.websiteDescription,
      potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
      description: BRAND.jsonLd.orgDescription,
    },
    {
      '@type': 'FAQPage',
      mainEntity: BRAND.faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

function StatsBar() {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
  }, [])
  const fmt = (n) => n?.toLocaleString() ?? '—'
  const fmtUSD = (n) => n ? `$${n.toLocaleString()}` : '—'
  return (
    <div className={BRAND.theme.statsBg}>
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-white">
        <div>
          <div className="text-2xl font-black">{fmt(stats?.totalCases)}</div>
          <div className={`${BRAND.theme.statsText} text-xs uppercase tracking-wide font-semibold`}>
            {stats?.totalCases === 1 ? 'Case documented' : 'Cases documented'}
          </div>
        </div>
        <div>
          <div className="text-2xl font-black">{fmtUSD(stats?.totalUSD)}</div>
          <div className={`${BRAND.theme.statsText} text-xs uppercase tracking-wide font-semibold`}>USD disputed</div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-2xl font-black">{fmt(stats?.resolvedCases)}</div>
          <div className={`${BRAND.theme.statsText} text-xs uppercase tracking-wide font-semibold`}>
            {stats?.resolvedCases === 1 ? 'Case resolved' : 'Cases resolved'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('report')
  const [refreshKey, setRefreshKey] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [selectedFormCategory, setSelectedFormCategory] = useState('')

  const handleSubmitSuccess = () => {
    setRefreshKey(prev => prev + 1)
    setTimeout(() => setActiveTab('view'), 1000)
  }

  return (
    <>
      <Head>
        <title>{BRAND.meta.homeTitle}</title>
        <meta name="description" content={BRAND.meta.homeDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={BRAND.meta.homeTitle} />
        <meta property="og:description" content={BRAND.meta.homeDescription} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Nav */}
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <Link href="/" className="font-black text-lg tracking-tight shrink-0 hover:text-gray-200 transition">{BRAND.name}</Link>
            <div className="flex items-center flex-wrap justify-end gap-x-4 gap-y-1 text-gray-300 text-xs">
              <Link href="/directory" className="hover:text-white transition whitespace-nowrap">🌍 Directory</Link>
              <Link href="/guide" className="hover:text-white transition whitespace-nowrap">📖 Guide</Link>
              <Link href="/legal" className="hover:text-white transition whitespace-nowrap">⚖️ Legal</Link>
              <Link href={`/${BRAND.contactsPageSlug}`} className="hover:text-white transition whitespace-nowrap hidden sm:inline">📱 Contacts</Link>
              <Link href="/my-complaints" className="hover:text-white transition whitespace-nowrap hidden md:inline">My Cases</Link>
            </div>
          </div>
        </nav>

        <StatsBar />

        {/* Hero */}
        <header className="relative overflow-hidden bg-gray-900 min-h-[420px] flex items-center">
          <img
            src={BRAND.hero.imageUrl}
            alt={BRAND.hero.imageAlt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${heroLoaded ? 'opacity-35' : 'opacity-0'}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/60" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-red-700/30 border border-red-600/40 text-red-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                {BRAND.hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {BRAND.hero.headline}<br />
                <span className={BRAND.theme.accentText}>{BRAND.hero.subheadline}</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{BRAND.hero.body}</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button onClick={() => setActiveTab('report')} className={`${BRAND.theme.primaryBtn} text-white font-bold px-6 py-3 rounded-lg transition text-sm`}>
                  📝 Report your case
                </button>
                <Link href="/guide" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition text-sm border border-white/20">
                  📖 How to get your money back
                </Link>
                <Link href="/directory" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition text-sm border border-white/20">
                  🌍 Your country&apos;s recourse options
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Alert banner */}
        <div className={`${BRAND.theme.alertBg} border-b px-4 py-3`}>
          <div className="max-w-6xl mx-auto flex items-start gap-3 text-sm">
            <span className={`${BRAND.theme.alertText} text-base shrink-0 mt-0.5`}>⚖️</span>
            <p className={BRAND.theme.alertText}>
              <strong>Legal update:</strong> {BRAND.alertBanner.text}{' '}
              <Link href={BRAND.alertBanner.linkHref} className="underline font-semibold">{BRAND.alertBanner.linkText}</Link>
            </p>
          </div>
        </div>

        <main id="main-content" className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
          {/* Category cards */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-gray-800 mb-4">What happened to you?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {BRAND.categories.map(cat => (
                <button key={cat.label} onClick={() => { setActiveTab('report'); setSelectedFormCategory(cat.label) }}
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:border-red-400 hover:shadow-sm transition text-left group">
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="text-xs font-bold text-gray-800 group-hover:text-red-700 leading-snug">{cat.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{cat.desc}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 border-b border-gray-200">
            {['report', 'view'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {tab === 'report' ? '📝 Report an Issue' : '🗂️ View All Cases'}
              </button>
            ))}
          </div>

          {activeTab === 'report' && (
            <div className="max-w-2xl">
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl">
                <h2 className="font-bold text-red-900 mb-2">Why document your case here?</h2>
                <ul className="text-sm text-red-800 space-y-1">
                  {BRAND.reportReasons.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <ComplaintForm onSubmitSuccess={handleSubmitSuccess} initialCategory={selectedFormCategory} />
            </div>
          )}

          {activeTab === 'view' && <ComplaintList key={refreshKey} categories={BRAND.categories.map(c => c.label)} />}

          {/* Pillars */}
          <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BRAND.pillars.map(p => (
              <div key={p.title} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 flex-1 mb-4">{p.desc}</p>
                <Link href={p.href} className="text-sm font-semibold text-red-600 hover:text-red-800 hover:underline">{p.cta} →</Link>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {BRAND.faq.map((item, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-gray-800 hover:bg-gray-50 list-none">
                    <span>{item.q}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3">▼</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>
                </details>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">More questions? Read the <Link href="/guide" className="text-red-600 underline">complete guide</Link>.</p>
          </section>

          {/* About */}
          <section className="mt-12 p-6 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
            <h2 className="font-bold text-gray-800 mb-2">About {BRAND.name}</h2>
            <p>{BRAND.about.body}</p>
          </section>
        </main>

        <footer className="bg-gray-900 text-gray-400 py-10 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm mb-8">
              <div>
                <div className="font-bold text-white mb-2">{BRAND.name}</div>
                <p className="text-xs text-gray-500">{BRAND.disclaimer.footer}</p>
              </div>
              <div>
                <div className="font-semibold text-gray-300 mb-2 text-xs uppercase tracking-wide">Resources</div>
                <ul className="space-y-1">
                  <li><Link href="/guide" className="hover:text-white transition">Refund Guide</Link></li>
                  <li><Link href="/legal" className="hover:text-white transition">Legal Tracker</Link></li>
                  <li><Link href="/directory" className="hover:text-white transition">Global Directory</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-300 mb-2 text-xs uppercase tracking-wide">Community</div>
                <ul className="space-y-1">
                  <li><Link href="/" className="hover:text-white transition">Report a Case</Link></li>
                  <li><Link href="/my-complaints" className="hover:text-white transition">Manage My Cases</Link></li>
                  <li><Link href={`/${BRAND.contactsPageSlug}`} className="hover:text-white transition">Contacts</Link></li>
                  <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-300 mb-2 text-xs uppercase tracking-wide">Legal</div>
                <ul className="space-y-1">
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">{BRAND.disclaimer.footer}</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-xs text-gray-600 text-center">
              {BRAND.name} &copy; {BRAND.foundedYear} &nbsp;|&nbsp; {BRAND.disclaimer.footer}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
