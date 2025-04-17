'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import axios from '../axios';

const PageViewApiCaller = () => {
    const pathname = usePathname();

    useEffect(() => {
        axios
            .post('/client/pageView')
            .then((res) => {
                console.log('페이지뷰 전송 성공', res);
            })
            .catch((err) => {
                console.error('페이지뷰 전송 실패:', err);
            });
    }, [pathname]);

    return null;
};

export default PageViewApiCaller;
