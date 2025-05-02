// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    sassOptions: {
        additionalData: `
      $primary-color: ${process.env.NEXT_PUBLIC_PRIMARY_COLOR};
    `,
    },
};

export default nextConfig;
