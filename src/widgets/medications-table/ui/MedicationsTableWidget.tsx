import { useProducts, type GetProductsParams, type Product } from "@/features/medicine/api/medicineApi.ts";
import { useMemo } from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead, TableBody, TableCell
} from "@/shared/ui/table.tsx";
import ReactionBadge from "./ReactionBadge.tsx";
import ProcessTracker from "./ProcessTracker.tsx";
import StatusTracker from "./StatusTracker.tsx";
import { useNavigate } from "@tanstack/react-router";
import { useUrlState } from "@/shared/lib/useUrlState.ts";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react";
import MedicationPagination from "./MedicationPagination.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";

export type TableProduct = Product & {
    success_reaction: boolean;
    process: [number, number];
    status: [number, number, number];
};

export function MedicationsTableWidget() {
    const { searchParams, sorting, setSorting } = useUrlState();
    const navigate = useNavigate();

    const queryParams = useMemo(() => {
        const limit = 30;
        const page = searchParams.page ? Number(searchParams.page) : 1;
        const skip = (page - 1) * limit;

        const params: GetProductsParams = { limit, skip };

        if (searchParams.sortBy && searchParams.sortBy !== 'undefined')
            params.sortBy = searchParams.sortBy;

        if (searchParams.order)
            params.order = searchParams.order;

        return params;
    }, [searchParams.sortBy, searchParams.order, searchParams.page]);

    const { data, isLoading } = useProducts(queryParams);

    const columns = useMemo<ColumnDef<TableProduct>[]>(() => [
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
            cell: (info) => <ReactionBadge isSuccess={info.getValue() as boolean} />
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
            cell: () => <StatusTracker />
        }
    ], [])

    const tableData = useMemo<TableProduct[]>(() => {
        if (!data?.products) return []

        return data.products.map(item => {
            const baseVal = typeof item.id === 'number' ? item.id : parseInt(String(item.id), 10) || 1;
            const processVal = (baseVal * 17) % 100;

            return {
                ...item,
                success_reaction: baseVal % 2 === 0,
                process: [
                    processVal,
                    processVal + 100
                ] as [number, number],
                status: [
                    (baseVal * 3) % 10,
                    (baseVal * 5) % 10,
                    (baseVal * 7) % 10
                ] as [number, number, number],
            }
        })
    }, [data])

    const table = useReactTable({
        data: tableData,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    })

    const handleClick = (id: number | string) => {
        void navigate({ to: `/medications/${id}` });
    }

    return (
        <>
            <Table className="mb-20">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={header.column.getCanSort() ? "cursor-pointer select-none hover:text-myblack" : ""}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : (
                                            <div className="flex items-center gap-1">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <span className="w-4">
                                                        {{
                                                            asc: <ArrowUpIcon className="size-4" />,
                                                            desc: <ArrowDownIcon className="size-4" />,
                                                        }[header.column.getIsSorted() as string] ?? <ArrowUpDownIcon className="size-4 opacity-50" />}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                </TableHead>
                            ))}
                        </TableRow >
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <Skeleton className="h-8 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        table.getRowModel().rows.map((row) => {
                            const productId = row.original.id;

                            return (
                                <TableRow key={row.id}
                                    onClick={() => handleClick(productId)}
                                    className="cursor-pointer"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>

            {data && data.total ? (
                <MedicationPagination limit={30} total={data.total} />
            ) : null}
        </>
    )
}
