/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "", // Leave empty if not using a specific port
        pathname: "/**", // This allows all paths under the domain
      },
    ],
  },
};

export default nextConfig;
