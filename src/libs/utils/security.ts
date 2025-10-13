export const useSafeInput = () => {
    const sanitize = (input: string) =>
        input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const normalizePhone = (input: string) => input.replace(/[^0-9]/g, '');
    const validateText = (input: string) =>
        input.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\u1100-\u1112\u318D\u119E\u11A2\u2022\u2025\u00B7\uFE55\s\.,]/g, '');

    return { sanitize, normalizePhone, validateText };
};
