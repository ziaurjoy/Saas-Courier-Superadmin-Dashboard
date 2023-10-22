const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: false, /* Set false to prevent duplicate api calls */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async headers() {
    return [
      {
        source: '/:all*(eot|woff|woff2|ttf|svg|png|jpg|gif|webp|jpeg|js|css)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
