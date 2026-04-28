import {useProducts} from "@/features/medecine/api/medicineApi.ts";
import {useMemo,} from "react";
import {flexRender, getCoreRowModel, type SortingState, useReactTable} from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead, TableBody, TableCell
} from "@/shared/ui/table.tsx";
import ReactionBadge from "@/pages/medications-list/ui/ReactionBadge.tsx";
import ProcessTracker from "@/pages/medications-list/ui/ProcessTracker.tsx";
import StatusTracker from "@/pages/medications-list/ui/StatusTracker.tsx";
import {useNavigate, useSearch} from "@tanstack/react-router";
import MedicationPagination from "@/pages/medications-list/ui/MedicationPagination.tsx";

function MedicationListPage() {

    const searchParams = useSearch({strict: false}) as{sortBy?: string, order?: 'asc' | 'desc'};
    const navigate = useNavigate();

    const sorting = useMemo<SortingState>(() => {
        if (searchParams.sortBy && searchParams.order)
            return [{ id: searchParams.sortBy, desc: searchParams.order === 'desc' }];

        return [];
    }, [searchParams.sortBy, searchParams.order]);

    const queryParams = useMemo(() => {
        const params: GetProductsParams = { limit: 30 };

        if (searchParams.sortBy && searchParams.sortBy !== 'undefined')
            params.sortBy = searchParams.sortBy;

        if (searchParams.order && searchParams.order !== 'undefined')
            params.order = searchParams.order;


        return params;
    }, [searchParams.sortBy, searchParams.order]);

    const { data, isLoading } = useProducts(queryParams);

    const handleSortingChange = (updaterOrValue: Updater<SortingState>) => {
        const newSorting = typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting)
            : updaterOrValue;

        const newSortBy = newSorting.length > 0 ? newSorting[0].id : undefined;
        const newOrder = newSorting.length > 0 ? (newSorting[0].desc ? 'desc' : 'asc') : undefined;

        navigate({
            search: (old: any) => {
                const newSearch = { ...old };

                if (newSortBy && newOrder) {
                    newSearch.sortBy = newSortBy;
                    newSearch.order = newOrder;
                } else {
                    delete newSearch.sortBy;
                    delete newSearch.order;
                }

                return newSearch;
            },
            replace: true,
        });
    };


    const columns = useMemo(() => [
        {
            header: 'TITLE',
            accessorKey: 'title',
        },
        {
            header: 'CATEGORY',
            accessorKey: 'category',
        },
        {
            header: 'BRAND',
            accessorKey: 'brand',
        },
        {
            header: 'SUCCESS REACTION',
            accessorKey: 'success_reaction',
            enableSorting: false,
            cell: (info) => <ReactionBadge isSuccess={info.getValue() as boolean}/>
        },
        {
            header: 'PROCESS',
            accessorKey: 'process',
            enableSorting: false,
            cell: (info) => <ProcessTracker values={info.getValue() as [number, number]} />
        },
        {
            header: 'STATUS',
            accessorKey: 'status',
            enableSorting: false,
            cell: <StatusTracker/>
        }
    ], [])

    const tableData = useMemo(() => {
        if(!data?.products) return []

        return data.products.map(item => {
            const processVal = Math.floor(Math.random() * 100);
            return {
                ...item,
                success_reaction: Math.random() > 0.5,
                process: [
                    processVal,
                    processVal + 100
                ],
                status: [
                    Math.floor(Math.random() * 10),
                    Math.floor(Math.random() * 10),
                    Math.floor(Math.random() * 10)
                ],
            }
        })
    }, [data])

    const table= useReactTable({
        data: tableData,
        columns,
        state: {
            sorting
        },
        onSortingChange: handleSortingChange,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    })

    const handleClick = (id : number | string) => {
        navigate({ to: `/medications/${id}` });
    }

    return (
        <div style={{ padding: '20px' }}>
            <div className="flex flex-col items-start  gap-2 mb-12">
                <h1 className="text-myblack text-2xl font-semibold">List of medications in development</h1>
                <h2 className="text-mygrey text-sm">Brief summary of testing processes</h2>
            </div>
            <Table>
                <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow  key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}
                                                   onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow >
                            ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => {
                        const productId = row.original.id;

                       return(
                           <TableRow key={row.id}
                                     onClick={() =>handleClick(productId)}
                                     className="cursor-pointer"
                           >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                       )})}
                </TableBody>
            </Table>

            <MedicationPagination limit={}/>
        </div>
    )
}

export default MedicationListPage