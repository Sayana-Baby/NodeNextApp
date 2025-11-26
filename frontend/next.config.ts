import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/your_cloud_name/image/upload/**', // IMPORTANT: Replace "your_cloud_name" with your actual Cloudinary cloud name
      },
    ],
  },
};

export default nextConfig;
