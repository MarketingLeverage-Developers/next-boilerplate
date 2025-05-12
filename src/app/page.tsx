import HomeApiCaller from '@/components/HomeApiCaller';

import { Suspense } from 'react';

export default function Home() {
    return (
        <>
            <Suspense fallback={<div></div>}>
                <HomeApiCaller />
            </Suspense>
        </>
    );
}
