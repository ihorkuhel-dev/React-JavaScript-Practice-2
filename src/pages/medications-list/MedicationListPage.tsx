import {useProducts} from "@/features/medecine/api/medicineApi.ts";
import {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead, TableBody, TableCell
} from "@/shared/ui/table.tsx";
import ReactionBadge from "@/pages/medications-list/ui/ReactionBadge.tsx";
import ProcessTracker from "@/pages/medications-list/ui/ProcessTracker.tsx";
import StatusTracker from "@/pages/medications-list/ui/StatusTracker.tsx";

function MedicationListPage() {

    const {data} = useProducts()

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
            cell: (info) => <ReactionBadge isSuccess={info.getValue() as boolean}/>
        },
        {
            header: 'PROCESS',
            accessorKey: 'process',
            cell: (info) => <ProcessTracker values={info.getValue() as [number, number]} />
        },
        {
            header: 'STATUS',
            accessorKey: 'status',
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
        getCoreRowModel: getCoreRowModel(),
    })

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
                                        <TableHead key={header.id}>
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
                    {table.getRowModel().rows.map((row) => (
                        <TableRow  key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell  key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell >
                            ))}
                        </TableRow >
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default MedicationListPage