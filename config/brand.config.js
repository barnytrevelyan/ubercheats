/**
 * brand.config.js — ALL brand-specific content lives here.
 *
 * To create a new brand site:
 *   1. Copy this entire repo to a new repo
 *   2. Replace the contents of this file with your brand's content
 *   3. Create a new Supabase project and set its env vars
 *   4. Deploy to Vercel with the new env vars
 *
 * The shared page code contains ZERO brand strings.
 * Every piece of brand copy, imagery, and data is in this file only.
 */

const BRAND = {

  // ── Core identity ──────────────────────────────────────────────────────────
  name: 'UberCheats',
  targetCompany: 'Uber Technologies, Inc.',
  targetProduct: 'Uber Eats',
  domain: 'https://www.ubercheats.info',
  foundedYear: '2026',
  contactsPageSlug: 'uber-contacts',   // filename of the contacts page (no extension)

  // ── Theme ──────────────────────────────────────────────────────────────────
  theme: {
    statsBg: 'bg-red-700',          // Tailwind class for stats bar background
    statsText: 'text-red-200',       // Tailwind class for stats bar label text
    primaryBtn: 'bg-red-600 hover:bg-red-700',
    accentText: 'text-red-400',      // hero accent colour
    alertBg: 'bg-amber-50 border-amber-200',
    alertText: 'text-amber-800',
  },

  // ── SEO / metadata ─────────────────────────────────────────────────────────
  meta: {
    homeTitle: 'UberCheats — Uber Refund Failures & Billing Disputes Database',
    homeDescription: 'Public record of Uber refund failures, double charges, and unresolved billing disputes worldwide. Submit your case, find country-specific recourse, and help hold Uber accountable.',
    guideTitle: 'How to Get a Refund from Uber Eats — Complete Guide 2026 | UberCheats',
    guideDescription: 'Step-by-step guide to getting your money back from Uber Eats: in-app dispute, social media escalation, bank chargeback, regulator complaint, and small claims court. Works in UK, US, Kenya, Australia, India, and more.',
    legalTitle: 'Uber Legal & Regulatory Tracker — FTC Lawsuit, ACCC Fine | UberCheats',
    legalDescription: 'Tracker of regulatory actions and lawsuits against Uber: FTC v. Uber (2025), NY AG lawsuit, ACCC $21M fine, California AB 578. Know your rights.',
    directoryTitle: 'Global Recourse Directory — UberCheats',
    directoryDescription: 'Country-by-country guide to getting your money back from Uber Eats. Find local executives, regulators, payment dispute routes, and consumer protection agencies for 24+ countries.',
    contactsTitle: 'Uber & Uber Eats Social Media Contacts — UberCheats',
    contactsDescription: 'All verified Uber and Uber Eats social media accounts — global and regional. Use these to publicly escalate billing disputes and get faster responses.',
    aboutTitle: 'About UberCheats — Independent Consumer Advocacy',
    aboutDescription: 'UberCheats is an independent, consumer-run platform documenting Uber Eats refund failures and billing disputes worldwide. Not affiliated with Uber Technologies.',
  },

  // ── Legal disclaimer (used in footer, forms, about page) ──────────────────
  disclaimer: {
    footer: 'Not affiliated with Uber Technologies Inc.',
    formTruthfulness: 'By submitting you confirm this is a truthful account of your own experience. Posts must contain only factual, verifiable information. UberCheats is not liable for user-submitted content. Your name and case description will be publicly visible — do not include personal financial details beyond the disputed amount.',
    legalNotice: 'UberCheats is an independent consumer advocacy and educational platform. It is not affiliated with, authorised, or endorsed by Uber Technologies, Inc. or any of its subsidiaries. All registered trademarks (including Uber® and Uber Eats®) belong to their respective owners and are used here solely to identify the subject matter of consumer complaints, as permitted under nominative fair use. All case content is submitted by users and represents their individual reported experience — UberCheats does not verify the truth of individual submissions and accepts no liability for user-generated content. Nothing on this site constitutes legal advice.',
    userContent: 'Case reports are submitted by users and represent their own experiences. We do not independently verify individual submissions. Users agree to post only truthful, factual accounts of their own experiences.',
  },

  // ── JSON-LD structured data ────────────────────────────────────────────────
  jsonLd: {
    orgName: 'UberCheats',
    orgDescription: 'Independent consumer advocacy database for Uber billing disputes.',
    websiteDescription: 'Public database of Uber refund failures, double charges, and billing disputes worldwide.',
  },

  // ── Homepage ───────────────────────────────────────────────────────────────
  hero: {
    badge: 'Independent consumer advocacy — not affiliated with Uber',
    headline: 'Uber Eats refused your refund?',
    subheadline: 'Document it publicly.',
    body: 'A global, crowdsourced record of Uber Eats refund failures, double charges, and unresolved billing disputes. Every case is a permanent public record. Find out how to fight back in your country.',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=600&fit=crop&crop=center',
    imageAlt: 'Person stressed over billing dispute',
    manageLink: 'Already submitted? Manage your case →',
  },

  alertBanner: {
    text: 'The FTC and 21 US states have sued Uber for deceptive billing and cancellation practices (April 2025, expanded Dec 2025). Australia\'s ACCC fined Uber $21M for misleading consumers.',
    linkText: 'Full legal tracker →',
    linkHref: '/legal',
  },

  reportReasons: [
    '✓ Creates a public record, timestamped and searchable',
    '✓ Helps others facing the same problem find your case via search',
    '✓ Builds the evidence base for regulatory and legal action',
    '✓ You can add photos and updates to your case at any time',
    '✓ Mark it resolved when you get your money back — and share what worked',
  ],

  pillars: [
    {
      icon: '📖',
      title: 'Step-by-step refund guide',
      desc: 'From in-app dispute to small claims court — the complete escalation ladder, with country-specific advice.',
      href: '/guide',
      cta: 'Read the guide',
    },
    {
      icon: '🌍',
      title: 'Global recourse directory',
      desc: 'Executives, payment dispute routes, and regulators for 40+ countries. Find who can actually help.',
      href: '/directory',
      cta: 'Find your country',
    },
    {
      icon: '⚖️',
      title: 'Legal & regulatory tracker',
      desc: 'FTC lawsuit, ACCC $21M fine, NY AG suit, 21-state action — the accountability record.',
      href: '/legal',
      cta: 'See the cases',
    },
  ],

  about: {
    heading: 'About UberCheats',
    body: 'UberCheats is an independent, consumer-run platform documenting reported Uber and Uber Eats billing disputes worldwide. We exist because many users report that Uber fails to resolve legitimate refund requests, leaving them with no clear recourse through official channels. Every case here is permanent. Use the Global Directory for country-specific escalation routes, the Refund Guide for step-by-step help, and the Legal Tracker to understand your rights.',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=320&fit=crop&crop=center',
    heroImageAlt: 'Consumer advocacy and community',
    whatWeOffer: [
      ['📝 Case documentation', 'A permanent public record of your dispute, timestamped and searchable. You can add photos, updates, and mark it resolved when you succeed.'],
      ['🌍 Global Recourse Directory', 'Country-specific guides covering local executives, payment dispute routes, and regulatory bodies across 40+ countries.'],
      ['📖 Step-by-step refund guide', 'A practical escalation ladder from in-app dispute through to small claims court, with country-specific tips.'],
      ['⚖️ Legal & regulatory tracker', 'A living record of government actions — including the FTC\'s 2025 lawsuit, New York\'s Attorney General suit, and Australia\'s ACCC $21M fine.'],
      ['📱 Social media contacts', 'All verified global and regional social handles, with guidance on which accounts respond fastest to public complaints.'],
    ],
    principles: [
      ['Facts only.', 'We document what happened — amounts, dates, reference numbers. We don\'t allow speculation or unverified claims.'],
      ['Public records only.', 'The directory uses only publicly available information from corporate announcements, LinkedIn, and government registries. No private contact details.'],
      ['Community-maintained.', 'The directory is crowdsourced. All contributions are reviewed before going live.'],
      ['No legal advice.', 'We provide information and practical guidance. We are not a law firm and nothing here constitutes legal advice.'],
    ],
  },

  // ── Complaint categories ───────────────────────────────────────────────────
  categories: [
    { label: 'Refund Not Issued',                  icon: '💸', desc: 'Charged but never refunded' },
    { label: 'Charged Twice',                       icon: '🔁', desc: 'Duplicate charges on one order' },
    { label: 'Order Cancelled but Not Refunded',    icon: '❌', desc: 'Cancelled order, payment not returned' },
    { label: 'Customer Service Unresponsive',       icon: '🔇', desc: 'Support ignored or stonewalled' },
    { label: 'Other',                               icon: '⚠️', desc: 'Other billing or service failure' },
  ],

  // ── FAQ ────────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'How do I get a refund from Uber Eats?',
      a: 'Report in-app within 48 hours, then escalate to social media (@UberEats, @Uber_Support), then initiate a bank chargeback, then file with your national consumer regulator. See our step-by-step guide at /guide.',
    },
    {
      q: 'Can I do a chargeback on Uber Eats?',
      a: 'Yes. Contact your bank or card issuer and dispute the charge. Visa and Mastercard give you 60–120 days from the transaction date. In the UK, Section 75 covers credit card purchases over £100.',
    },
    {
      q: 'Has the FTC sued Uber?',
      a: 'Yes. The FTC and 21 US states sued Uber in April 2025 for deceptive Uber One billing and cancellation practices. An amended complaint was filed in December 2025.',
    },
    {
      q: `Is this site affiliated with Uber?`,
      a: 'No. This is an independent consumer advocacy platform. It is not affiliated with, authorised, or endorsed by Uber Technologies, Inc.',
    },
    {
      q: 'What is the Uber Eats refund policy?',
      a: "Uber Eats' stated policy covers refunds for missing items, wrong orders, or undelivered food, but many users report being refused. Under consumer law in most jurisdictions you are entitled to a refund for services not rendered.",
    },
    {
      q: 'How do I escalate an Uber complaint?',
      a: 'Step 1: in-app dispute. Step 2: tweet @UberEats and @Uber_Support publicly with your order number. Step 3: bank chargeback. Step 4: national consumer regulator complaint. Step 5: small claims court.',
    },
  ],

  // ── Guide ─────────────────────────────────────────────────────────────────
  guide: {
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&h=500&fit=crop&crop=center',
    heroImageAlt: 'Consumer rights documents and paperwork',
    headline: 'How to Get Your Money Back',
    subheadline: 'from Uber Eats',
    intro: 'A six-step escalation guide — from in-app dispute to small claims court. Works in 40+ countries. Most disputes can be resolved at step 3 or 4.',
    notLegalAdvice: 'UberCheats is not a law firm and this guide is not legal advice. Laws vary by country and change over time. For complex disputes, consult a qualified consumer rights lawyer in your jurisdiction.',
    steps: [
      {
        n: '01', icon: '📝', title: 'Document your case', time: 'Do this first', color: 'blue',
        content: [
          'Before doing anything else, create a public record on this site. This matters because it timestamps your complaint, creates verifiable evidence you can link to, and puts you on record before they can alter their version of events.',
          'Screenshot everything immediately: the original order confirmation, the charge on your bank statement, any in-app communications, and the refusal. These are your evidence.',
          'Include your order number in your report — this is essential for any financial dispute.',
        ],
        action: { label: 'Submit your case now', href: '/' },
      },
      {
        n: '02', icon: '📱', title: 'In-app dispute (within 48 hours)', time: 'Do within 48 hours', color: 'orange',
        content: [
          'Your first step is always the in-app dispute. Go to the order in the app → "Help" → select the problem (missing item, wrong order, not delivered, etc.).',
          'The refund policy technically requires you to report within 48 hours. Do this even if you expect to be refused — you need this paper trail for the chargeback.',
          'If the bot refuses or gives you only credit instead of a cash refund: reply insisting on a cash refund to your original payment method. Keep the reference number of every support interaction.',
          'Credit is not a refund. Under consumer law in most jurisdictions, you are entitled to a cash refund for services not rendered.',
        ],
        tip: 'Screenshot the refusal. The exact wording used matters when you escalate to your bank.',
      },
      {
        n: '03', icon: '📣', title: 'Social media escalation', time: 'Same day as refusal', color: 'purple',
        content: [
          'A public post gets faster results than a private support ticket. Tag the official accounts simultaneously with your order reference number and a brief description. Include a screenshot if possible.',
          "Keep it factual and unemotional: \"Order #XXXXXXXXX. Charged [amount]. Not delivered / wrong order / cancelled. Refused refund. I will be filing a chargeback if not resolved within 24 hours.\"",
          'Also try DMing the regional support handle for your country — see the Contacts page for all verified accounts.',
        ],
        action: { label: 'Find the right accounts', href: '/uber-contacts' },
        tip: 'Public posts with order references and amounts are escalated internally. Private tickets are routed to bots.',
      },
      {
        n: '04', icon: '💳', title: 'Bank chargeback', time: 'If unresolved after 5 days', color: 'green',
        content: [
          'A chargeback reverses the charge through your bank\'s dispute process. It is one of your strongest consumer rights and costs the company money — they pay a chargeback fee regardless of outcome.',
          "Call the number on the back of your card or go to your bank app → Transactions → Dispute. You'll need: the transaction date, amount, merchant name, your order number, and evidence the refund was refused.",
          'Timeframes: Visa and Mastercard give you 60–120 days from the transaction date. In the UK, Section 75 of the Consumer Credit Act covers credit card purchases over £100 and makes your bank jointly liable.',
          'Warning: some users have reported their account being restricted after initiating a chargeback. Consider this before proceeding if you still use the platform.',
        ],
        tip: "Use the phrase \"services not rendered\" or \"item not received\" when describing the dispute — these are the chargeback reason codes banks use.",
      },
      {
        n: '05', icon: '🏛️', title: 'Regulator complaint', time: 'After 2+ weeks unresolved', color: 'red',
        content: [
          'Filing with your national consumer protection authority puts the company on formal legal notice. Companies are required to respond to government complaints within set timeframes (typically 10–30 days).',
          'Find your country\'s full regulator list — including exact filing URLs — in the Global Directory.',
          'A regulator complaint also contributes to the official record that triggers investigations.',
        ],
        action: { label: "Find your country's regulators", href: '/directory' },
      },
      {
        n: '06', icon: '⚖️', title: 'Small claims court', time: 'Nuclear option — highly effective', color: 'gray',
        content: [
          'Small claims court is the most underused and most effective escalation tool. Filing costs very little (usually $30–100), no lawyer is required, and companies almost always settle before the hearing date.',
          'This works because the company\'s legal cost of fighting a small claim exceeds most claim values, so settling is rational.',
          'UK: County Court (MCOL online) for claims up to £10,000. US: varies by state ($5,000–$10,000 typical). Australia: AFCA then State tribunals.',
          'Search "[your country] small claims court online" — most countries now have an online filing portal. The filing alone is often enough to trigger a settlement offer.',
        ],
        tip: 'Search "[your country] small claims court online" — most countries now have an online filing portal. The filing alone is often enough to trigger a settlement offer.',
      },
    ],
    countryTips: [
      {
        flag: '🇬🇧', country: 'United Kingdom',
        tips: [
          'Section 75 Consumer Credit Act: your card issuer is jointly liable for purchases over £100 on credit cards.',
          'The Financial Ombudsman Service (free) handles disputes if your bank refuses to chargeback.',
          'Uber had its London operating licence refused twice by TfL (2017, 2019) before winning on appeal — the CMA monitors platform practices closely.',
        ],
      },
      {
        flag: '🇰🇪', country: 'Kenya',
        tips: [
          'M-Pesa payments route through Gladys (the platform\'s CBK-regulated payment gateway). Contact Gladys directly at support@joingladys.com.',
          'Competition Authority of Kenya (CAK) has jurisdiction over platform app practices.',
          'Central Bank of Kenya regulates Gladys and M-Pesa — escalate unresolved payment disputes there.',
        ],
      },
      {
        flag: '🇺🇸', country: 'United States',
        tips: [
          'FTC complaint at reportfraud.ftc.gov — your complaint directly contributes to the active FTC v. Uber case.',
          'CFPB handles payment disputes and requires a company response within 15 days.',
          'Small claims: many users report Uber settling before the hearing date. File in your home state.',
          'California AB 578 (2024): Uber Eats must issue full refunds for undelivered orders — no discretion.',
        ],
      },
      {
        flag: '🇦🇺', country: 'Australia',
        tips: [
          'The ACCC fined Uber $21M in 2024 for misleading consumers — they are willing to act.',
          'Australian Consumer Law mandates refunds for services not provided.',
          'AFCA (Australian Financial Complaints Authority) handles chargeback escalations — free and legally binding.',
        ],
      },
      {
        flag: '🇮🇳', country: 'India',
        tips: [
          'UPI disputes: file "Raise a Dispute" in your UPI app (PhonePe, GPay, Paytm) with the transaction reference.',
          'consumerhelpline.gov.in (National Consumer Helpline) — company must respond.',
          'District Consumer Disputes Redressal Commission: free for claims under ₹50 lakh.',
        ],
      },
      {
        flag: '🇧🇷', country: 'Brazil',
        tips: [
          'consumidor.gov.br: company must respond within 10 days.',
          'PIX disputes: file via "Mecanismo Especial de Devolução" through your bank.',
          'Juizado Especial do Consumidor: free consumer court with high success rates for app delivery disputes.',
        ],
      },
    ],
  },

  // ── Legal tracker ─────────────────────────────────────────────────────────
  legal: {
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&h=500&fit=crop&crop=top',
    heroImageAlt: 'Legal professional and court documents',
    headline: '⚖️ Legal & Regulatory Tracker',
    intro: 'A living record of regulatory actions, lawsuits, and consumer protection orders against Uber worldwide. Use this to understand your rights and find the right authority to escalate to.',
    sourceNote: 'All information on this page is sourced directly from official government press releases and court records, linked above. Case summaries represent allegations made in those filings — not findings of guilt. Last updated June 2026.',
    cases: [
      {
        id: 'ftc-2025',
        status: 'active', statusLabel: 'Active — Ongoing', statusColor: 'red',
        flag: '🇺🇸', jurisdiction: 'United States — Federal',
        title: 'FTC v. Uber Technologies, Inc.',
        authority: 'Federal Trade Commission + 21 States',
        filed: 'April 2025', updated: 'December 2025 (amended complaint)',
        summary: 'The FTC, joined by 21 US states, sued Uber for enrolling consumers in Uber One subscriptions without consent, charging them before free trials ended, failing to deliver promised savings, and making it difficult to cancel despite "cancel anytime" claims.',
        allegations: [
          'Enrolling users in Uber One without explicit consent',
          'Charging subscribers before free trial periods ended',
          'Advertising "$0 delivery fee" while charging hidden delivery fees',
          'Making cancellation difficult despite advertising "cancel anytime" (as alleged in the complaint)',
          'Violations of the FTC Act and the Restore Online Shoppers\' Confidence Act (ROSCA)',
        ],
        outcome: 'Ongoing — case filed in US District Court for the Northern District of California. Amended complaint filed December 2025.',
        relevance: 'If you were charged for Uber One without consent or denied cancellation, file at reportfraud.ftc.gov — your complaint directly contributes to this case.',
        sources: [
          { label: 'FTC press release (April 2025)', url: 'https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-takes-action-against-uber-deceptive-billing-cancellation-practices' },
          { label: 'Amended complaint (December 2025)', url: 'https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-states-file-amended-complaint-against-uber-deceptive-billing-cancellation-practices' },
          { label: 'FTC case page', url: 'https://www.ftc.gov/legal-library/browse/cases-proceedings/2423092-uber-ftc-v' },
        ],
      },
      {
        id: 'ny-ag-2025',
        status: 'active', statusLabel: 'Active', statusColor: 'red',
        flag: '🇺🇸', jurisdiction: 'United States — New York State',
        title: 'NY Attorney General v. Uber — Uber One Subscription Practices',
        authority: 'New York State Attorney General (Letitia James)',
        filed: '2025', updated: '2025',
        summary: 'New York\'s Attorney General sued Uber, alleging the company trapped customers in Uber One subscriptions, using misleading pop-ups claiming users would "save $25 every month" and making cancellation difficult despite "cancel anytime" claims.',
        allegations: [
          'Misleading pop-ups falsely claiming guaranteed $25/month savings',
          'Deceptive subscription sign-up flows targeting existing app users',
          'Making cancellation difficult despite "cancel anytime" claims',
        ],
        outcome: 'Ongoing litigation.',
        relevance: 'New York consumers affected by Uber One billing can contact the NY AG office.',
        sources: [
          { label: 'NY AG press release', url: 'https://ag.ny.gov/press-release/2025/attorney-general-james-sues-uber-trapping-customers-costly-subscriptions' },
        ],
      },
      {
        id: 'accc-2024',
        status: 'resolved', statusLabel: 'Resolved — $21M penalty', statusColor: 'green',
        flag: '🇦🇺', jurisdiction: 'Australia — Federal',
        title: 'ACCC v. Uber — Misleading Consumers',
        authority: 'Australian Competition and Consumer Commission (ACCC)',
        filed: '2022–2024', updated: '2024 (penalty finalised)',
        summary: 'The ACCC took Uber to Federal Court for misleading Australian consumers with false cancellation fee warnings and inaccurate UberTAXI fare estimates. The Federal Court ordered Uber to pay $21 million.',
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
        status: 'resolved', statusLabel: 'Law in force', statusColor: 'green',
        flag: '🇺🇸', jurisdiction: 'United States — California',
        title: 'California AB 578 — Mandatory Refunds for Undelivered Orders',
        authority: 'California State Legislature',
        filed: '2024 (enacted)', updated: '2024',
        summary: 'California passed Assembly Bill 578 requiring food delivery platforms including Uber Eats to provide full refunds when orders are never delivered or delivered incorrectly.',
        allegations: [],
        outcome: 'Law enacted. California consumers are legally entitled to full refunds from Uber Eats for undelivered or incorrect orders — Uber has no discretion to refuse.',
        relevance: 'California consumers: if Uber Eats refuses your refund for an undelivered or wrong order, they are in violation of state law. File with the California AG.',
        sources: [],
      },
    ],
  },

  // ── Social media contacts ─────────────────────────────────────────────────
  contacts: {
    headline: '📱 Uber & Uber Eats Social Media Contacts',
    intro: 'All verified Uber and Uber Eats social media accounts — global and regional. Accounts marked ⚡ Best for complaints have the highest response rates. All handles verified June 2026.',
    strategyTip: 'The most effective escalation is a tweet tagging @UberEats, @Uber_Support, and your regional account simultaneously — include your order reference, amount, and a screenshot. Public posts with evidence are prioritised over private support tickets.',
    missingText: "Know an official social account for your country that isn't listed? Submit it via the country directory page using the Contribute button.",
    globalAccounts: {
      uber: {
        label: 'Uber (Corporate)',
        note: "Uber's main corporate brand accounts",
        accounts: [
          { platform: 'X / Twitter', handle: '@Uber_Support', url: 'https://x.com/Uber_Support', badge: '⚡ Best for complaints', note: 'Public tweets get rapid responses. DM for private escalation. Monitored daily.' },
          { platform: 'X / Twitter', handle: '@Uber', url: 'https://x.com/Uber', note: 'Corporate brand account. Tag in tweets for visibility.' },
          { platform: 'Instagram', handle: '@uber', url: 'https://www.instagram.com/uber/', note: 'Corporate Instagram — DM or comment on posts.' },
          { platform: 'Facebook', handle: 'Uber', url: 'https://www.facebook.com/uber', note: 'Use the "Send Message" button or comment on recent posts.' },
          { platform: 'TikTok', handle: '@uber', url: 'https://www.tiktok.com/@uber', note: '2.7M followers. Comment on recent videos for public visibility.' },
          { platform: 'LinkedIn', handle: 'Uber', url: 'https://www.linkedin.com/company/uber-com', note: 'Best for executive-level escalation.' },
          { platform: 'YouTube', handle: 'Uber', url: 'https://www.youtube.com/channel/UCgnxoUwDmmyzeigmmcf0hZA', note: 'Comment on recent videos for public pressure.' },
        ],
      },
      ubereats: {
        label: 'Uber Eats',
        note: 'Uber Eats brand accounts — most relevant for food delivery disputes',
        accounts: [
          { platform: 'X / Twitter', handle: '@UberEats', url: 'https://x.com/UberEats', badge: '⚡ Tag in complaints', note: 'Public mentions are monitored. Tag @UberEats and @Uber_Support together.' },
          { platform: 'Instagram', handle: '@ubereats', url: 'https://www.instagram.com/ubereats/', note: 'DM or comment. Works best with screenshots attached.' },
          { platform: 'Facebook', handle: 'Uber Eats', url: 'https://www.facebook.com/UberEats/', note: '3.4M followers. Post on timeline or send a direct message.' },
          { platform: 'LinkedIn', handle: 'Uber Eats', url: 'https://www.linkedin.com/company/ubereat', note: 'Use for executive escalation to regional managers.' },
        ],
      },
    },
    regionalAccounts: [
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
          { platform: 'Instagram', handle: '@uber_kenya', url: 'https://www.instagram.com/uber_kenya/' },
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
    ],
  },

  // ── Directory email template ───────────────────────────────────────────────
  emailTemplate: (countryName, currencyCode) => `Subject: Formal Complaint — Unresolved Billing Dispute

Dear [Executive Name / Support Team],

I am writing to formally document an unresolved billing dispute in ${countryName}.

Transaction details:
- Date: [DATE]
- Amount: [AMOUNT] ${currencyCode || ''}
- Order/Reference number: [ORDER NUMBER]
- Issue: [Brief description]

I have attached evidence (screenshots) to support this claim.

I am giving 7 days to resolve this before filing a formal complaint with the relevant consumer protection authority and initiating a bank chargeback.

Please confirm receipt and provide a resolution timeline.

Yours sincerely,
[YOUR NAME]
[YOUR EMAIL]`,



  // ── Currencies ─────────────────────────────────────────────────────────────
  defaultCurrency: 'USD',
  currencies: null, // null = use the full built-in list in ComplaintForm


  // ── Privacy & legal pages config ──────────────────────────────────────────
  privacy: {
    controllerName: 'UberCheats',
    controllerContact: 'privacy@ubercheats.info',
    dataProcessors: [
      { name: 'Supabase Inc.', location: 'United States', purpose: 'Database hosting and file storage', mechanism: 'Standard Contractual Clauses (SCCs)' },
      { name: 'Vercel Inc.', location: 'United States', purpose: 'Website hosting and analytics', mechanism: 'Standard Contractual Clauses (SCCs)' },
    ],
    retentionPeriod: '3 years from submission, or upon valid erasure request',
    dataCollected: ['Name (displayed publicly)', 'Email address (private)', 'Complaint description (displayed publicly)', 'Order amount and date', 'Order reference number', 'Uploaded evidence files'],
    legalBasis: 'Consent (Article 6(1)(a) GDPR) — provided at point of submission',
    cookieTypes: [
      { name: 'Vercel Analytics', type: 'Analytics', purpose: 'Counts page visits and traffic sources. No personally identifiable information stored.', required: false },
    ],
    icoRegistration: 'Pending — apply at ico.org.uk/registration',
    lastUpdated: 'June 2026',
  },

  // ── Complaint form field labels ────────────────────────────────────────────
  formFields: {
    amountLabel: 'Order Amount',
    amountHelper: 'Amount will be converted to USD for comparison',
    dateLabel: 'Order Date',
    refLabel: 'Order Reference Number (Optional)',
    refPlaceholder: 'e.g., order ID or reference number',
    refHelper: 'Include any order number or reference ID to support your claim',
    titleLabel: 'Brief Title',
    titlePlaceholder: 'e.g., Charged $45.50 but order was cancelled',
    descLabel: 'Detailed Description',
    descPlaceholder: 'Describe what happened. Include dates, order details, attempts to contact support, etc.',
  },

  // ── llms.txt ───────────────────────────────────────────────────────────────
  llmsTxt: `# UberCheats

> A public database of Uber refund failures, double charges, and billing disputes.

UberCheats is an independent consumer advocacy site. Users submit documented complaints about Uber failing to issue refunds, charging customers twice, cancelling orders without refunding, and providing unresponsive customer service. All cases are permanent public records.

## What this site contains

- Individual complaint pages at /complaints/[id]
- A global recourse directory at /directory with country-specific executives, payment gateways, and regulators
- A step-by-step refund guide at /guide
- A regulatory tracker at /legal covering the FTC v. Uber lawsuit, ACCC fine, and more
- All verified Uber and Uber Eats social media contacts at /uber-contacts

## Who created this

UberCheats was created by affected Uber customers. It is not affiliated with Uber Technologies, Inc.

## Key URLs

- Homepage: https://www.ubercheats.info
- Individual case: https://www.ubercheats.info/complaints/{id}
- Sitemap: https://www.ubercheats.info/sitemap.xml`,

}

module.exports = BRAND
