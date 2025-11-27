'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { postInquiry } from '@/services/inquiry';
import { useSafeInput } from '@/libs/utils/security';
import { generateToken } from '@/libs/utils/token';
import { createInquiry } from '@/libs/utils/createInquiry';

// 📌 form 상태 타입
type FormState = {
    carModel: string;
    occupation: string;
    period: string;
    name: string;
    firstPhone: string;
    middlePhone: string;
    lastPhone: string;
    privacyValue: boolean;
};

// 📌 context 타입
type FormContextType = {
    form: FormState;
    updateForm: (key: keyof FormState, value: string | boolean) => void;
    handleButtonClick: () => Promise<void>;
    isSubmitting: boolean;
};

// context 생성
const FormContext = createContext<FormContextType | undefined>(undefined);

// provider 컴포넌트 props
type FormProviderProps = {
    children: ReactNode;
    inquireLocation?: string; // 위치 값 외부에서 주입
};

const initialState: FormState = {
    carModel: '',
    occupation: '',
    period: '',
    name: '',
    firstPhone: '010',
    middlePhone: '',
    lastPhone: '',
    privacyValue: true,
};

export const FormProvider = ({ children, inquireLocation = '메인-상단' }: FormProviderProps) => {
    const router = useRouter();
    const { sanitize, validateText, normalizePhone } = useSafeInput();
    const token = generateToken();

    const [form, setForm] = useState<FormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 공통 업데이트 함수
    const updateForm = (key: keyof FormState, value: string | boolean) => {
        setForm((prev) => ({
            ...prev,
            [key]: typeof value === 'string' ? validateText(value) : value, // ✅ 문자열은 무조건 validateText 적용
        }));
    };

    const handleButtonClick = useCallback(async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            // ✅ 필수 항목 검증
            if (!form.name.trim()) {
                alert('이름을 입력해 주세요.');
                setIsSubmitting(false);
                return;
            }

            if (!form.carModel.trim()) {
                alert('차량명을 입력해 주세요.');
                setIsSubmitting(false);
                return;
            }

            if (!form.middlePhone.trim() || !form.lastPhone.trim()) {
                alert('전화번호를 모두 입력해 주세요.');
                setIsSubmitting(false);
                return;
            }

            if (!form.privacyValue) {
                alert('개인정보 수집 및 이용에 동의해 주세요.');
                setIsSubmitting(false);
                return;
            }

            const safeData = {
                name: sanitize(validateText(form.name.trim())),
                carModel: sanitize(validateText(form.carModel.trim())),
                occupation: sanitize(validateText(form.occupation.trim())),
                period: sanitize(validateText(form.period.trim())),
                firstPhone: normalizePhone(form.firstPhone),
                middlePhone: normalizePhone(form.middlePhone),
                lastPhone: normalizePhone(form.lastPhone),
                inquireLocation,
            };

            const isProd = process.env.NEXT_PUBLIC_ENV === 'prod';
            await createInquiry(safeData);
            isProd && router.push(`/complete?token=${token}`);
            !isProd && alert('상담 신청에 성공했습니다.');
        } catch (error: any) {
            alert(error.response?.data?.result?.message ?? '상담 신청에 실패했습니다!');
        } finally {
            setIsSubmitting(false);
        }
    }, [form, isSubmitting, router, token, sanitize, validateText, normalizePhone, inquireLocation]);

    return (
        <FormContext.Provider
            value={{
                form,
                updateForm,
                handleButtonClick,
                isSubmitting,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error('useForm must be used within FormProvider');
    return ctx;
};
