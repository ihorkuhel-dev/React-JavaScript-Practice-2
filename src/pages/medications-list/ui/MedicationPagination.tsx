import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/shared/ui/pagination.tsx";
import { useUrlState } from "@/shared/lib/useUrlState.ts";
import React from "react";

interface PaginationProps {
    limit: number;
    total: number;
}

export default function MedicationPagination({ limit, total }: PaginationProps) {
    const { page: currentPage, setPage } = useUrlState();

    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    const handlePageChange = (e: React.MouseEvent, newPage: number) => {
        e.preventDefault();
        if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
        setPage(newPage);
    };

    return (
        <Pagination className="mt-8 mb-4 justify-start bg-mywhite w-max border border-mygrey-light rounded-md fixed bottom-8 text-myblack select-none">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => handlePageChange(e, currentPage - 1)}
                        className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} w-28 hover:text-accent max-sm:w-10` }
                    />
                </PaginationItem>

                <PaginationItem className="  ">
                    {currentPage} of {totalPages}
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => handlePageChange(e, currentPage + 1)}
                        className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} w-28 hover:text-accent max-sm:w-10`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}