import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  openAnalyzer:true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  async rewrites() {
    return [
      {
        source: '/group-service/:path*',
        destination: `${
          process.env.NODE_ENV === 'development'
            ? 'http://3.39.135.47:8083/group-service/:path*'
            : 'https://urdego.com/api/group-service/:path*'
        }`,
      },
    ];
  },
  images: {
    domains: ['urdego.s3.ap-southeast-2.amazonaws.com'],
  },
};

export default withBundleAnalyzer(nextConfig);