/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api",
        destination: `http://backend:4000`,
      },
    ];
  },
};

export default nextConfig;
