/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8080/:path*",
    },
  ],
};

export default nextConfig;
