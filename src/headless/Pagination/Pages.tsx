import React from 'react';
import { PaginationValueType, usePagination } from './Pagination';

type PagesProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onPagesClick?: (paginationValue: PaginationValueType) => void;
    activeClassName?: string;
};

const Pages = ({ onPagesClick, activeClassName = '', ...props }: PagesProps) => {
    const { paginationValue, goToPage, endPage, startPage } = usePagination();
    const { page } = paginationValue;

    const handlePagesClick = (pageValue: number) => {
        const newPaginationValue = goToPage(pageValue);
        onPagesClick && onPagesClick(newPaginationValue);
    };

    return (
        <>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const currentPage = startPage + index;
                const isActive = currentPage === page;
                const combinedClassName = `${props.className} ${isActive ? activeClassName : ''}`.trim();
                console.log(combinedClassName, 'combined');
                return (
                    <button
                        key={currentPage}
                        onClick={() => handlePagesClick(currentPage)}
                        disabled={isActive}
                        {...props}
                        className={combinedClassName}
                    >
                        {currentPage}
                    </button>
                );
            })}
        </>
    );
};

export default Pages;
