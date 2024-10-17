/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "", // Leave empty if not using a specific port
        pathname: "/**", // This allows all paths under the domain
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**", // Allow all paths for Firebase storage
      },
      // You can add more hostnames in the same way if needed
    ],
  },
};

export default nextConfig;
