'use client';
import { usePathname } from 'next/navigation';
import Page from '@/ui-kit/src/components/layouts/Page/Page';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCompletePage = pathname === '/complete';

    return (
        <>
            {!isCompletePage && (
                <>
                    <Page.Header>헤더</Page.Header>
                </>
            )}
            {children}
            {!isCompletePage && <>푸터</>}
        </>
    );
}
