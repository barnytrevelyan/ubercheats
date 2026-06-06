import Head from 'next/head'
import Link from 'next/link'
import BRAND from '../config/brand.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || BRAND.domain

export default function Privacy() {
  const p = BRAND.privacy
  return (
    <>
      <Head>
        <title>Privacy Policy — {BRAND.name}</title>
        <meta name="description" content={`Privacy Policy for ${BRAND.name}. How we collect, use and protect your personal data.`} />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <Link href="/" className="font-black text-base hover:underline">{BRAND.name}</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Privacy Policy</span>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 space-y-8 text-gray-700">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: {p.lastUpdated}</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who we are</h2>
            <p><strong>{p.controllerName}</strong> is the data controller for personal data collected through this website. Contact us about privacy matters at: <a href={`mailto:${p.controllerContact}`} className="text-blue-600 underline">{p.controllerContact}</a>.</p>
            <p className="mt-2">This site is an independent consumer advocacy platform. It is not affiliated with {BRAND.targetCompany}.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. What data we collect and why</h2>
            <p className="mb-3">When you submit a complaint, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              {p.dataCollected.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="mt-3"><strong>Legal basis:</strong> {p.legalBasis}.</p>
            <p className="mt-2"><strong>Purpose:</strong> To create a public record of consumer disputes, help other affected users, and support regulatory and legal accountability.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. What is made public</h2>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
              <strong>Important:</strong> Your <strong>name</strong> and <strong>complaint description</strong> are displayed publicly on the site and may be indexed by search engines. Your <strong>email address</strong> is never displayed publicly. Do not include information in your complaint that you do not wish to be public.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data retention</h2>
            <p>{p.retentionPeriod}. You may request deletion of your complaint at any time — see section 7 (Your rights).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data processors (third parties)</h2>
            <p className="mb-3">We use the following third-party services to operate the site. All are bound by data processing agreements:</p>
            <div className="space-y-3">
              {p.dataProcessors.map((proc, i) => (
                <div key={i} className="p-3 bg-white border border-gray-200 rounded-lg text-sm">
                  <div className="font-semibold text-gray-900">{proc.name} — {proc.location}</div>
                  <div className="text-gray-600">{proc.purpose}</div>
                  <div className="text-gray-500 text-xs mt-1">Transfer mechanism: {proc.mechanism}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600">Data stored in Supabase (US) is transferred under Standard Contractual Clauses approved by the European Commission. Vercel (US) processes page requests under SCCs.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies and analytics</h2>
            {p.cookieTypes.map((cookie, i) => (
              <div key={i} className="p-3 bg-white border border-gray-200 rounded-lg text-sm mb-2">
                <div className="font-semibold">{cookie.name} ({cookie.type})</div>
                <div className="text-gray-600">{cookie.purpose}</div>
                <div className="text-gray-500 text-xs mt-1">{cookie.required ? 'Required for site operation' : 'Optional — requires your consent'}</div>
              </div>
            ))}
            <p className="text-sm text-gray-600 mt-2">You can accept or decline analytics cookies using the banner that appears when you first visit the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your rights</h2>
            <p className="mb-3">Under UK GDPR and EU GDPR you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate data</li>
              <li><strong>Delete</strong> your complaint and associated personal data — use the "Delete my case" option in <Link href="/my-complaints" className="text-blue-600 underline">My Cases</Link> or email {p.controllerContact}</li>
              <li><strong>Restrict</strong> processing in certain circumstances</li>
              <li><strong>Object</strong> to processing based on legitimate interests</li>
              <li><strong>Portability</strong> — receive your data in a structured format</li>
              <li><strong>Withdraw consent</strong> at any time — this does not affect prior processing</li>
            </ul>
            <p className="mt-3 text-sm">To exercise any right, email <a href={`mailto:${p.controllerContact}`} className="text-blue-600 underline">{p.controllerContact}</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Right to complain to a regulator</h2>
            <p className="text-sm">If you are in the UK, you have the right to complain to the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Information Commissioner's Office (ICO)</a>. For EU users, contact your national data protection authority.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to this policy</h2>
            <p className="text-sm">We will update this page if our practices change. The "last updated" date at the top will reflect any changes. Continued use of the site after changes constitutes acceptance.</p>
          </section>

          <div className="text-xs text-gray-400 pt-4 border-t border-gray-200">
            <Link href="/" className="text-blue-600 hover:underline">← Back to {BRAND.name}</Link>
          </div>
        </main>
      </div>
    </>
  )
}
