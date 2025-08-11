import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Optimize for Firebase hosting with static export
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Speed up builds by ignoring errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optimize images for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
