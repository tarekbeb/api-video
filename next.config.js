/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VIDEO_API_TOKEN: process.env.VIDEO_API_TOKEN,
    VIDEO_API_UPLOAD_TOKEN: process.env.VIDEO_API_UPLOAD_TOKEN,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
