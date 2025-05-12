import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import PageViewApiCaller from '@/components/PageViewApiCaller';

const LocalFont = localFont({
    src: [
        {
            path: '../assets/fonts/pretendard/Pretendard-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../assets/fonts/pretendard/Pretendard-Black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: '한빛하우징 - H&B 하우징',
    description: '한빛하우징 - H&B 하우징',
    keywords: [],
    icons: {
        icon: '/favicon.ico', // public 폴더에 있는 favicon.ico 파일을 사용
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="kr" suppressHydrationWarning>
            <body suppressHydrationWarning className={LocalFont.className}>
                <PageViewApiCaller />
                {children}
            </body>
        </html>
    );
}
