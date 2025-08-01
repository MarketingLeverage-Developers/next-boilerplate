'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { callPageStay } from '@/services';
import { getOrCreateVisitorId } from '@/services/visitor';

interface PageStayTrackerProps {}

export default function PageStayTracker({}: PageStayTrackerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const prevPath = useRef(pathname);
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log(isMobile);
    // 새로고침 및 전송 상태 관리
    const hasSentRef = useRef(false);
    const isRefreshRef = useRef(false);

    // 실제 로그 전송 함수
    const sendStayLog = useCallback(() => {
        const visitorId = getOrCreateVisitorId();
        const entryTime = sessionStorage.getItem('entryTime')!;
        const exitTime = new Date().toISOString();
        const siteUrl = new URL(process.env.NEXT_PUBLIC_API_URL!).host;
        const payload = JSON.stringify({ siteUrl, entryTime, exitTime, visitorId });
        const blob = new Blob([payload], { type: 'application/json' });
        console.log(entryTime, exitTime);
        if (navigator.sendBeacon) {
            navigator.sendBeacon(`${process.env.NEXT_PUBLIC_API_URL}/client/pageStay`, blob);
        } else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/pageStay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true,
            });
        }
        sessionStorage.removeItem('entryTime');
    }, []);

    // 중복 전송 방지 래퍼
    const safeSendStayLog = useCallback(() => {
        if (hasSentRef.current) return;
        hasSentRef.current = true;
        sendStayLog();
    }, [sendStayLog]);

    // 초기 진입 및 언로드 이벤트 설정
    useEffect(() => {
        // 1) 최초 진입 시점 저장
        if (!sessionStorage.getItem('entryTime')) {
            sessionStorage.setItem('entryTime', new Date().toISOString());
        }

        // 키보드 새로고침(F5, Ctrl+R/Cmd+R) 감지
        const onKeyDown = (e: KeyboardEvent) => {
            const key = e.key ?? '';
            if (key === 'F5' || ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'r')) {
                isRefreshRef.current = true;
            }
        };

        // 페이지 언로드 시 로그 전송
        const onPageHide = () => {
            if (!isRefreshRef.current) safeSendStayLog();
        };
        const onVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !isRefreshRef.current) {
                safeSendStayLog();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('pagehide', onPageHide, { once: true });
        document.addEventListener('visibilitychange', onVisibilityChange, {
            once: true,
        });

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('pagehide', onPageHide);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [safeSendStayLog]);

    // A 대안: SPA 내부 네비게이션 감지 (모바일 환경에서만)
    useEffect(() => {
        if (isMobile && prevPath.current !== pathname) {
            console.log('mo');
            safeSendStayLog();
            prevPath.current = pathname;
        }
    }, [pathname, isMobile, safeSendStayLog]);

    return null;
}
