export const formatNumberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumberAsManRounded = (num: number) => {
    return `${(num / 10000).toFixed(1)}만`;
};

/**
 * ISO 문자열을 'YYYY-MM-DD' 형식으로 잘라서 반환합니다.
 * @param isoString 예: "2025-03-01T00:00:00.000Z"
 * @returns "2025-03-01"
 */
export const formatIsoToDate = (isoString: string | null | undefined): string => {
    // null 또는 undefined, 빈 문자열일 경우 빈 문자열 반환
    if (!isoString) {
        return '';
    }

    // 'T' 앞까지 잘라내면 YYYY-MM-DD 형식
    const [datePart] = isoString.split('T');
    return datePart;
};

/**
 * 숫자를 만(萬) 단위로 포맷합니다.
 * 예: 52190000 → "5,219만"
 *
 * @param value 변환할 숫자 (null이나 undefined면 빈 문자열 반환)
 */
export const formatToManUnit = (value: number | null | undefined): string => {
    if (value == null || isNaN(value)) {
        return '';
    }
    // 만 단위로 내림
    const man = Math.floor(value / 10_000);
    // 한국 로케일 기준으로 천 단위 콤마 추가
    const formatted = man.toLocaleString('ko-KR');
    return `${formatted}`;
};
