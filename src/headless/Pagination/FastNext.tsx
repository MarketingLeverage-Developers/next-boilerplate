import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';

type FastNextProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onFastNextClick?: (paginationValue: PaginationValueType) => void;
};

const FastNext = ({ children, onFastNextClick, style, ...props }: FastNextProps) => {
    const { endPage, totalPage, goToFastNextPage } = usePagination();

    const handleFastNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newPaginationValue = goToFastNextPage();
        onFastNextClick && onFastNextClick(newPaginationValue);

        // 기존 onClick 이벤트 핸들러가 있다면 호출
        props.onClick && props.onClick(e);
    };

    const hasFastNextPage = endPage < totalPage;
    const hasNoFastNextPage = !hasFastNextPage;

    return (
        <button
            disabled={hasNoFastNextPage}
            onClick={handleFastNextClick}
            aria-label="빠른 이후 페이지"
            style={style}
            {...props}
        >
            {children}
        </button>
    );
};

export default FastNext;
