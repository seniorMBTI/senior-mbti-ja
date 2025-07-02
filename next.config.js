/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return `enhanced-deploy-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig