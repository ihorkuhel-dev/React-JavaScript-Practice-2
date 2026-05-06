import type { IChartByCategory } from "@/features/dashboard/api/mock-data.ts";
import { TotalTestedDrugsChart } from "./charts/TotalTestedDrugsChart";
import { DrugApprovalRatesChart } from "./charts/DrugApprovalRatesChart";
import { TestingProcessChart } from "./charts/TestingProcessChart";
import { NumberOfPeopleTestedChart } from "./charts/NumberOfPeopleTestedChart";
import {Badge} from "@/shared/ui/badge.tsx";
import {memo} from "react";
interface CategoryChartProps {
    category: IChartByCategory;
}

export default memo(function CategoryChart({ category }: CategoryChartProps) {
    return (
        <div className="p-4 min-w-0 w-full accent-block border-mygrey-dark inline-flex flex-col justify-start items-start gap-9">
            <div className="text-left flex gap-5 w-full">
                <div>
                    <div className="flex items-center gap-3.5">
                        <h3 className="text-xl mb-1">{category.title}</h3>
                        {category.totalPercentage &&
                            <Badge variant="orange">{category.totalPercentage}</Badge>
                        }
                    </div>
                    <p className="mb-4">{category.subTitle}</p>
                </div>
                {category.count &&
                    <span className="text-lg font-semibold ml-auto">{category.count}</span>
                }
            </div>

            <div className="chart w-full flex justify-center py-4">
                {category.id === 'cat-1' && <TotalTestedDrugsChart />}
                {category.id === 'cat-2' && <DrugApprovalRatesChart />}
                {category.id === 'cat-3' && <TestingProcessChart />}
                {category.id === 'cat-4' && <NumberOfPeopleTestedChart />}
            </div>

            <div className="flex-mycol  w-full">
                {category.data.map((dataItem) => (
                    <div key={dataItem.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {dataItem.className &&
                                <span className={`w-4 h-2 rounded-sm ${dataItem.className}`}></span>
                            }
                            <span>{dataItem.title}</span>
                        </div>
                        <span>{dataItem.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});