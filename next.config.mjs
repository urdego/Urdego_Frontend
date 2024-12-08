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
        destination: `${
          process.env.NODE_ENV === 'development'
            ? 'http://3.39.135.47:8083/group-service/:path*' // 개발 환경
            : 'https://urdego.com/api/group-service/:path*' // 프로덕션 환경
        }`,
      },
    ];
  },
  images: {
    domains: ['urdego.s3.ap-southeast-2.amazonaws.com'],
  },
};

export default nextConfig;
