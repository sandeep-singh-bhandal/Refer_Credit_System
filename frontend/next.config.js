/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Turbopack disabled
    // @ts-ignore
    turbo: false
  },
  future: {
    webpack5: true, // force Webpack instead of Turbopack
  }
};

module.exports = nextConfig;
