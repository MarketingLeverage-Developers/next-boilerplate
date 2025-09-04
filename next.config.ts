// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // 클라이언트와 공유됨
    },
    sassOptions: {
        additionalData: `
      $primary-color: ${process.env.NEXT_PUBLIC_PRIMARY_COLOR};
    `,
    },
    eslint: {
        // 빌드 시 ESLint 오류를 무시하고 빌드를 진행합니다.
        ignoreDuringBuilds: true,
    },
    trailingSlash: true, // 정적 export 시 보통 권장
    output: 'export', // SSG 정적 배포 설정
};

export default nextConfig;
