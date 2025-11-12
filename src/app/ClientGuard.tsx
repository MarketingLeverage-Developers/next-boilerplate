// app/ClientGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { blockIp } from '@/services/blockIp';

type Props = {
    children: React.ReactNode;
};

type Status = 'pending' | 'allowed' | 'blocked';

export default function ClientGuard({ children }: Props) {
    const [status, setStatus] = useState<Status>('pending');

    useEffect(() => {
        (async () => {
            try {
                await blockIp();
                // 통과
                setStatus('allowed');
            } catch (e) {
                // 차단
                setStatus('blocked');

                // URL도 /403 으로 보이게 하고 싶으면:
                if (window.location.pathname !== '/403') {
                    window.history.replaceState(null, '', '/403');
                }
            }
        })();
    }, []);

    // 아직 결과 안 나왔으면 아무것도 렌더 안 함 (원하면 로딩 스피너 등으로 교체 가능)
    if (status === 'pending') return null;

    // 차단이면 완전 새하얀 화면
    if (status === 'blocked') return null;

    // 통과했을 때만 실제 레이아웃/페이지 렌더
    return <>{children}</>;
}
