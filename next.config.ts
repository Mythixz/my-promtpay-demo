import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.omise.co', 'api.omise.co'], // ✅ เพิ่มทั้งสอง
  },
};

export default nextConfig;
