export const useSafeInput = () => {
    const sanitize = (input: string) =>
        input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const normalizePhone = (input: string) => input.replace(/[^0-9]/g, '');
    const validateText = (input: string) => input.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, '');

    return { sanitize, normalizePhone, validateText };
};
