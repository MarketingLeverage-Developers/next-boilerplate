import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';

type NextProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onNextClick?: (paginationValue: PaginationValueType) => void;
};

const Next = ({ children, onNextClick, style, ...props }: NextProps) => {
    const { goToNextPage, hasNextPage } = usePagination();

    const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newPaginationValue = goToNextPage();
        onNextClick && onNextClick(newPaginationValue);
        props.onClick && props.onClick(e);
    };

    const hasNoNextPage = !hasNextPage;

    return (
        <button disabled={hasNoNextPage} onClick={handleNextButtonClick} style={style} {...props}>
            {children}
        </button>
    );
};

export default Next;
