import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/shared/ui/pagination.tsx";
import { useUrlState } from "@/shared/utils/useUrlState.ts";
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
        <Pagination className="accent-block w-max border fixed bottom-8 select-none">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => handlePageChange(e, currentPage - 1)}
                        className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} pagination-button` }
                    />
                </PaginationItem>

                <PaginationItem>
                    {currentPage} of {totalPages}
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => handlePageChange(e, currentPage + 1)}
                        className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} pagination-button`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}