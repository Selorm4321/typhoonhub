import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Optimize for Firebase hosting with static export
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Speed up builds
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Reduce build time
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
