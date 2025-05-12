'use client';
import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface UseRoutingOptions {
    queryKey: string;
    defaultValue?: string;
}

const useQueryParameter = ({ queryKey, defaultValue }: UseRoutingOptions) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 현재 탭 값 (쿼리에 없으면 defaultValue)
    const queryValue = searchParams.get(queryKey) ?? defaultValue ?? '';

    // ─── mount 시 defaultValue 한 번만 설정 ───
    useEffect(() => {
        if (!defaultValue) return;

        // 쿼리에 키가 없을 때만, 현재 params 복제해서 추가
        if (!searchParams.has(queryKey)) {
            const params = new URLSearchParams(searchParams.toString());
            params.set(queryKey, defaultValue);

            // replace: 히스토리 스택을 더럽히지 않고 한 번만 교체
            router.replace(`${pathname}?${params.toString()}`);
        }
        // searchParams 인스턴스가 바뀔 때마다 불필요하게 재실행되는 걸 막으려면
        // [searchParams.toString()] 만 쓰셔도 됩니다.
    }, [pathname, queryKey, defaultValue, router, searchParams]);

    // 탭 변경 함수
    const setQueryParameter = (value: string, reset: boolean = false) => {
        const params = reset
            ? new URLSearchParams() // 완전 초기화
            : new URLSearchParams(searchParams.toString()); // 기존 쿼리 복제

        params.set(queryKey, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    return { queryValue, setQueryParameter };
};

export default useQueryParameter;
