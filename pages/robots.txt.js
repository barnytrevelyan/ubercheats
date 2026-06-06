const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubercheats.info'

export async function getServerSideProps({ res }) {
  const robots = `User-agent: *
Allow: /
Disallow: /my-complaints
Disallow: /auth/

Sitemap: ${SITE_URL}/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return { props: {} }
}

export default function Robots() {
  return null
}
