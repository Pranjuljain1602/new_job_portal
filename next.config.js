/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'plus.unsplash.com',
      'assets.website-files.com',
      'media.licdn.com',
      'randomuser.me'
    ],
  },
}

module.exports = nextConfig 