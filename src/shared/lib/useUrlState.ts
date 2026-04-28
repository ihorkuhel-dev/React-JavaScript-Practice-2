import { useSearch, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { SortingState, Updater } from '@tanstack/react-table';
import { z } from 'zod';

export const SearchSchema = z.object({
    sortBy: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
    page: z.number().catch(1).optional(),
});

export type SearchParams = z.infer<typeof SearchSchema>;

export const useUrlState = () => {
    const searchParams = useSearch({ from: '/_main' });
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

        void navigate({
            to: '.',
            search: (old: unknown) => ({
                ...(old as SearchParams),
                sortBy,
                order,
                page: 1,
            }),
            replace: true,
        });
    };

    const setPage = (newPage: number) => {
        void navigate({
            to: '.',
            search: (old: unknown) => ({
                ...(old as SearchParams),
                page: newPage,
            }),
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
