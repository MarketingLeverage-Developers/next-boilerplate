'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
type ApiData = any; // 실제 데이터 타입에 맞게 수정하세요.
interface ApiCallerProps {
    onDataFetched?: (data: ApiData) => void;
}
export default function HomeApiCaller({ onDataFetched }: ApiCallerProps) {
    const searchParams = useSearchParams();
    0;
    useEffect(() => {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/client/home`;
        const queryString = searchParams.toString();
        const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        fetch(url, {
            next: { revalidate: 60 },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                onDataFetched && onDataFetched(json);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [onDataFetched]);
    return <div>{/* 필요에 따라 데이터를 렌더링하거나 다른 컴포넌트로 전달할 수 있습니다 */}</div>;
}
