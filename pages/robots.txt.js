const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

export async function getServerSideProps({ res }) {
  const robots = `User-agent: *
Allow: /
Disallow: /my-complaints
Disallow: /auth/
Disallow: /admin/

# AI search crawlers welcome
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return { props: {} }
}

export default function Robots() { return null }
