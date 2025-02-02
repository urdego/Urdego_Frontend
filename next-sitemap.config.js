/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://urdego-fe.vercel.app', // 배포된 사이트 도메인
  generateRobotsTxt: true, // robots.txt 자동 생성
  sitemapSize: 5000, // 한 개의 sitemap에 포함될 최대 URL 수
  changefreq: 'daily', // 페이지 변경 빈도
  priority: 0.7, // 페이지 우선순위 (0.0 ~ 1.0)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://urdego-fe.vercel.app/sitemap.xml'],
  },
};
