-- ============================================================
-- Migration: Global Directory
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Regions
CREATE TABLE IF NOT EXISTS regions (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

INSERT INTO regions (name, slug) VALUES
  ('Africa',        'africa'),
  ('Asia Pacific',  'asia-pacific'),
  ('Europe',        'europe'),
  ('Latin America', 'latin-america'),
  ('Middle East',   'middle-east'),
  ('North America', 'north-america')
ON CONFLICT (slug) DO NOTHING;

-- 2. Countries
CREATE TABLE IF NOT EXISTS countries (
  id           SERIAL PRIMARY KEY,
  region_id    INT REFERENCES regions(id),
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  flag_emoji   TEXT,
  currency_code TEXT,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO countries (region_id, name, slug, flag_emoji, currency_code) VALUES
  -- Africa
  ((SELECT id FROM regions WHERE slug='africa'), 'Kenya',         'kenya',         '🇰🇪', 'KES'),
  ((SELECT id FROM regions WHERE slug='africa'), 'Nigeria',       'nigeria',       '🇳🇬', 'NGN'),
  ((SELECT id FROM regions WHERE slug='africa'), 'South Africa',  'south-africa',  '🇿🇦', 'ZAR'),
  ((SELECT id FROM regions WHERE slug='africa'), 'Ghana',         'ghana',         '🇬🇭', 'GHS'),
  ((SELECT id FROM regions WHERE slug='africa'), 'Egypt',         'egypt',         '🇪🇬', 'EGP'),
  -- Asia Pacific
  ((SELECT id FROM regions WHERE slug='asia-pacific'), 'Australia',    'australia',    '🇦🇺', 'AUD'),
  ((SELECT id FROM regions WHERE slug='asia-pacific'), 'India',        'india',        '🇮🇳', 'INR'),
  ((SELECT id FROM regions WHERE slug='asia-pacific'), 'Japan',        'japan',        '🇯🇵', 'JPY'),
  ((SELECT id FROM regions WHERE slug='asia-pacific'), 'New Zealand',  'new-zealand',  '🇳🇿', 'NZD'),
  ((SELECT id FROM regions WHERE slug='asia-pacific'), 'Singapore',    'singapore',    '🇸🇬', 'SGD'),
  -- Europe
  ((SELECT id FROM regions WHERE slug='europe'), 'France',         'france',         '🇫🇷', 'EUR'),
  ((SELECT id FROM regions WHERE slug='europe'), 'Germany',        'germany',        '🇩🇪', 'EUR'),
  ((SELECT id FROM regions WHERE slug='europe'), 'Ireland',        'ireland',        '🇮🇪', 'EUR'),
  ((SELECT id FROM regions WHERE slug='europe'), 'Italy',          'italy',          '🇮🇹', 'EUR'),
  ((SELECT id FROM regions WHERE slug='europe'), 'Spain',          'spain',          '🇪🇸', 'EUR'),
  ((SELECT id FROM regions WHERE slug='europe'), 'United Kingdom', 'united-kingdom', '🇬🇧', 'GBP'),
  -- Latin America
  ((SELECT id FROM regions WHERE slug='latin-america'), 'Brazil',  'brazil',  '🇧🇷', 'BRL'),
  ((SELECT id FROM regions WHERE slug='latin-america'), 'Mexico',  'mexico',  '🇲🇽', 'MXN'),
  ((SELECT id FROM regions WHERE slug='latin-america'), 'Colombia','colombia','🇨🇴', 'COP'),
  ((SELECT id FROM regions WHERE slug='latin-america'), 'Chile',   'chile',   '🇨🇱', 'CLP'),
  -- Middle East
  ((SELECT id FROM regions WHERE slug='middle-east'), 'UAE',          'uae',          '🇦🇪', 'AED'),
  ((SELECT id FROM regions WHERE slug='middle-east'), 'Saudi Arabia', 'saudi-arabia', '🇸🇦', 'SAR'),
  -- North America
  ((SELECT id FROM regions WHERE slug='north-america'), 'Canada',        'canada',        '🇨🇦', 'CAD'),
  ((SELECT id FROM regions WHERE slug='north-america'), 'United States', 'united-states', '🇺🇸', 'USD')
ON CONFLICT (slug) DO NOTHING;

-- 3. Directory entries (executives, payment partners, regulators)
CREATE TABLE IF NOT EXISTS directory_entries (
  id            BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  country_id    INT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  section       TEXT NOT NULL CHECK (section IN ('executive','payment_partner','regulator')),
  role_or_type  TEXT,
  name          TEXT NOT NULL,
  notes         TEXT,
  contact_url   TEXT,
  source_url    TEXT,
  verified      BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_directory_entries_country ON directory_entries(country_id);
CREATE INDEX IF NOT EXISTS idx_directory_entries_section ON directory_entries(section);

-- 4. Community contributions (pending moderation)
CREATE TABLE IF NOT EXISTS directory_contributions (
  id                BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  country_id        INT REFERENCES countries(id),
  section           TEXT CHECK (section IN ('executive','payment_partner','regulator')),
  role_or_type      TEXT,
  name              TEXT NOT NULL,
  notes             TEXT,
  contact_url       TEXT,
  source_url        TEXT,
  submitted_by_email TEXT,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RLS
ALTER TABLE regions              ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries             ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_entries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read regions"               ON regions              FOR SELECT USING (true);
CREATE POLICY "Public read countries"             ON countries            FOR SELECT USING (true);
CREATE POLICY "Public read verified entries"      ON directory_entries    FOR SELECT USING (verified = true);
CREATE POLICY "Public insert contributions"       ON directory_contributions FOR INSERT WITH CHECK (true);
-- Contributions are read-only to public (no exposing other users' email submissions)
CREATE POLICY "No public read contributions"      ON directory_contributions FOR SELECT USING (false);

GRANT SELECT ON regions, countries, directory_entries TO anon, authenticated;
GRANT INSERT ON directory_contributions TO anon, authenticated;
GRANT USAGE ON SEQUENCE directory_contributions_id_seq TO anon, authenticated;

-- ============================================================
-- SEED DATA
-- ============================================================

-- ── United Kingdom ──────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'executive', 'General Manager, UK & Ireland',
   'Matthew Price',
   'Primary escalation contact for systemic UK support failures. Reachable via LinkedIn.',
   'https://www.linkedin.com/search/results/people/?keywords=matthew+price+uber+uk', 1),
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'payment_partner', 'Primary Payment Processor',
   'Adyen',
   'Uber Eats UK processes payments through Adyen. If Uber blocks your refund, your card issuer can raise a chargeback (Visa/Mastercard) or Section 75 claim (credit cards over £100) directly.',
   'https://www.adyen.com', 1),
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'payment_partner', 'Bank Dispute Route',
   'Your Card Issuer (Visa / Mastercard)',
   'Under UK consumer law, contact your bank to dispute the charge. For credit card purchases over £100, Section 75 of the Consumer Credit Act makes your bank jointly liable.',
   NULL, 2),
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'regulator', 'Consumer Protection',
   'Competition and Markets Authority (CMA)',
   'Report systemic app support failures, unfair contract terms, or recurring billing fraud patterns.',
   'https://www.gov.uk/government/organisations/competition-and-markets-authority', 1),
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'regulator', 'Financial Regulator',
   'Financial Conduct Authority (FCA)',
   'Regulates Uber''s payment processing partners. Report if a regulated firm facilitated an unresolved payment dispute.',
   'https://www.fca.org.uk/consumers/report-information-about-firm', 2),
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'regulator', 'Alternative Dispute Resolution',
   'Financial Ombudsman Service',
   'Free, independent service. If your bank refuses to reverse a charge, escalate to the Ombudsman. Uber''s PSP is obligated to respond.',
   'https://www.financial-ombudsman.org.uk', 3),
  ((SELECT id FROM countries WHERE slug='united-kingdom'), 'regulator', 'Trading Standards',
   'Citizens Advice / Trading Standards',
   'Report misleading refund practices and consumer rights violations. Trading Standards can prosecute businesses.',
   'https://www.citizensadvice.org.uk/consumer/get-more-help/report-to-trading-standards/', 4);

-- ── Kenya ───────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='kenya'), 'executive', 'General Manager, East Africa',
   'Imran Manji',
   'Country lead for Uber Eats Kenya. Reachable via LinkedIn. Executive escalation is effective for unresolved cases involving M-Pesa payment failures.',
   'https://www.linkedin.com/search/results/people/?keywords=imran+manji+uber', 1),
  ((SELECT id FROM countries WHERE slug='kenya'), 'executive', 'Regional General Manager, Sub-Saharan Africa',
   'Frans Hiemstra',
   'Regional escalation above country level. Copy on executive LinkedIn messages if country-level escalation fails.',
   'https://www.linkedin.com/search/results/people/?keywords=frans+hiemstra+uber', 2),
  ((SELECT id FROM countries WHERE slug='kenya'), 'payment_partner', 'Primary Mobile Payment',
   'M-Pesa (Safaricom)',
   'Most Uber Eats Kenya charges flow via M-Pesa. If Uber doesn''t refund, call M-Pesa on 0722 000 100 and initiate a merchant dispute with your transaction code (e.g., SL7XXXXXXX).',
   'https://www.safaricom.co.ke/personal/m-pesa', 1),
  ((SELECT id FROM countries WHERE slug='kenya'), 'payment_partner', 'Card Payment Processor',
   'Flutterwave / Stripe',
   'Card payments (Visa/Mastercard) processed via Flutterwave or Stripe. Contact your bank to initiate a chargeback for unresolved disputes.',
   NULL, 2),
  ((SELECT id FROM countries WHERE slug='kenya'), 'regulator', 'Consumer Protection',
   'Competition Authority of Kenya (CAK)',
   'File complaints about deceptive or unfair trading practices. CAK can investigate and fine Uber for systemic consumer harm.',
   'https://www.cak.go.ke', 1),
  ((SELECT id FROM countries WHERE slug='kenya'), 'regulator', 'Financial Regulator',
   'Central Bank of Kenya (CBK)',
   'Regulates M-Pesa and all mobile money operators. Report unresolved payment disputes involving M-Pesa transactions.',
   'https://www.centralbank.go.ke/consumer-protection/', 2),
  ((SELECT id FROM countries WHERE slug='kenya'), 'regulator', 'Communications Regulator',
   'Communications Authority of Kenya (CA)',
   'Regulates digital platforms and app-based services. File a complaint if Uber''s app systematically misleads consumers.',
   'https://www.ca.go.ke', 3);

-- ── United States ────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='united-states'), 'executive', 'CEO, Uber Technologies',
   'Dara Khosrowshahi',
   'Final executive escalation. Public email format: first.last@uber.com. Reachable via LinkedIn.',
   'https://www.linkedin.com/in/dara-khosrowshahi-2a39a94/', 1),
  ((SELECT id FROM countries WHERE slug='united-states'), 'payment_partner', 'Primary Payment Processor',
   'Braintree (PayPal)',
   'Uber US processes most transactions via Braintree. Dispute via your card issuer — Visa/Mastercard chargebacks are highly effective. Timeframe: 60–120 days from transaction date.',
   'https://www.braintreepayments.com', 1),
  ((SELECT id FROM countries WHERE slug='united-states'), 'payment_partner', 'Card Network Dispute',
   'Your Bank / Card Issuer',
   'US consumers can initiate a chargeback under Regulation E (debit) or Regulation Z (credit). Call the number on the back of your card.',
   NULL, 2),
  ((SELECT id FROM countries WHERE slug='united-states'), 'regulator', 'Consumer Protection',
   'Federal Trade Commission (FTC)',
   'Report unfair or deceptive practices. FTC complaints build the federal record that triggers investigations.',
   'https://reportfraud.ftc.gov', 1),
  ((SELECT id FROM countries WHERE slug='united-states'), 'regulator', 'Financial Regulator',
   'Consumer Financial Protection Bureau (CFPB)',
   'Handles complaints about payment disputes, billing errors, and financial harm. CFPB complaints require a company response within 15 days.',
   'https://www.consumerfinance.gov/complaint/', 2),
  ((SELECT id FROM countries WHERE slug='united-states'), 'regulator', 'State Attorney General',
   'Your State Attorney General',
   'File a consumer complaint with your state AG. AGs have sued Uber before. Find yours at naag.org.',
   'https://www.naag.org/find-my-ag/', 3),
  ((SELECT id FROM countries WHERE slug='united-states'), 'regulator', 'Small Claims Court',
   'Your Local Small Claims Court',
   'For disputes under $5,000–$10,000 (varies by state), small claims court is fast, cheap, and highly effective. Uber almost always settles before the hearing.',
   'https://www.uscourts.gov/legal-topics/small-claims', 4);

-- ── Australia ────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='australia'), 'payment_partner', 'Primary Payment Processor',
   'Adyen / Stripe',
   'Uber Eats Australia processes via Adyen and Stripe. Initiate a chargeback through your bank. Under Australian Consumer Law (ACL), you are entitled to a refund for services not delivered.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='australia'), 'regulator', 'Consumer Protection',
   'Australian Competition and Consumer Commission (ACCC)',
   'File complaints about systemic refund failures under the Australian Consumer Law. ACCC can take Uber to court.',
   'https://www.accc.gov.au/consumers/complaints-and-problems/make-a-complaint', 1),
  ((SELECT id FROM countries WHERE slug='australia'), 'regulator', 'Financial Regulator',
   'Australian Financial Complaints Authority (AFCA)',
   'If your bank refuses to process your chargeback, escalate to AFCA. Free, independent, and legally binding.',
   'https://www.afca.org.au/make-a-complaint', 2),
  ((SELECT id FROM countries WHERE slug='australia'), 'regulator', 'Fair Trading (State)',
   'NSW Fair Trading / Consumer Affairs Victoria',
   'State-level consumer agencies. File locally for faster resolution. Each state has its own agency.',
   'https://www.fairtrading.nsw.gov.au/help-centre/online-tools/make-a-complaint', 3);

-- ── India ────────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='india'), 'payment_partner', 'UPI Payment',
   'NPCI / UPI (PhonePe, GPay, Paytm)',
   'Most Uber Eats India payments go via UPI. Raise a dispute directly in your UPI app (PhonePe, Google Pay, or Paytm) using the transaction reference number.',
   'https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism', 1),
  ((SELECT id FROM countries WHERE slug='india'), 'payment_partner', 'Card Processing',
   'Razorpay',
   'Card payments processed via Razorpay. Contact your bank for chargeback on Visa/Mastercard transactions.',
   NULL, 2),
  ((SELECT id FROM countries WHERE slug='india'), 'regulator', 'Consumer Protection',
   'National Consumer Helpline (NCH)',
   'Call 1800-11-4000 (toll-free) or file online at consumerhelpline.gov.in. Uber is registered and must respond.',
   'https://consumerhelpline.gov.in', 1),
  ((SELECT id FROM countries WHERE slug='india'), 'regulator', 'Consumer Forum',
   'District Consumer Disputes Redressal Commission',
   'File under the Consumer Protection Act 2019. Free for claims under ₹50 lakh. Uber must compensate for service deficiency.',
   'https://edaakhil.nic.in', 2),
  ((SELECT id FROM countries WHERE slug='india'), 'regulator', 'Financial Regulator',
   'Reserve Bank of India (RBI)',
   'Report unresolved digital payment disputes. RBI''s Banking Ombudsman handles complaints against payment processors.',
   'https://www.rbi.org.in/Scripts/Complaints.aspx', 3);

-- ── Nigeria ──────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='nigeria'), 'payment_partner', 'Card Processing',
   'Paystack / Flutterwave',
   'Uber Eats Nigeria processes card payments via Paystack or Flutterwave. Contact your bank (GTBank, Access, Zenith, etc.) to initiate a chargeback dispute.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='nigeria'), 'regulator', 'Consumer Protection',
   'Federal Competition and Consumer Protection Commission (FCCPC)',
   'File a formal complaint at fccpc.gov.ng. FCCPC has jurisdiction over digital platforms operating in Nigeria.',
   'https://fccpc.gov.ng/consumer-complaint/', 1),
  ((SELECT id FROM countries WHERE slug='nigeria'), 'regulator', 'Financial Regulator',
   'Central Bank of Nigeria (CBN)',
   'Regulates all payment processors. Report unresolved payment disputes via the CBN Consumer Protection helpline: 07002255226.',
   'https://www.cbn.gov.ng/ConsumerProtection/', 2);

-- ── South Africa ────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='south-africa'), 'payment_partner', 'Card Processing',
   'PayU / Peach Payments',
   'Uber Eats SA card transactions processed via PayU or Peach Payments. Contact your bank (Nedbank, FNB, ABSA, Standard Bank) for a chargeback.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='south-africa'), 'regulator', 'Consumer Protection',
   'National Consumer Commission (NCC)',
   'File under the Consumer Protection Act 68 of 2008. Uber must respond or face penalties.',
   'https://www.thencc.gov.za/file-a-complaint/', 1),
  ((SELECT id FROM countries WHERE slug='south-africa'), 'regulator', 'Financial Regulator',
   'Financial Sector Conduct Authority (FSCA)',
   'Regulates payment service providers. Report if your payment dispute was mishandled by Uber''s processor.',
   'https://www.fsca.co.za/Complaints/Pages/Lodge-a-Complaint.aspx', 2);

-- ── Germany ─────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='germany'), 'payment_partner', 'Payment Processor',
   'Adyen',
   'Uber Eats DE uses Adyen for card processing. Your bank can initiate a SEPA chargeback for direct debit or card issuer dispute for Visa/Mastercard.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='germany'), 'regulator', 'Consumer Protection',
   'Verbraucherzentrale (Consumer Advice Centre)',
   'Free legal advice and complaint assistance. Verbraucherzentrale can send formal legal warnings (Abmahnungen) to Uber on your behalf.',
   'https://www.verbraucherzentrale.de', 1),
  ((SELECT id FROM countries WHERE slug='germany'), 'regulator', 'Data Protection',
   'Bundesdatenschutzbeauftragter (BfDI)',
   'Germany''s federal data protection authority. Report GDPR violations — Uber''s data practices are subject to German enforcement.',
   'https://www.bfdi.bund.de/EN/Home/home_node.html', 2);

-- ── France ──────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='france'), 'payment_partner', 'Payment Processor',
   'Adyen',
   'Uber Eats FR processes via Adyen. Dispute via your bank or credit card issuer. EU consumer protection law (EU Directive 2011/83) entitles you to refunds.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='france'), 'regulator', 'Consumer Protection',
   'Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes (DGCCRF)',
   'France''s consumer fraud authority. File online at signal.conso.gouv.fr',
   'https://signal.conso.gouv.fr', 1),
  ((SELECT id FROM countries WHERE slug='france'), 'regulator', 'Online Dispute Resolution',
   'European ODR Platform',
   'EU-wide online dispute resolution for cross-border e-commerce disputes. Uber must participate.',
   'https://ec.europa.eu/consumers/odr/', 2);

-- ── UAE ─────────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='uae'), 'payment_partner', 'Payment Processor',
   'Network International / Checkout.com',
   'Uber Eats UAE card payments processed via Network International or Checkout.com. Contact your bank (Emirates NBD, ADCB, FAB) for a chargeback.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='uae'), 'regulator', 'Consumer Protection',
   'Ministry of Economy — Consumer Protection Department',
   'File a formal complaint at consumerrights.ae. Uber UAE must respond to Ministry complaints.',
   'https://www.consumerrights.ae', 1),
  ((SELECT id FROM countries WHERE slug='uae'), 'regulator', 'Financial Regulator',
   'Central Bank of the UAE',
   'Regulates payment processors and card networks in the UAE. File disputes for unresolved payment issues.',
   'https://www.centralbank.ae/en/complaint-consumer', 2);

-- ── Canada ──────────────────────────────────────────────────
INSERT INTO directory_entries (country_id, section, role_or_type, name, notes, contact_url, display_order) VALUES
  ((SELECT id FROM countries WHERE slug='canada'), 'payment_partner', 'Payment Processor',
   'Braintree (PayPal) / Stripe',
   'Uber Canada processes via Braintree or Stripe. Contact your bank for a chargeback. Under Canadian consumer law, your card issuer must investigate.',
   NULL, 1),
  ((SELECT id FROM countries WHERE slug='canada'), 'regulator', 'Consumer Protection',
   'Competition Bureau Canada',
   'File complaints about deceptive marketing or unfair refund practices at competitionbureau.gc.ca.',
   'https://www.competitionbureau.gc.ca/eic/site/cb-bc.nsf/eng/04145.html', 1),
  ((SELECT id FROM countries WHERE slug='canada'), 'regulator', 'Financial Regulator',
   'Financial Consumer Agency of Canada (FCAC)',
   'Handles complaints about payment disputes and financial harm. FCAC can require banks to process legitimate chargebacks.',
   'https://www.canada.ca/en/financial-consumer-agency/services/complaints.html', 2);

