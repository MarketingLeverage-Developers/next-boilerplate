import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';

type PrevProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onPrevClick?: (paginationValue: PaginationValueType) => void;
};

const Prev = ({ children, onPrevClick, style, ...props }: PrevProps) => {
    const { goToPrevPage, hasPrevPage } = usePagination();

    const handlePrevButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newPaginationValue = goToPrevPage();
        onPrevClick && onPrevClick(newPaginationValue);
        // 기존 onClick 이벤트 핸들러 호출
        props.onClick && props.onClick(e);
    };

    const hasNoPrevPage = !hasPrevPage;

    return (
        <button disabled={hasNoPrevPage} onClick={handlePrevButtonClick} style={style} {...props}>
            {children}
        </button>
    );
};

export default Prev;
