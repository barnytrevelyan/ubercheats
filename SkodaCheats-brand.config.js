/**
 * brand.config.js — SkodaCheats
 * Drop this file into config/brand.config.js in the cloned repo,
 * replacing the UberCheats version entirely.
 */

const BRAND = {

  // ── Core identity ──────────────────────────────────────────────────────────
  name: 'SkodaCheats',
  targetCompany: 'Škoda Auto a.s. (Volkswagen Group)',
  targetProduct: 'Škoda',
  domain: 'https://www.skodacheats.info',
  foundedYear: '2026',
  contactsPageSlug: 'skoda-contacts',

  // ── Theme — Skoda green ────────────────────────────────────────────────────
  theme: {
    statsBg: 'bg-green-700',
    statsText: 'text-green-200',
    primaryBtn: 'bg-green-700 hover:bg-green-800',
    accentText: 'text-green-400',
    alertBg: 'bg-amber-50 border-amber-200',
    alertText: 'text-amber-800',
  },

  // ── SEO / metadata ─────────────────────────────────────────────────────────
  meta: {
    homeTitle: 'SkodaCheats — Škoda Warranty, Finance & Dealer Dispute Database',
    homeDescription: 'Public record of Škoda warranty failures, PCP mis-selling, dealer fraud, and unresolved service disputes. Submit your case, find country-specific recourse, and help hold Škoda accountable.',
    guideTitle: 'How to Resolve a Škoda Dispute — Complete Guide 2026 | SkodaCheats',
    guideDescription: 'Step-by-step guide for Škoda owners: dealer escalation, Motor Ombudsman, FCA complaint, Trading Standards, small claims court. Works in UK, Germany, Czech Republic, Ireland, Australia and more.',
    legalTitle: 'Škoda & VW Group Legal Tracker — Dieselgate, PCP Mis-selling | SkodaCheats',
    legalDescription: 'Tracker of regulatory actions against Škoda and VW Group: Dieselgate emissions scandal, UK PCP mis-selling investigation, DVSA safety recalls. Know your rights.',
    directoryTitle: 'Global Recourse Directory — SkodaCheats',
    directoryDescription: 'Country-by-country guide for Škoda owners. Find regional executives, finance dispute routes, and regulatory bodies across 20+ countries.',
    contactsTitle: 'Škoda Social Media Contacts — SkodaCheats',
    contactsDescription: 'All verified Škoda and VW Group social media accounts — global and regional. Use these to publicly escalate disputes and get faster responses.',
    aboutTitle: 'About SkodaCheats — Independent Consumer Advocacy for Škoda Owners',
    aboutDescription: 'SkodaCheats is an independent platform documenting Škoda warranty failures, PCP finance disputes, and dealer mis-selling worldwide. Not affiliated with Škoda Auto.',
  },

  // ── Legal disclaimer ───────────────────────────────────────────────────────
  disclaimer: {
    footer: 'Not affiliated with Škoda Auto a.s. or Volkswagen Group.',
    formTruthfulness: 'By submitting you confirm this is a truthful account of your own experience. Posts must contain only factual, verifiable information. SkodaCheats is not liable for user-submitted content. Your name and case description will be publicly visible — do not include personal financial details beyond the disputed amount.',
    legalNotice: 'SkodaCheats is an independent consumer advocacy and educational platform. It is not affiliated with, authorised, or endorsed by Škoda Auto a.s. or Volkswagen Group. All registered trademarks (including Škoda®) belong to their respective owners and are used here solely to identify the subject matter of consumer complaints, as permitted under nominative fair use. All case content is submitted by users and represents their individual reported experience — SkodaCheats does not verify the truth of individual submissions and accepts no liability for user-generated content. Nothing on this site constitutes legal advice.',
    userContent: 'Case reports are submitted by users and represent their own experiences. We do not independently verify individual submissions. Users agree to post only truthful, factual accounts of their own experiences.',
  },

  // ── JSON-LD ────────────────────────────────────────────────────────────────
  jsonLd: {
    orgName: 'SkodaCheats',
    orgDescription: 'Independent consumer advocacy database for Škoda vehicle and finance disputes.',
    websiteDescription: 'Public database of Škoda warranty failures, PCP mis-selling, dealer fraud, and unresolved service disputes.',
  },

  // ── Homepage ───────────────────────────────────────────────────────────────
  hero: {
    badge: 'Independent consumer advocacy — not affiliated with Škoda Auto',
    headline: 'Škoda let you down.',
    subheadline: 'We make it public.',
    body: 'A global, crowdsourced record of Škoda warranty failures, PCP mis-selling, dealer fraud, and unresolved service disputes. Every case is a permanent public record. Find out how to fight back.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&h=600&fit=crop&crop=center',
    imageAlt: 'Car dealership and consumer dispute',
    manageLink: 'Already submitted? Manage your case →',
  },

  alertBanner: {
    text: 'VW Group (Škoda\'s parent) paid over $30 billion worldwide for the Dieselgate emissions fraud. UK PCP finance mis-selling is under active FCA investigation.',
    linkText: 'Full legal tracker →',
    linkHref: '/legal',
  },

  reportReasons: [
    '✓ Creates a permanent public record that Škoda cannot delete',
    '✓ Helps other owners facing the same problem find your case',
    '✓ Builds evidence for regulatory and legal action',
    '✓ You can add photos, service records, and updates at any time',
    '✓ Mark it resolved when you succeed — and share what worked',
  ],

  pillars: [
    {
      icon: '📖',
      title: 'Step-by-step dispute guide',
      desc: 'From dealer escalation to the Motor Ombudsman, FCA, and small claims court — with country-specific advice.',
      href: '/guide',
      cta: 'Read the guide',
    },
    {
      icon: '🌍',
      title: 'Global recourse directory',
      desc: 'Executives, finance dispute routes, and regulators for 20+ countries. Find who can actually help.',
      href: '/directory',
      cta: 'Find your country',
    },
    {
      icon: '⚖️',
      title: 'Legal & regulatory tracker',
      desc: 'Dieselgate fines, PCP mis-selling investigation, DVSA recalls — the accountability record.',
      href: '/legal',
      cta: 'See the cases',
    },
  ],

  about: {
    heading: 'About SkodaCheats',
    body: 'SkodaCheats is an independent, consumer-run platform documenting Škoda vehicle defects, PCP finance mis-selling, dealer fraud, and unresolved service disputes worldwide. We exist because Škoda dealerships and Volkswagen Group systematically fail to resolve legitimate consumer complaints. Every case here is permanent. Use the Global Directory for country-specific escalation routes, the Dispute Guide for step-by-step help, and the Legal Tracker to understand your rights.',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=320&fit=crop&crop=center',
    heroImageAlt: 'Consumer advocacy and community',
    whatWeOffer: [
      ['📝 Case documentation', 'A permanent public record of your dispute — warranty failures, finance complaints, service fraud. Add photos, documents, and updates over time.'],
      ['🌍 Global Recourse Directory', 'Country-specific guides covering Škoda regional executives, finance provider dispute routes, and regulatory bodies.'],
      ['📖 Step-by-step dispute guide', 'From dealer escalation to the Motor Ombudsman, FCA, Trading Standards, and small claims court.'],
      ['⚖️ Legal & regulatory tracker', 'A living record of actions against VW Group — Dieselgate, PCP mis-selling, DVSA safety recall enforcement.'],
      ['📱 Social media contacts', 'All verified Škoda and VW Group social handles, with guidance on which accounts respond fastest.'],
    ],
    principles: [
      ['Facts only.', 'We document what happened — VIN numbers, service records, amounts, dates. No speculation or unverified claims.'],
      ['Public records only.', 'The directory uses only publicly available information. No private contact details.'],
      ['Community-maintained.', 'The directory is crowdsourced. All contributions are reviewed before going live.'],
      ['No legal advice.', 'We provide information and practical guidance. We are not a law firm.'],
    ],
  },

  // ── Complaint categories ───────────────────────────────────────────────────
  categories: [
    { label: 'Warranty Refused',         icon: '🔧', desc: 'Known defect, warranty claim denied' },
    { label: 'PCP / Finance Mis-selling', icon: '💳', desc: 'Mis-sold finance agreement or hidden charges' },
    { label: 'Dealer Fraud',              icon: '🏪', desc: 'Overcharging, false spec, dishonest selling' },
    { label: 'Service & Repair Issues',   icon: '🔩', desc: 'Overcharging, damage, unnecessary work' },
    { label: 'Safety Recall Ignored',     icon: '⚠️', desc: 'Known safety defect not rectified' },
  ],

  // ── FAQ ────────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'My Škoda warranty claim was refused — what can I do?',
      a: 'First, put your complaint in writing to the dealer and Škoda UK/your country\'s importer. If unresolved, escalate to the Motor Ombudsman (UK) or equivalent national body — they can compel Škoda to honour legitimate warranty claims. See our step-by-step guide.',
    },
    {
      q: 'I was mis-sold a PCP finance agreement on my Škoda — can I get compensation?',
      a: 'Possibly yes. The FCA is actively investigating motor finance mis-selling. Contact the Financial Ombudsman Service (UK) or file a complaint with your national financial regulator. Skoda Finance is regulated by the FCA.',
    },
    {
      q: 'What is Dieselgate and does it affect my Škoda?',
      a: 'VW Group (Škoda\'s parent company) installed software in diesel engines to cheat emissions tests. Škoda models including the Octavia, Fabia, and Superb were affected. VW Group paid over $30 billion in fines and settlements worldwide. See the legal tracker for details.',
    },
    {
      q: 'Is SkodaCheats affiliated with Škoda?',
      a: 'No. SkodaCheats is an independent consumer advocacy platform. It is not affiliated with, authorised, or endorsed by Škoda Auto a.s. or Volkswagen Group.',
    },
    {
      q: 'How do I escalate a Škoda complaint in the UK?',
      a: 'Step 1: written complaint to the dealer. Step 2: escalate to Škoda UK Customer Services. Step 3: Motor Ombudsman (free, binding arbitration). Step 4: Trading Standards / Citizens Advice. Step 5: small claims court for financial losses.',
    },
    {
      q: 'Can I reject my Škoda under the Consumer Rights Act?',
      a: 'In the UK, under the Consumer Rights Act 2015, you have a 30-day right to reject a faulty vehicle for a full refund. After 30 days, the dealer has one repair attempt. After that, you can claim a partial refund. Document everything and act quickly.',
    },
  ],

  // ── Guide ─────────────────────────────────────────────────────────────────
  guide: {
    heroImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&h=500&fit=crop&crop=center',
    heroImageAlt: 'Car keys and consumer rights documents',
    headline: 'How to Resolve Your',
    subheadline: 'Škoda Dispute',
    intro: 'A six-step escalation guide — from dealer complaint to small claims court. Works in 20+ countries. Most disputes can be resolved at step 3 or 4.',
    notLegalAdvice: 'SkodaCheats is not a law firm and this guide is not legal advice. Laws vary by country and change over time. For complex disputes, consult a qualified consumer rights solicitor.',
    steps: [
      {
        n: '01', icon: '📝', title: 'Document your case', time: 'Do this first', color: 'blue',
        content: [
          'Before anything else, create a public record on SkodaCheats. This timestamps your complaint, creates verifiable evidence, and puts you on record.',
          'Gather everything: purchase/lease agreement, finance documents, service history, VIN number, all written communications with the dealer, photos of defects, and any rejected warranty claims.',
          'If you have a safety defect, also report it to the DVSA (UK) or your national vehicle safety authority — this creates a separate official record.',
        ],
        action: { label: 'Submit your case now', href: '/' },
      },
      {
        n: '02', icon: '✉️', title: 'Formal written complaint to dealer & importer', time: 'Week 1', color: 'orange',
        content: [
          'Send a formal letter (not just a phone call) to: (1) the dealer\'s General Manager, and (2) Škoda UK Customer Services (or your country\'s Škoda importer). Emails with delivery receipts count.',
          'State: the fault clearly, when it first appeared, what repair or remedy you\'re requesting, and your 14-day deadline for a response.',
          'For PCP/finance issues, write separately to Skoda Finance / VW Financial Services and your country\'s financial regulator.',
          'Keep copies of everything. The written record is essential for the Motor Ombudsman and small claims.',
        ],
        tip: 'Use "Under the Consumer Rights Act 2015" (UK) or equivalent in your letter. This signals you know your rights and typically prompts a more serious response.',
      },
      {
        n: '03', icon: '📣', title: 'Social media escalation', time: 'Same week', color: 'purple',
        content: [
          'A public post gets faster internal escalation than a support ticket. Tag @SkodaUK (or your regional account) and @Skoda on X/Twitter with your registration number, fault description, and a photo.',
          'Keep it factual: "2022 Škoda Octavia. Warranty claim for [fault] refused despite [evidence]. Dealer ref [number]. Escalating to Motor Ombudsman if unresolved by [date]."',
          'Also try LinkedIn — Škoda UK\'s Managing Director and Head of Customer Relations are often reachable there.',
        ],
        action: { label: 'Find the right accounts', href: '/skoda-contacts' },
        tip: 'Posts with vehicle registration numbers and specific fault codes get escalated internally. Vague complaints do not.',
      },
      {
        n: '04', icon: '🏛️', title: 'Motor Ombudsman / Financial Ombudsman', time: 'After 8 weeks', color: 'green',
        content: [
          'The Motor Ombudsman (UK) provides free, independent, and legally binding resolution for vehicle warranty and dealer disputes. You must give the dealer 8 weeks to resolve first.',
          'For PCP/HP finance disputes, use the Financial Ombudsman Service instead — Skoda Finance is FCA-regulated and must respond to FOS within 8 weeks.',
          'These are the two most powerful tools for UK Škoda owners — free, no lawyer needed, and companies must comply with decisions.',
          'Outside UK: Germany has the KBA and Kraftfahrt-Bundesamt; EU consumers can use the European ODR platform.',
        ],
        action: { label: "Find your country's regulators", href: '/directory' },
      },
      {
        n: '05', icon: '🚔', title: 'Trading Standards & DVSA', time: 'For safety and fraud', color: 'red',
        content: [
          'If you suspect criminal fraud (odometer tampering, deliberate mis-description, selling a car with known hidden defects), report to Trading Standards via Citizens Advice.',
          'For safety defects — especially if Škoda has refused a recall repair — report to the Driver and Vehicle Standards Agency (DVSA). They investigate and can compel manufacturers.',
          'Trading Standards complaints create a public enforcement record that contributes to systematic investigations of dealers.',
        ],
      },
      {
        n: '06', icon: '⚖️', title: 'Small claims court', time: 'Nuclear option — very effective', color: 'gray',
        content: [
          'For financial losses up to £10,000 (UK), the small claims track in the County Court is fast, cheap (£35–£455 filing fee), and lawyers aren\'t needed.',
          'Škoda dealers and finance companies almost always settle before the hearing date — the filing cost is less than their legal costs.',
          'You can claim: cost of repairs carried out elsewhere, diminution in value, hire car costs while the vehicle was off the road, and distress/inconvenience.',
          'File online at moneyclaim.gov.uk (UK). Include all your documentation.',
        ],
        tip: 'Send a final "Letter Before Action" giving 14 days to settle before filing. This is legally required for small claims and often resolves the dispute without going to court.',
      },
    ],
    countryTips: [
      {
        flag: '🇬🇧', country: 'United Kingdom',
        tips: [
          'Consumer Rights Act 2015: 30-day right to reject a faulty vehicle for a full refund. After 30 days, one repair attempt, then partial refund.',
          'Motor Ombudsman (free, binding): for warranty and dealer disputes after 8 weeks.',
          'Financial Ombudsman Service: for PCP/HP mis-selling — Skoda Finance is FCA-regulated.',
          'DVSA: report safety defects at gov.uk/report-a-faulty-vehicle.',
        ],
      },
      {
        flag: '🇩🇪', country: 'Germany',
        tips: [
          'Kraftfahrt-Bundesamt (KBA) regulates vehicle safety. File safety complaints at kba.de.',
          'Verbraucherzentrale provides free legal advice and can send formal warnings to dealers.',
          'Schlichtungsstelle Mobilität: free arbitration for vehicle disputes.',
          'Dieselgate: German courts have awarded compensation to owners — consult a Verbraucheranwalt.',
        ],
      },
      {
        flag: '🇨🇿', country: 'Czech Republic',
        tips: [
          'Škoda is headquartered in Mladá Boleslav — Czech consumer law is particularly relevant.',
          'Czech Trade Inspection Authority (ČOI) handles consumer product complaints including vehicle defects.',
          'File at coi.cz — Czech residents have strong warranty rights under EU consumer law.',
        ],
      },
      {
        flag: '🇮🇪', country: 'Ireland',
        tips: [
          'Competition and Consumer Protection Commission (CCPC) handles vehicle dealer complaints.',
          'Financial Services and Pensions Ombudsman (FSPO) for PCP/finance disputes.',
          'Small Claims Court: claims up to €2,000 — €25 filing fee.',
        ],
      },
      {
        flag: '🇦🇺', country: 'Australia',
        tips: [
          'Australian Consumer Law: mandatory statutory warranty regardless of manufacturer warranty.',
          'ACCC handles systemic complaints — they have previously acted on VW Group matters.',
          'State Fair Trading offices handle individual dealer disputes quickly.',
        ],
      },
      {
        flag: '🇮🇳', country: 'India',
        tips: [
          'Consumer Protection Act 2019 covers vehicle defects — file at consumerhelpline.gov.in.',
          'District Consumer Forum: free for claims under ₹50 lakh.',
          'Society of Indian Automobile Manufacturers (SIAM) mediates manufacturer disputes.',
        ],
      },
    ],
  },

  // ── Legal tracker ─────────────────────────────────────────────────────────
  legal: {
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&h=500&fit=crop',
    heroImageAlt: 'Legal documents and regulatory proceedings',
    headline: '⚖️ Legal & Regulatory Tracker',
    intro: 'A living record of regulatory actions, lawsuits, and consumer protection orders against Škoda and VW Group worldwide. Use this to understand your rights and find the right authority to escalate to.',
    sourceNote: 'All information sourced from official government, court, and regulatory records. Case summaries represent findings and allegations from those records. Last updated June 2026.',
    cases: [
      {
        id: 'dieselgate',
        status: 'resolved',
        statusLabel: 'Ongoing — settlements continuing',
        statusColor: 'green',
        flag: '🌍',
        jurisdiction: 'Worldwide',
        title: 'Dieselgate — VW Group Emissions Fraud',
        authority: 'US EPA, European Commission, UK CMA, Germany KBA, and regulators worldwide',
        filed: '2015',
        updated: '2026 (settlements still active in some markets)',
        summary: 'Volkswagen Group — Škoda\'s parent company — installed "defeat device" software in millions of diesel vehicles to cheat emissions tests. Affected Škoda models include the Octavia, Fabia, Superb, and Yeti with 1.2, 1.6, and 2.0 TDI engines produced between 2009 and 2015.',
        allegations: [
          'Installation of defeat device software to fraudulently pass emissions tests',
          'Vehicles produced 40× more NOx pollution than legally permitted in real-world conditions',
          'Systematic deception of regulators and consumers across multiple countries',
          'VW Group admitted the fraud in September 2015',
        ],
        outcome: 'VW Group has paid over $30 billion in fines, penalties, and settlements worldwide. UK owners were awarded compensation via group litigation. German courts have ruled VW must compensate owners. Settlements vary by country.',
        relevance: 'If you own a Škoda diesel manufactured between 2009–2015, check your VIN at volkswagen-info.co.uk (UK) or the equivalent national site. You may still be eligible for compensation in some jurisdictions.',
        sources: [
          { label: 'UK Group Litigation outcome', url: 'https://www.dieselclaim.co.uk' },
          { label: 'European Commission investigation', url: 'https://ec.europa.eu/commission/presscorner/detail/en/IP_16_3562' },
        ],
      },
      {
        id: 'pcp-misselling',
        status: 'active',
        statusLabel: 'Active — FCA Investigation',
        statusColor: 'red',
        flag: '🇬🇧',
        jurisdiction: 'United Kingdom',
        title: 'Motor Finance PCP Mis-selling — FCA Investigation',
        authority: 'Financial Conduct Authority (FCA)',
        filed: '2024',
        updated: '2026 (ongoing)',
        summary: 'The FCA is investigating whether motor finance companies including Skoda Finance / VW Financial Services paid hidden "discretionary commissions" to dealers on PCP and HP agreements, meaning dealers were incentivised to charge customers higher interest rates without disclosure. The Supreme Court ruled in 2024 that such arrangements were unlawful.',
        allegations: [
          'Dealers received hidden discretionary commission payments from finance providers',
          'Consumers were charged higher interest rates without informed consent',
          'Potential mis-selling affecting millions of PCP and HP agreements',
          'VW Financial Services (which includes Skoda Finance) is among the providers under review',
        ],
        outcome: 'The Supreme Court ruled in October 2024 that secret commissions on motor finance were unlawful. The FCA is reviewing the scale of redress. Compensation schemes are expected — potentially billions of pounds across the industry.',
        relevance: 'If you took out a PCP or HP agreement on a Škoda after 2007, you may be entitled to compensation. File a complaint with the Financial Ombudsman Service now to preserve your claim before any deadline.',
        sources: [
          { label: 'FCA motor finance review', url: 'https://www.fca.org.uk/consumers/car-finance-complaints' },
          { label: 'Financial Ombudsman complaints', url: 'https://www.financial-ombudsman.org.uk/consumers/complaints-can-help/car-finance' },
        ],
      },
      {
        id: 'dvsa-recalls',
        status: 'active',
        statusLabel: 'Multiple active recalls',
        statusColor: 'red',
        flag: '🇬🇧',
        jurisdiction: 'United Kingdom (+ EU equivalent)',
        title: 'DVSA Safety Recalls — Škoda Vehicles',
        authority: 'Driver and Vehicle Standards Agency (DVSA)',
        filed: 'Various',
        updated: '2026',
        summary: 'Škoda has been subject to multiple DVSA-mandated safety recalls covering airbag failures (Takata), fuel system faults, software issues, and structural defects. If a recall has not been completed on your vehicle, Škoda is legally obligated to carry out the repair at no cost.',
        allegations: [
          'Takata airbag inflator defects — affected Fabia, Octavia, Roomster models',
          'Fuel system and high-pressure pump failures in TDI engines',
          'Software update requirements for emissions compliance post-Dieselgate',
          'Various structural and brake system recalls on multiple model lines',
        ],
        outcome: 'Ongoing — recalls are compulsory. Škoda must repair affected vehicles free of charge regardless of warranty status.',
        relevance: 'Check if your Škoda is subject to an open recall at check-mot.service.gov.uk (UK) using your registration number. If Škoda has refused or delayed a recall repair, report to the DVSA immediately.',
        sources: [
          { label: 'Check your Škoda for recalls (UK)', url: 'https://check-mot.service.gov.uk' },
          { label: 'Report a safety defect to DVSA', url: 'https://www.gov.uk/report-a-faulty-vehicle' },
        ],
      },
      {
        id: 'cma-review',
        status: 'active',
        statusLabel: 'Under review',
        statusColor: 'red',
        flag: '🇬🇧',
        jurisdiction: 'United Kingdom',
        title: 'CMA — New Car Warranty & Extended Warranty Practices',
        authority: 'Competition and Markets Authority (CMA)',
        filed: '2024',
        updated: '2025',
        summary: 'The CMA has reviewed practices by car manufacturers and dealers relating to warranty terms, exclusions, and the pressure-selling of extended warranties. Concerns include warranty terms that require servicing exclusively at main dealers and clauses that void warranties for legitimate consumer actions.',
        allegations: [
          'Warranty terms requiring exclusive dealer servicing that may breach consumer law',
          'Misleading warranty exclusions being applied to legitimate claims',
          'Extended warranty products with poor value and high-pressure sales tactics',
        ],
        outcome: 'CMA guidance issued to manufacturers requiring review of unfair warranty terms. Ongoing monitoring.',
        relevance: 'If your Škoda warranty was voided for using an independent garage or genuine parts, this may be unlawful under UK consumer law. Contact the CMA or Citizens Advice.',
        sources: [
          { label: 'CMA motor warranties guidance', url: 'https://www.gov.uk/cma-cases/motor-vehicles' },
        ],
      },
    ],
  },

  // ── Social media contacts ─────────────────────────────────────────────────
  contacts: {
    headline: '📱 Škoda Social Media Contacts',
    intro: 'All verified Škoda and VW Group social media accounts — global and regional. Accounts marked ⚡ Best for complaints have the highest response rates. All handles verified June 2026.',
    strategyTip: 'The most effective escalation is a post tagging @SkodaUK (or your regional account) and @Skoda simultaneously — include your registration number, VIN, fault description, and a photo. Public posts with vehicle details get escalated to regional customer relations teams.',
    missingText: "Know an official Škoda social account for your country that isn't listed? Submit it via the country directory page using the Contribute button.",
    globalAccounts: {
      skoda: {
        label: 'Škoda (Global)',
        note: "Škoda's main global brand accounts",
        accounts: [
          { platform: 'X / Twitter', handle: '@Skoda', url: 'https://x.com/Skoda', badge: '⚡ Tag in complaints', note: 'Global Škoda brand account. Tag alongside your regional account.' },
          { platform: 'Instagram', handle: '@skoda', url: 'https://www.instagram.com/skoda/', note: 'Global Instagram. DM or comment with photos of defects.' },
          { platform: 'Facebook', handle: 'Škoda Auto', url: 'https://www.facebook.com/skoda', note: 'Global Facebook page. Post on timeline or send a direct message.' },
          { platform: 'LinkedIn', handle: 'Škoda Auto', url: 'https://www.linkedin.com/company/skoda-auto', note: 'Executive escalation. Connect with regional managers.' },
          { platform: 'YouTube', handle: 'Škoda Auto', url: 'https://www.youtube.com/user/SkodaAuto', note: 'Comment on recent videos for public visibility.' },
        ],
      },
      vwgroup: {
        label: 'VW Group (Corporate parent)',
        note: 'Escalation to VW Group if Škoda-level response fails',
        accounts: [
          { platform: 'X / Twitter', handle: '@VWGroup', url: 'https://x.com/VWGroup', badge: '⚡ Senior escalation', note: 'Tag if Škoda UK/regional has failed to respond. VW Group owns Škoda.' },
          { platform: 'LinkedIn', handle: 'Volkswagen Group', url: 'https://www.linkedin.com/company/volkswagen-group', note: 'Executive escalation to VW Group leadership.' },
        ],
      },
    },
    regionalAccounts: [
      {
        region: '🇬🇧 United Kingdom',
        accounts: [
          { platform: 'X / Twitter', handle: '@SkodaUK', url: 'https://x.com/SkodaUK', badge: '⚡ Primary UK escalation' },
          { platform: 'Facebook', handle: 'Škoda UK', url: 'https://www.facebook.com/SkodaUK', note: 'UK customer service via Messenger' },
          { platform: 'Instagram', handle: '@skodauk', url: 'https://www.instagram.com/skodauk/' },
        ],
      },
      {
        region: '🇩🇪 Germany',
        accounts: [
          { platform: 'X / Twitter', handle: '@Skoda_DE', url: 'https://x.com/Skoda_DE', badge: '⚡ Primary DE escalation' },
          { platform: 'Instagram', handle: '@skoda_de', url: 'https://www.instagram.com/skoda_de/' },
        ],
      },
      {
        region: '🇮🇪 Ireland',
        accounts: [
          { platform: 'Facebook', handle: 'Škoda Ireland', url: 'https://www.facebook.com/SkodaIreland', badge: '⚡ Primary IE escalation' },
        ],
      },
      {
        region: '🇦🇺 Australia',
        accounts: [
          { platform: 'Facebook', handle: 'Škoda Australia', url: 'https://www.facebook.com/SkodaAustralia', badge: '⚡ Primary AU escalation' },
          { platform: 'Instagram', handle: '@skodaaustralia', url: 'https://www.instagram.com/skodaaustralia/' },
        ],
      },
      {
        region: '🇮🇳 India',
        accounts: [
          { platform: 'X / Twitter', handle: '@SkodaIndia', url: 'https://x.com/SkodaIndia', badge: '⚡ Primary IN escalation' },
          { platform: 'Instagram', handle: '@skodaindia', url: 'https://www.instagram.com/skodaindia/' },
        ],
      },
    ],
  },

  // ── Directory email template ───────────────────────────────────────────────
  emailTemplate: (countryName, currencyCode) => `Subject: Formal Complaint — Unresolved Škoda Vehicle Dispute

Dear [Executive Name / Customer Relations],

I am writing to formally document an unresolved dispute regarding my Škoda vehicle in ${countryName}.

Vehicle details:
- Registration: [YOUR REG]
- VIN: [YOUR VIN]
- Model / Year: [MODEL, YEAR]
- Purchase / Finance date: [DATE]

Issue:
- Date problem first occurred: [DATE]
- Description: [e.g. "Warranty claim for gearbox failure refused despite vehicle being within 3-year warranty period"]
- Amount in dispute: [AMOUNT] ${currencyCode || ''}
- Reference numbers: [dealer ref, case numbers]

I have attached supporting evidence including [photos / service records / correspondence].

I am giving 14 days to resolve this before escalating to:
- The Motor Ombudsman (for warranty/dealer disputes)
- The Financial Ombudsman Service (for finance disputes)
- Trading Standards / my national consumer authority

Please confirm receipt and provide a resolution timeline.

Yours sincerely,
[YOUR NAME]
[YOUR EMAIL]
[YOUR ADDRESS]`,

  // ── llms.txt ───────────────────────────────────────────────────────────────
  llmsTxt: `# SkodaCheats

> A public database of Škoda warranty failures, PCP mis-selling, dealer fraud, and unresolved service disputes.

SkodaCheats is an independent consumer advocacy site for Škoda vehicle owners. Users submit documented complaints about warranty refusals, PCP/HP finance mis-selling, dealer fraud, safety recall failures, and service overcharging. All cases are permanent public records.

## What this site contains

- Individual complaint pages at /complaints/[id]
- A global recourse directory at /directory with country-specific executives, finance providers, and regulators
- A step-by-step dispute guide at /guide covering Motor Ombudsman, FCA, DVSA, and small claims
- A regulatory tracker at /legal covering Dieselgate, PCP mis-selling, and DVSA recalls
- All verified Škoda social media contacts at /skoda-contacts

## Who created this

SkodaCheats was created by affected Škoda owners. It is not affiliated with Škoda Auto a.s. or Volkswagen Group.

## Key URLs

- Homepage: https://www.skodacheats.info
- Individual case: https://www.skodacheats.info/complaints/{id}
- Sitemap: https://www.skodacheats.info/sitemap.xml`,

}

module.exports = BRAND
