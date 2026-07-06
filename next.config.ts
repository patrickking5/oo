// next.config.ts
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // disable PWA in dev
});

const nextConfig = {};

module.exports = withPWA(nextConfig);
