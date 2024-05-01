import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:locale/kategori/:slug*",
        destination: "/:locale/category/:slug*",
      },
      {
        source: "/:locale/urun/:slug*",
        destination: "/:locale/product/:slug*",
      },
    ]
  },
}

export default withNextIntl(nextConfig)
