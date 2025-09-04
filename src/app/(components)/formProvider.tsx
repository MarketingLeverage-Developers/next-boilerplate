'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { postInquiry } from '@/services/inquiry';

type ModalFormContextType = {
    carModel: string;
    name: string;
    firstPhone: string;
    middlePhone: string;
    occupation: string;
    lastPhone: string;
    period: string;
    privacyValue: boolean;
    setCarModel: (val: string) => void;
    setName: (val: string) => void;
    setFirstPhone: (val: string) => void;
    setMiddlePhone: (val: string) => void;
    setLastPhone: (val: string) => void;
    setPrivacyValue: (val: boolean) => void;
    setOccupation: (val: string) => void;
    setPeriod: (val: string) => void;
    handleButtonClick: () => Promise<void>;
};

const ModalFormContext = createContext<ModalFormContextType | undefined>(undefined);

// 🚨 XSS 방지: HTML 특수문자 이스케이프 함수
function sanitize(input: string) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// 🚨 전화번호 숫자만 허용
function normalizePhone(input: string) {
    return input.replace(/[^0-9]/g, '');
}

// 🚨 이름/차량명 등은 한글/영문/숫자/공백 정도만 허용
function validateText(input: string) {
    return input.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, '');
}

export const ModalFormProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const token = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const [carModel, setCarModel] = useState('');
    const [occupation, setOccupation] = useState('');
    const [period, setPeriod] = useState('');
    const [name, setName] = useState('');
    const [firstPhone, setFirstPhone] = useState('010');
    const [middlePhone, setMiddlePhone] = useState('');
    const [lastPhone, setLastPhone] = useState('');
    const [privacyValue, setPrivacyValue] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // 🚨 중복 전송 방지

    const handleButtonClick = useCallback(async () => {
        if (isSubmitting) return; // 중복 방지
        setIsSubmitting(true);

        try {
            // 1. 입력값 검증 & 정규화
            const safeData = {
                name: sanitize(validateText(name.trim())),
                carModel: sanitize(validateText(carModel.trim())),
                occupation: sanitize(validateText(occupation.trim())),
                period: sanitize(validateText(period.trim())),
                firstPhone: normalizePhone(firstPhone),
                middlePhone: normalizePhone(middlePhone),
                lastPhone: normalizePhone(lastPhone),
                inquireLocation: '랜딩',
            };

            // 2. 서버로 안전하게 전송
            await postInquiry({ body: safeData });

            // 3. 완료 페이지 이동
            router.push(`/complete?token=${token}`);
        } catch (error: any) {
            alert(error.response?.data?.result?.message ?? '상담 신청에 실패했습니다!');
        } finally {
            setIsSubmitting(false);
        }
    }, [carModel, occupation, period, name, firstPhone, middlePhone, lastPhone, isSubmitting, router, token]);

    return (
        <ModalFormContext.Provider
            value={{
                carModel,
                occupation,
                period,
                name,
                firstPhone,
                middlePhone,
                lastPhone,
                privacyValue,
                setCarModel,
                setName,
                setFirstPhone,
                setMiddlePhone,
                setLastPhone,
                setPrivacyValue,
                setOccupation,
                setPeriod,
                handleButtonClick,
            }}
        >
            {children}
        </ModalFormContext.Provider>
    );
};

export const useModalForm = () => {
    const ctx = useContext(ModalFormContext);
    if (!ctx) throw new Error('useModalForm must be used within ModalFormProvider');
    return ctx;
};
