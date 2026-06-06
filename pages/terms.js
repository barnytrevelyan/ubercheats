import Head from 'next/head'
import Link from 'next/link'
import BRAND from '../config/brand.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || BRAND.domain

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — {BRAND.name}</title>
        <meta name="description" content={`Terms of Service for ${BRAND.name}.`} />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <Link href="/" className="font-black text-base hover:underline">{BRAND.name}</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Terms of Service</span>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 space-y-8 text-gray-700 text-sm leading-relaxed">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Terms of Service</h1>
            <p className="text-sm text-gray-500">Last updated: {BRAND.privacy?.lastUpdated || 'June 2026'}</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance</h2>
            <p>By using {BRAND.name} ("the Site") or submitting content, you agree to these Terms. If you do not agree, do not use the Site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. What the Site is</h2>
            <p>{BRAND.name} is an independent consumer advocacy and educational platform. It is not affiliated with, authorised, or endorsed by {BRAND.targetCompany}. Nothing on the Site constitutes legal, financial, or professional advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User-submitted content</h2>
            <p className="mb-2">When you submit a complaint, you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirm the content is a truthful, factual account of your own personal experience</li>
              <li>Confirm you have the right to submit any files or images uploaded</li>
              <li>Grant {BRAND.name} a non-exclusive, royalty-free licence to display, store, and distribute your submission for the purpose of public consumer advocacy</li>
              <li>Understand your name and complaint description will be publicly visible and may be indexed by search engines</li>
              <li>Acknowledge that submissions may be reviewed and, if found to violate these terms, removed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Prohibited content</h2>
            <p className="mb-2">You must not submit content that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Is false, fabricated, or knowingly misleading</li>
              <li>Contains personal information about third parties (e.g., names or contact details of customer service agents)</li>
              <li>Is defamatory, harassing, abusive, or discriminatory</li>
              <li>Infringes any copyright, trademark, or other intellectual property right</li>
              <li>Constitutes spam or is submitted for a commercial purpose unrelated to a genuine consumer dispute</li>
            </ul>
            <p className="mt-2">We reserve the right to remove content that violates these rules without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Age restriction</h2>
            <p>You must be at least 18 years old (or the age of majority in your jurisdiction) to submit content to this Site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intellectual property</h2>
            <p>The Site's design, code, and editorial content are owned by {BRAND.name}. The trademarks of {BRAND.targetCompany} are used under nominative fair use solely to identify the subject matter of consumer complaints and do not imply any endorsement, affiliation, or sponsorship.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Disclaimer of warranties</h2>
            <p>The Site and its content are provided "as is" without warranties of any kind. We do not warrant the accuracy, completeness, or currency of directory information (including executive names and regulatory contacts). Always verify information independently before acting on it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, {BRAND.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or reliance on any content, including user-submitted complaints or directory information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Not legal or financial advice</h2>
            <p>Nothing on this Site constitutes legal or financial advice. The escalation guides, regulatory information, and directory content are provided for general consumer education purposes only. You should seek independent professional advice for your specific situation. {BRAND.name} is not authorised or regulated by the Financial Conduct Authority.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Governing law</h2>
            <p>These Terms are governed by English law. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales, except where mandatory local consumer law in your country provides otherwise.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to these Terms</h2>
            <p>We may update these Terms. Continued use of the Site after changes constitutes acceptance. The "last updated" date at the top reflects the most recent revision.</p>
          </section>

          <div className="text-xs text-gray-400 pt-4 border-t border-gray-200 flex gap-4">
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            <Link href="/" className="text-blue-600 hover:underline">← Back to {BRAND.name}</Link>
          </div>
        </main>
      </div>
    </>
  )
}
