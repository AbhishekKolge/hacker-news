/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ENV: 'development',
    BASE_URL: 'https://hn.algolia.com/api/v1',
  },
};

module.exports = nextConfig;
