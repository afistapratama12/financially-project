/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self';
//   child-src example.com;
//   style-src 'self' example.com;
//   font-src 'self';  
// `

const securityHeaders = [
  // {
  //   key: 'X-DNS-Prefetch-Control', // <-- error jika pakai postman
  //   value: 'on',
  // },
  // {
  //   key: 'Strict-Transport-Security',
  //   value: 'max-age=31536000; includeSubDomains; preload',
  // },
  // {
  //   key: 'X-Frame-Options',
  //   value: 'SAMEORIGIN',
  // },
  // {
  //   key: 'X-Content-Type-Options',
  //   value: 'nosniff',
  // },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // {
  //   key: 'Referrer-Policy',
  //   value: 'same-origin',
  // },
  // {
  //   key: 'Permissions-Policy',
  //   value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  // }
  // {
  //   key: 'Content-Security-Policy',
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  // }
]

module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  }
}
