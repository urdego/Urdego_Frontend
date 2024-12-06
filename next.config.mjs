/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: 'http://3.39.135.47:8083/group-service/:path*', // ws:// 대신 http:// 사용
      },
    ];
  },
};

export default nextConfig;
