import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';

type FastPrevProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onFastPrevClick?: (paginationValue: PaginationValueType) => void;
};

const FastPrev = ({ children, onFastPrevClick, style, ...props }: FastPrevProps) => {
    const { startPage, goToFastPrevPage } = usePagination();

    const handleFastPrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newPaginationValue = goToFastPrevPage();
        onFastPrevClick && onFastPrevClick(newPaginationValue);
        props.onClick && props.onClick(e);
    };

    const hasFastPrevPage = startPage > 1;
    const hasNoFastPrevPage = !hasFastPrevPage;

    return (
        <button
            disabled={hasNoFastPrevPage}
            onClick={handleFastPrevClick}
            aria-label="빠른 이전 페이지"
            style={style}
            {...props}
        >
            {children}
        </button>
    );
};

export default FastPrev;
