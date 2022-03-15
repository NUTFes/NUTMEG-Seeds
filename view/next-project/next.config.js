/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
  },
  env: {
    //SSR_API_URI: isProd ? 'https://seeds-api.nutfes.net' : 'http://seeds_api:3000',
    //CSR_API_URI: isProd ? 'https://seeds-api.nutfes.net' : 'http://localhost:3000',
    SSR_API_URI: isProd ? 'http://seeds_api:3000' : 'http://seeds_api:3000',
    CSR_API_URI: isProd ? 'http://localhost:3000' : 'http://localhost:3000',
  },
};
