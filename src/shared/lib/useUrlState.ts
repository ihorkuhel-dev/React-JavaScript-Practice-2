import { useSearch, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { SortingState, Updater } from '@tanstack/react-table';

export type TableSearchParams = {
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
};

export const useUrlState = () => {
    const searchParams = useSearch({ strict: false }) as TableSearchParams;
    const navigate = useNavigate();

    const sorting = useMemo<SortingState>(() => {
        if (searchParams.sortBy && searchParams.order)
            return [{ id: searchParams.sortBy, desc: searchParams.order === 'desc' }];
        return [];
    }, [searchParams.sortBy, searchParams.order]);

    const page = searchParams.page ? Number(searchParams.page) : 1;

    const setSorting = (updaterOrValue: Updater<SortingState>) => {
        const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
        
        const sortBy = newSorting.length > 0 ? newSorting[0].id : undefined;
        const order = newSorting.length > 0 ? (newSorting[0].desc ? 'desc' : 'asc') : undefined;

        navigate({
            search: (old: TableSearchParams) => ({
                ...old,
                sortBy,
                order,
                page: 1,
            }) as any,
            replace: true,
        });
    };

    const setPage = (newPage: number) => {
        navigate({
            search: (old: TableSearchParams) => ({
                ...old,
                page: newPage,
            }) as any,
            replace: true,
        });
    };

    return {
        searchParams,
        sorting,
        setSorting,
        page,
        setPage,
    };
};
