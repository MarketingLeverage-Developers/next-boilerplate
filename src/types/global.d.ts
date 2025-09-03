export {};

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        karrotPixel: {
            init: (id: string) => void;
            track: (event: string) => void;
        };
        wcs_add?: Record<string, any>;
        wcs?: {
            trans?: (conv: { type: string }) => void; // 기존 타입
            inflow?: (domain: string) => void; // 내가 쓰려는 inflow
        };
        wcs_do?: () => void;
    }
}
