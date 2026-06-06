import { createClient } from '@supabase/supabase-js'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubercheats.info'

function generateSitemap(complaints) {
  const staticPages = [
    { url: SITE_URL, changefreq: 'daily', priority: '1.0' },
  ]

  const complaintPages = complaints.map((c) => ({
    url: `${SITE_URL}/complaints/${c.id}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: c.updated_at || c.created_at,
  }))

  const allPages = [...staticPages, ...complaintPages]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    ${p.lastmod ? `<lastmod>${new Date(p.lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: complaints } = await supabase
    .from('complaints')
    .select('id, created_at, updated_at')
    .order('created_at', { ascending: false })

  const sitemap = generateSitemap(complaints || [])

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
