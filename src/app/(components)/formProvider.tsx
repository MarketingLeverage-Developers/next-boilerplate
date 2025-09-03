'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
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

    const handleButtonClick = async () => {
        try {
            await postInquiry({
                body: {
                    name,
                    carModel,
                    occupation,
                    period,
                    firstPhone,
                    middlePhone,
                    lastPhone,
                    inquireLocation: '랜딩',
                },
            });
            router.push(`/complete?token=${token}`);
        } catch (error: any) {
            alert(error.response?.data?.result?.message ?? '상담 신청을 실패하였습니다!');
        }
    };

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
