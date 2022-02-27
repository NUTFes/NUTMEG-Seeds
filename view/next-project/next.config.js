/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
  },
  env: {
    SEEDS_API_URI: isProd ? "http://seeds-api.nutfes.net" : "http://localhost:3000"
  }
};
