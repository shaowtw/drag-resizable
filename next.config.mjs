/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // domains: ['localhost', 'https://10pct-img-storage.s3.ap-northeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://10pct-img-storage.s3.ap-northeast-1.amazonaws.com',
        port: '',
        pathname: '/tenant/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
