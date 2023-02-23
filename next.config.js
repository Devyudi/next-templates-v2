/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3501',
        pathname: '/public',
      },
    ],
  },
}
const withPWA = require('next-pwa')({
  dest: 'public',
});


/**
 * @description custom URL with rewrite URL
 * @type {{rewrites(): Promise<[{destination: string, source: string},{destination: string, source: string}]>}}
 */
module.exports = {
  async rewrites(){
    return [
      {
        source:"/profile",
        destination: "/my-profile"
      },
      {
        source:"/rss",
        destination:"/sitemap.xml"
      }
    ]
  }
}

module.exports = {
  ...nextConfig,
  ...withPWA,
}
