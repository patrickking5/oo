// next.config.ts
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // disable PWA in dev
});

const nextConfig = {
  experimental: {
    appDir: true,
  },
  // add any other Next.js config here
};

module.exports = withPWA(nextConfig);
