import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.urdego.urdego',
  appName: 'urdego',
  webDir: 'out', // NextJS의 출력 디렉토리 (정적 내보내기 시)
  server: {
    // 개발 중일 때 로컬 서버 사용 설정
    url:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://urdego.vercel.app', // 프로덕션에서는 번들된 앱 사용
    cleartext: true,
  },
};

export default config;
