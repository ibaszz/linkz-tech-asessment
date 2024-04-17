/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api-be/:slug*",
        destination: `http://localhost:4000/:slug*`,
      },
    ];
  },
};

export default nextConfig;
