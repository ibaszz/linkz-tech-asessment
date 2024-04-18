/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api-be/:slug*",
        destination: `${process.env.NEXT_PUBLIC_API}/:slug*`,
      },
    ];
  },
};

export default nextConfig;
