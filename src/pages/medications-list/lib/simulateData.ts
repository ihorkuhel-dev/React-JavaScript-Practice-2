import type { Product } from "@/features/medicine/api/medicineApi.ts";
export type TableProduct = Product & {
    success_reaction: boolean;
    process: [number, number];
    status: [number, number, number];
};

export const mapProductToTableData = (item: Product): TableProduct => {
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
    };
};
