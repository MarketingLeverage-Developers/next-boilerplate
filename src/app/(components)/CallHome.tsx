'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { callHome } from '@/services';
import { getOrCreateVisitorId } from '@/services/visitor';

type ApiData = any; // 실제 데이터 타입에 맞게 수정하세요.

interface ApiCallerProps {}

export default function CallHome({}: ApiCallerProps) {
    const searchParams = useSearchParams();
    const paramsObj: Record<string, string> = Object.fromEntries(searchParams.entries());
    const router = useRouter();
    const visitorId = getOrCreateVisitorId();

    useEffect(() => {
        const docReferer = document.referrer;
        (async () => {
            try {
                await callHome({ query: paramsObj, body: { visitorId, docReferer } });
            } catch (e: any) {
                if (true) {
                    router.push('/403');
                    return;
                }
            }
        })();
    }, [visitorId]);

    return <div>{/* 필요에 따라 데이터를 렌더링하거나 다른 컴포넌트로 전달할 수 있습니다 */}</div>;
}
