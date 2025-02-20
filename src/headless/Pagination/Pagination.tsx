// Pagination.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import Prev from './Prev';
import Next from './Next';
import Pages from './Pages';
import FastPrev from './FastPrev';
import FastNext from './FastNext';

export type PaginationValueType = {
    page: number;
    size: number;
    total: number;
};
type PaginationContextType = {
    paginationValue: PaginationValueType;
    goToPrevPage: () => PaginationValueType;
    goToNextPage: () => PaginationValueType;
    goToPage: (value: number) => PaginationValueType;
    changeSize: (value: number) => PaginationValueType;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    hasFastPrevPage: boolean;
    hasFastNextPage: boolean;
    startPage: number;
    endPage: number;
    totalPage: number;
    goToFastPrevPage: () => PaginationValueType;
    goToFastNextPage: () => PaginationValueType;
};

const PaginationContext = createContext<PaginationContextType>({
    paginationValue: {
        page: 1,
        size: 0,
        total: 0,
    },
    goToPrevPage: () => ({
        page: 1,
        size: 0,
        total: 0,
    }),
    goToNextPage: () => ({
        page: 1,
        size: 0,
        total: 0,
    }),
    goToPage: (value) => ({
        page: 1,
        size: 0,
        total: 0,
    }),
    changeSize: (value) => ({
        page: 1,
        size: 0,
        total: 0,
    }),
    hasPrevPage: false,
    hasNextPage: false,
    hasFastNextPage: false,
    hasFastPrevPage: false,
    startPage: 1,
    endPage: 1,
    totalPage: 0,
    goToFastPrevPage: () => ({
        page: 1,
        size: 0,
        total: 0,
    }),
    goToFastNextPage: () => ({
        page: 1,
        size: 0,
        total: 0,
    }),
});

type PaginationProps = {
    children: React.ReactNode;
    defaultValue?: PaginationValueType;
};

const Pagination = ({ children, defaultValue }: PaginationProps) => {
    const [paginationValue, setPaginationValue] = useState(
        defaultValue ?? {
            page: 1,
            size: 0,
            total: 0,
        }
    );

    useEffect(() => {
        setPaginationValue(
            defaultValue ?? {
                page: 1,
                size: 0,
                total: 0,
            }
        );
    }, [defaultValue]);

    console.log('변경', paginationValue);

    const { page, size, total } = paginationValue;

    const goToPrevPage = () => {
        const newPaginationValue = structuredClone(paginationValue);
        const { page } = newPaginationValue;

        if (page > 1) {
            newPaginationValue.page--;
        }
        setPaginationValue(newPaginationValue);

        return newPaginationValue;
    };

    const goToNextPage = () => {
        const newPaginationValue = structuredClone(paginationValue);
        const { page, total } = newPaginationValue;

        if (page < total) {
            newPaginationValue.page++;
        }
        setPaginationValue(newPaginationValue);

        return newPaginationValue;
    };

    const goToPage = (value: number) => {
        const newPaginationValue = structuredClone(paginationValue);
        newPaginationValue.page = value;

        setPaginationValue(newPaginationValue);

        return newPaginationValue;
    };

    const changeSize = (value: number) => {
        const newPaginationValue = structuredClone(paginationValue);
        newPaginationValue.size = value;
        newPaginationValue.page = 1;

        setPaginationValue(newPaginationValue);

        return newPaginationValue;
    };

    // 최대 몇 개의 페이지 번호 버튼을 보여줄지 결정
    const maxPageButtons = 5;
    const totalPage = Math.ceil(total / size); // total은 최대 페이지 인덱스이므로 실제 페이지 개수

    const hasPrevPage = paginationValue.page > 1;
    const hasNextPage = paginationValue.page < totalPage;

    // 현재 페이지를 가운데에 두도록 시작/끝 페이지 계산
    let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;
    if (endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    const hasFastPrevPage = startPage > 1;
    const hasFastNextPage = endPage < totalPage;

    // "빠른 이전" 버튼: 현재 페이지에서 maxPageButtons 만큼 뺀 값(또는 0)을 이동
    const goToFastPrevPage = () => {
        const newPage = Math.max(1, page - maxPageButtons);
        const newPaginationValue = goToPage(newPage);
        return newPaginationValue;
    };

    // "빠른 이후" 버튼: 현재 페이지에서 maxPageButtons 만큼 더한 값(또는 total)을 이동
    const goToFastNextPage = () => {
        const newPage = Math.min(totalPage, page + maxPageButtons);
        const newPaginationValue = goToPage(newPage);
        return newPaginationValue;
    };

    return (
        <PaginationContext.Provider
            value={{
                paginationValue,
                goToPrevPage,
                goToNextPage,
                goToPage,
                changeSize,
                hasFastPrevPage,
                hasPrevPage,
                hasNextPage,
                hasFastNextPage,
                startPage,
                endPage,
                totalPage,
                goToFastPrevPage,
                goToFastNextPage,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => {
    return useContext(PaginationContext);
};

export default Pagination;

Pagination.Prev = Prev;
Pagination.Next = Next;
Pagination.Pages = Pages;
Pagination.FastPrev = FastPrev;
Pagination.FastNext = FastNext;
