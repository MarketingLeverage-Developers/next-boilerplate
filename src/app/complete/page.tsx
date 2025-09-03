'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Box from '@/ui-kit/src/components/layouts/Box/Box';

const CompletePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) return;

        if (sessionStorage.getItem(`conv_${token}`) === 'done') return;

        alert('문의가 완료되었습니다!');

        // 전환 스크립트 추가
        // const fireLead = () => {
        //     window.karrotPixel?.track('Lead');
        //     sessionStorage.setItem(`conv_${token}`, 'done');
        //     setTimeout(() => router.push('/'), 500);
        // };

        // if (window.karrotPixel) {
        //     fireLead();
        // } else {
        //     // ✅ 픽셀이 늦게 로드된 경우 대비
        //     const interval = setInterval(() => {
        //         if (window.karrotPixel) {
        //             fireLead();
        //             clearInterval(interval);
        //         }
        //     }, 200);
        //     // 메모리 누수 방지
        //     return () => clearInterval(interval);
        // }
    }, [router, searchParams]);

    return <Box backgroundColor="#777777" width="100%" height="100vh" />;
};

export default CompletePage;
