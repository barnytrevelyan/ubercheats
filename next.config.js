/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Canonical: always www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ubercheats.info' }],
        destination: 'https://www.ubercheats.info/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
