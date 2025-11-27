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
                // IP 차단 여부 체크 API
                await blockIp();

                // 정상 응답 → 통과
                setStatus('allowed');
            } catch (err: any) {
                const statusCode = err?.response?.status;

                if (statusCode === 403) {
                    // 403일 때만 차단
                    setStatus('blocked');

                    // URL을 /403으로 바꾸고 싶다면 아래처럼 사용:
                    // if (window.location.pathname !== '/403') {
                    //   window.history.replaceState(null, '', '/403');
                    // }
                } else {
                    // 404, 500, 네트워크 에러 등 → 모두 통과
                    console.error('blockIp error but not 403:', err);
                    setStatus('allowed');
                }
            }
        })();
    }, []);

    // 아직 결과 안 나왔으면 아무것도 렌더 안 함 (로딩 UI 가능)
    if (status === 'pending') return null;

    // 403 차단이면 새하얀 화면
    if (status === 'blocked') return null;

    // 통과했을 때만 실제 페이지 렌더
    return <>{children}</>;
}
