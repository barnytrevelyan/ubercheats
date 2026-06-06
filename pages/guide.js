import Head from 'next/head'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

const STEPS = [
  {
    n: '01',
    icon: '📝',
    title: 'Document your case',
    time: 'Do this first',
    color: 'blue',
    content: [
      'Before doing anything else, create a public record on UberCheats. This matters because it timestamps your complaint, creates verifiable evidence you can link to, and puts you on record before Uber can alter their version of events.',
      'Screenshot everything immediately: the original order confirmation, the charge on your bank statement, any in-app communications, and Uber\'s refusal to refund. These are your evidence.',
      'Include your Uber order number (format: UberEATS-XXXXXXXXX or similar) in your report — this is essential for any financial dispute.',
    ],
    action: { label: 'Submit your case now', href: '/' },
  },
  {
    n: '02',
    icon: '📱',
    title: 'In-app dispute (within 48 hours)',
    time: 'Do within 48 hours',
    color: 'orange',
    content: [
      'Your first step with Uber is always the in-app dispute. Go to the order in your Uber Eats app → "Help" → select the problem (missing item, wrong order, not delivered, etc.).',
      'Uber\'s refund policy technically requires you to report within 48 hours of delivery. Do this even if you expect to be refused — you need this paper trail for the chargeback.',
      'If the bot refuses or gives you only app credit instead of a cash refund: reply insisting on a cash refund to your original payment method. Keep the reference number of every support interaction.',
      'App credit is not a refund. Under consumer law in most jurisdictions, you are entitled to a cash refund for services not rendered.',
    ],
    tip: 'Screenshot the refusal. The exact wording Uber uses matters when you escalate to your bank.',
  },
  {
    n: '03',
    icon: '📣',
    title: 'Social media escalation',
    time: 'Same day as refusal',
    color: 'purple',
    content: [
      'A public tweet gets faster results than a private support ticket. Tag @UberEats and @Uber_Support simultaneously with your order reference number and a brief description. Include a screenshot if possible.',
      'Keep it factual and unemotional: "Order #XXXXXXXXX. Charged [amount]. Not delivered / wrong order / cancelled. Uber refused refund. I will be filing a chargeback if not resolved within 24 hours."',
      'Also try DM-ing @UberUKI_Support (UK), @uber_kenya (Kenya), @Uber_India (India) or your regional handle — see the Contacts page for all verified regional accounts.',
    ],
    action: { label: 'Find your regional Uber account', href: '/uber-contacts' },
    tip: 'Public posts with order references and amounts are escalated internally. Private tickets are routed to bots.',
  },
  {
    n: '04',
    icon: '💳',
    title: 'Bank chargeback',
    time: 'If unresolved after 5 days',
    color: 'green',
    content: [
      'A chargeback reverses the charge through your bank\'s dispute process. It is one of your strongest consumer rights and costs Uber money — they pay a chargeback fee regardless of outcome.',
      'Call the number on the back of your card or go to your bank app → Transactions → Dispute. You\'ll need: the transaction date, amount, merchant name ("Uber*Eats" or similar), your order number, and evidence Uber refused to refund.',
      'Timeframes: Visa and Mastercard give you 60–120 days from the transaction date. In the UK, Section 75 of the Consumer Credit Act covers credit card purchases over £100 and makes your bank jointly liable.',
      'Warning: some users have reported their Uber account being restricted after initiating a chargeback. Consider this before proceeding if you still use the platform.',
    ],
    tip: 'Use the phrase "services not rendered" or "item not received" when describing the dispute — these are the chargeback reason codes banks use.',
  },
  {
    n: '05',
    icon: '🏛️',
    title: 'Regulator complaint',
    time: 'After 2+ weeks unresolved',
    color: 'red',
    content: [
      'Filing with your national consumer protection authority puts Uber on formal legal notice. Companies are required to respond to government complaints within set timeframes (typically 10–30 days depending on jurisdiction).',
      'Key regulators by region: FTC (US), ACCC (Australia), CMA / Trading Standards (UK), CAK (Kenya), PROFECO (Mexico), PROCON / consumidor.gov.br (Brazil), SIC (Colombia), INDECOPI (Peru), DTI (Philippines).',
      'Find your country\'s full regulator list — including exact URLs — in the Global Directory.',
      'A regulator complaint also contributes to the official record that triggers investigations. The FTC\'s 2025 lawsuit against Uber was preceded by thousands of consumer complaints.',
    ],
    action: { label: 'Find your country\'s regulators', href: '/directory' },
  },
  {
    n: '06',
    icon: '⚖️',
    title: 'Small claims court',
    time: 'Nuclear option — highly effective',
    color: 'gray',
    content: [
      'Small claims court is the most underused and most effective escalation tool. Filing costs very little (usually $30–100), no lawyer is required, and Uber almost always settles before the hearing date.',
      'This works because: (1) Uber\'s legal cost of fighting a small claim exceeds most claim values, so settling is rational; (2) the public record of a filed claim damages their reputation and triggers legal obligations.',
      'UK: County Court (MCOL online) for claims up to £10,000. US: varies by state ($5,000–$10,000 typical). Australia: AFCA (financial disputes), State tribunals. Kenya: Magistrates\' Court consumer cases.',
      'Uber\'s terms of service include an arbitration clause in some markets. In the EU and UK this clause is unenforceable for consumer disputes. In the US, the FTC is actively challenging forced arbitration.',
    ],
    tip: 'Search "[your country] small claims court online" — most countries now have an online filing portal. The filing alone is often enough to trigger a settlement offer from Uber.',
  },
]

const COUNTRY_TIPS = [
  { flag: '🇬🇧', country: 'United Kingdom', tips: ['Section 75 Consumer Credit Act: your card issuer is jointly liable for purchases over £100 on credit cards.', 'The Financial Ombudsman Service (free) handles disputes if your bank refuses to chargeback.', 'Uber had its London operating licence refused twice by TfL (2017, 2019) before winning on appeal — the CMA monitors platform practices closely.'] },
  { flag: '🇰🇪', country: 'Kenya', tips: ['M-Pesa disputes: call Safaricom 0722 000 100, or contact Gladys (the Uber Eats payment gateway) at support@joingladys.com.', 'Competition Authority of Kenya (CAK) has jurisdiction over platform app practices.', 'Central Bank of Kenya regulates Gladys and M-Pesa — escalate unresolved payment disputes there.'] },
  { flag: '🇺🇸', country: 'United States', tips: ['FTC complaint at reportfraud.ftc.gov — your complaint directly contributes to the active FTC v. Uber case.', 'CFPB handles payment disputes and requires a company response within 15 days.', 'Small claims: many users report Uber settling before the hearing date. File in your home state — the filing itself often prompts a resolution offer.', 'California AB 578 (2024): Uber Eats must issue full refunds for undelivered orders — no discretion.'] },
  { flag: '🇦🇺', country: 'Australia', tips: ['The ACCC fined Uber $21M in 2024 for misleading cancellation fee warnings — demonstrating they are willing to act against Uber for deceptive practices.', 'Australian Consumer Law mandates refunds for services not provided.', 'AFCA (Australian Financial Complaints Authority) handles chargeback escalations — free and legally binding.'] },
  { flag: '🇮🇳', country: 'India', tips: ['UPI disputes: file "Raise a Dispute" in your UPI app (PhonePe, GPay, Paytm) with the transaction reference.', 'consumerhelpline.gov.in (National Consumer Helpline) — Uber must respond.', 'District Consumer Disputes Redressal Commission: free for claims under ₹50 lakh.'] },
  { flag: '🇧🇷', country: 'Brazil', tips: ['consumidor.gov.br: Uber is registered and legally required to respond within 10 days.', 'PIX disputes: file via "Mecanismo Especial de Devolução" through your bank.', 'Juizado Especial do Consumidor: free consumer court with high success rates for app delivery disputes.'] },
]

const COLOR_MAP = {
  blue: 'bg-blue-600',
  orange: 'bg-orange-500',
  purple: 'bg-purple-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  gray: 'bg-gray-700',
}

export default function Guide() {
  return (
    <>
      <Head>
        <title>How to Get a Refund from Uber Eats — Complete Guide 2026 | UberCheats</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'How to Get a Refund from Uber Eats — Complete Guide 2026',
          description: 'Step-by-step guide to getting your money back from Uber Eats: in-app dispute, social media escalation, bank chargeback, regulator complaint, and small claims court.',
          url: `${SITE_URL}/guide`,
          datePublished: '2026-01-01',
          dateModified: '2026-06-06',
          author: { '@type': 'Organization', name: 'UberCheats', url: SITE_URL },
          publisher: { '@type': 'Organization', name: 'UberCheats', url: SITE_URL },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Refund Guide', item: `${SITE_URL}/guide` },
            ],
          },
        }) }} />
        <meta name="description" content="Step-by-step guide to getting your money back from Uber Eats: in-app dispute, social media escalation, bank chargeback, regulator complaint, and small claims court. Works in UK, US, Kenya, Australia, India, and more." />
        <link rel="canonical" href={`${SITE_URL}/guide`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Get a Refund from Uber Eats',
          description: 'Complete escalation guide for unresolved Uber Eats billing disputes',
          step: STEPS.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.content[0],
          })),
        }) }} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="font-black text-base hover:underline">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Refund Guide</span>
          </div>
        </nav>

        <header className="relative bg-gray-900 text-white py-14 px-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&h=500&fit=crop&crop=center"
            alt="Consumer rights documents and paperwork"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative max-w-4xl mx-auto">
            <div className="text-sm text-gray-400 mb-2">Last updated June 2026</div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">How to Get Your Money Back<br />from Uber Eats</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              A six-step escalation guide — from in-app dispute to small claims court.
              Works in 40+ countries. Most disputes can be resolved at step 3 or 4.
            </p>
          </div>
        </header>

        {/* Step progress overview */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto">
            {STEPS.map(s => (
              <a key={s.n} href={`#step-${s.n}`}
                className="shrink-0 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition">
                <span className={`w-6 h-6 rounded-full ${COLOR_MAP[s.color]} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                  {s.n.replace('0', '')}
                </span>
                <span className="hidden sm:inline whitespace-nowrap">{s.title.split('(')[0].trim()}</span>
              </a>
            )).reduce((acc, el, i, arr) => [...acc, el, i < arr.length - 1 ? <span key={`sep-${i}`} className="text-gray-300 shrink-0">›</span> : null], [])}
          </div>
        </div>

        <main id="main-content" className="max-w-4xl mx-auto px-4 py-12 sm:px-6 space-y-12">

          {STEPS.map(step => (
            <section key={step.n} id={`step-${step.n}`} className="scroll-mt-16">
              <div className="flex items-start gap-4">
                <div className={`${COLOR_MAP[step.color]} text-white rounded-2xl w-14 h-14 flex flex-col items-center justify-center shrink-0 shadow-lg`}>
                  <div className="text-xs font-bold opacity-70">Step</div>
                  <div className="text-xl font-black leading-none">{parseInt(step.n)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-black text-gray-900">{step.icon} {step.title}</h2>
                  </div>
                  <div className="inline-block text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-4">{step.time}</div>
                  <div className="space-y-3">
                    {step.content.map((para, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
                    ))}
                  </div>
                  {step.tip && (
                    <div className="mt-4 flex gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                      <span className="shrink-0">💡</span>
                      <span>{step.tip}</span>
                    </div>
                  )}
                  {step.action && (
                    <div className="mt-4">
                      <Link href={step.action.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg transition">
                        {step.action.label} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* Country-specific tips */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Country-Specific Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COUNTRY_TIPS.map(c => (
                <div key={c.country} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-800 mb-3">{c.flag} {c.country}</h3>
                  <ul className="space-y-2">
                    {c.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <Link href="/directory" className="mt-3 inline-block text-xs text-blue-600 hover:underline">
                    Full {c.country} directory →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Quick links */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { icon: '🌍', label: 'Global Directory', sub: 'Regulators & contacts for 40+ countries', href: '/directory' },
              { icon: '⚖️', label: 'Legal Tracker', sub: 'FTC, ACCC, NY AG actions against Uber', href: '/legal' },
              { icon: '📱', label: 'Uber Contacts', sub: 'All verified social media handles', href: '/uber-contacts' },
            ].map(l => (
              <Link key={l.label} href={l.href}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-300 hover:shadow-sm transition">
                <span className="text-2xl">{l.icon}</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{l.label}</div>
                  <div className="text-xs text-gray-500">{l.sub}</div>
                </div>
              </Link>
            ))}
          </section>

          <p className="text-xs text-gray-400 text-center pt-4">
            UberCheats is not a law firm and this guide is not legal advice. Laws vary by country and change over time.
            For complex disputes, consult a qualified consumer rights lawyer in your jurisdiction.
          </p>
        </main>

        <footer className="bg-gray-900 text-gray-500 text-center py-6 mt-12 text-xs">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
