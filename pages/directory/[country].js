import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubercheats.info'

export async function getServerSideProps({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: country } = await supabase
    .from('countries')
    .select('*, regions(name, slug)')
    .eq('slug', params.country)
    .single()

  if (!country) return { notFound: true }

  const { data: entries } = await supabase
    .from('directory_entries')
    .select('*')
    .eq('country_id', country.id)
    .eq('verified', true)
    .order('section')
    .order('display_order')

  return {
    props: {
      country,
      executives:      (entries || []).filter(e => e.section === 'executive'),
      paymentPartners: (entries || []).filter(e => e.section === 'payment_partner'),
      regulators:      (entries || []).filter(e => e.section === 'regulator'),
    },
  }
}

// ── Email template generator ─────────────────────────────────
function emailTemplate(country) {
  return `Subject: Formal Complaint — Unresolved Uber Eats Refund

Dear [Executive Name / Support Team],

I am writing to formally document an unresolved billing dispute with Uber Eats in ${country.name}.

Transaction details:
- Date: [DATE]
- Amount: [AMOUNT] ${country.currency_code || ''}
- Order/Reference number: [ORDER NUMBER]
- Issue: [Brief description — e.g., "Order cancelled but full amount deducted. No refund issued after 14 days."]

I have attached evidence (screenshots) to support this claim.

I am giving Uber Eats 7 days to resolve this before filing a formal complaint with:
${country.name === 'United Kingdom' ? '- The Financial Conduct Authority (FCA)\n- The Competition and Markets Authority (CMA)' : '- My national consumer protection authority\n- My payment provider / bank (chargeback)'}

Please confirm receipt of this message and provide a resolution timeline.

Yours sincerely,
[YOUR NAME]
[YOUR EMAIL]`
}

// ── Section table ─────────────────────────────────────────────
function EntryTable({ entries, emptyMessage }) {
  if (!entries.length) return <p className="text-sm text-gray-500 italic py-3">{emptyMessage}</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <th className="px-3 py-2 border border-gray-200 w-1/4">Role / Type</th>
            <th className="px-3 py-2 border border-gray-200 w-1/4">Name / Organisation</th>
            <th className="px-3 py-2 border border-gray-200">Notes & Action</th>
            <th className="px-3 py-2 border border-gray-200 w-24">Link</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id} className="hover:bg-gray-50 align-top">
              <td className="px-3 py-3 border border-gray-200 font-medium text-gray-700">{e.role_or_type}</td>
              <td className="px-3 py-3 border border-gray-200 font-semibold text-gray-900">{e.name}</td>
              <td className="px-3 py-3 border border-gray-200 text-gray-600 leading-relaxed">{e.notes}</td>
              <td className="px-3 py-3 border border-gray-200">
                {e.contact_url ? (
                  <a href={e.contact_url} target="_blank" rel="noopener noreferrer"
                    className="inline-block text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded">
                    Visit →
                  </a>
                ) : <span className="text-gray-300">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Contribute form ───────────────────────────────────────────
function ContributeForm({ countrySlug, countryName }) {
  const [form, setForm] = useState({
    section: 'executive', role_or_type: '', name: '', notes: '', contact_url: '', source_url: '', submitted_by_email: '',
  })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const res = await fetch('/api/directory/contributions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country_slug: countrySlug, ...form }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
      ✅ Thanks! Your contribution has been submitted and will appear after review.
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Section *</label>
          <select value={form.section} onChange={e => set('section', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="executive">Executive / Manager</option>
            <option value="payment_partner">Payment Partner</option>
            <option value="regulator">Regulator / Agency</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Role or Type *</label>
          <input value={form.role_or_type} onChange={e => set('role_or_type', e.target.value)}
            placeholder="e.g. Country Manager, Consumer Regulator"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Name / Organisation *</label>
        <input required value={form.name} onChange={e => set('name', e.target.value)}
          placeholder="e.g. John Smith, Competition Authority"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Notes / Action instructions</label>
        <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
          rows={3} placeholder="How to use this contact. What to say. What they can do."
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Contact URL (LinkedIn, website)</label>
          <input value={form.contact_url} onChange={e => set('contact_url', e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Source URL (where you found this)</label>
          <input value={form.source_url} onChange={e => set('source_url', e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Your email (optional — only used to credit you)</label>
        <input type="email" value={form.submitted_by_email} onChange={e => set('submitted_by_email', e.target.value)}
          placeholder="your@email.com"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      {status === 'error' && <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'sending'}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-5 rounded-lg text-sm transition">
        {status === 'sending' ? 'Submitting…' : 'Submit contribution'}
      </button>
    </form>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function CountryPage({ country, executives, paymentPartners, regulators }) {
  const [showContribute, setShowContribute] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [copied, setCopied] = useState(false)
  const template = emailTemplate(country)
  const canonicalUrl = `${SITE_URL}/directory/${country.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${country.flag_emoji || ''} ${country.name} — Uber Eats Recourse Guide`,
    description: `How to dispute an Uber Eats charge in ${country.name}: executives, payment partners, and regulators.`,
    url: canonicalUrl,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(template)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Head>
        <title>{country.flag_emoji} {country.name} — Uber Eats Recourse Guide | UberCheats</title>
        <meta
          name="description"
          content={`How to get a refund from Uber Eats in ${country.name}. Find the relevant executives, payment dispute routes, and consumer protection agencies.`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${country.name} — Uber Eats Recourse Guide`} />
        <meta property="og:description" content={`Country-specific guide to disputing Uber Eats charges in ${country.name}.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-white">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:underline font-bold text-base">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <Link href="/directory" className="hover:underline text-gray-300">Directory</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">{country.flag_emoji} {country.name}</span>
          </div>
        </nav>

        <header className="bg-gray-800 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-5xl mb-3">{country.flag_emoji || '🌍'}</div>
            <h1 className="text-3xl font-bold mb-1">Uber Eats Recourse Guide: {country.name}</h1>
            <p className="text-gray-300 text-sm">
              {country.regions?.name} &nbsp;·&nbsp; Currency: {country.currency_code}
            </p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-10 sm:px-6 space-y-12">

          {/* Quick action bar */}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowTemplate(v => !v)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">
              📋 Copy complaint template
            </button>
            <Link href={`/?tab=report`}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition">
              📝 Submit a case
            </Link>
            <button onClick={() => setShowContribute(v => !v)}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-lg transition">
              ✏️ Contribute to this page
            </button>
          </div>

          {/* Email template */}
          {showTemplate && (
            <section className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-gray-800">📋 Complaint email template — {country.name}</h2>
                <button onClick={handleCopy}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                  {copied ? '✅ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono bg-white border border-blue-100 rounded p-4 leading-relaxed">
                {template}
              </pre>
              <p className="text-xs text-gray-500 mt-2">Replace the [bracketed] placeholders with your own details.</p>
            </section>
          )}

          {/* Part A: Executives */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👔</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Part A: Escalation Ladder</h2>
                <p className="text-sm text-gray-500">Executives who respond to reputational and regulatory pressure</p>
              </div>
            </div>
            <EntryTable entries={executives} emptyMessage={`No executive data yet for ${country.name}. Be the first to contribute.`} />
          </section>

          {/* Part B: Payment Partners */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💳</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Part B: Financial Dispute Routes</h2>
                <p className="text-sm text-gray-500">Payment processors and how to dispute charges directly</p>
              </div>
            </div>
            <EntryTable entries={paymentPartners} emptyMessage={`No payment data yet for ${country.name}.`} />
          </section>

          {/* Part C: Regulators */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Part C: Regulatory Authorities</h2>
                <p className="text-sm text-gray-500">Official bodies that can investigate, fine, and compel refunds</p>
              </div>
            </div>
            <EntryTable entries={regulators} emptyMessage={`No regulator data yet for ${country.name}.`} />
          </section>

          {/* Contribute form */}
          <section id="contribute" className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setShowContribute(v => !v)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div>
                <h2 className="font-bold text-gray-800">✏️ Contribute to this page</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Know the current Country Manager? A regulator contact? Submit it — all contributions are reviewed before going live.
                </p>
              </div>
              <span className="text-gray-400 text-xl">{showContribute ? '▲' : '▼'}</span>
            </button>
            {showContribute && (
              <div className="px-5 pb-6 border-t border-gray-200 pt-4">
                <ContributeForm countrySlug={country.slug} countryName={country.name} />
              </div>
            )}
          </section>

          {/* Legal disclaimer */}
          <section className="p-4 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500">
            <strong>Legal notice:</strong> All information on this page is sourced from publicly available records.
            No private phone numbers or home addresses are listed. This page is for consumer education only.
            UberCheats is not affiliated with, authorized, or endorsed by Uber Technologies, Inc.
            All trademarks belong to their respective owners.
          </section>

          {/* Browse other countries */}
          <div className="text-center">
            <Link href="/directory" className="text-sm text-blue-600 hover:underline">
              ← Browse all countries
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
