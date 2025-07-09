/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/akiba",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
