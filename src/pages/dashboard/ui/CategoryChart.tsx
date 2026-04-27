import type { IChartByCategory } from "@/features/dashboard/api/mock-data.ts";
import { TotalTestedDrugsChart } from "./charts/TotalTestedDrugsChart";
import { DrugApprovalRatesChart } from "./charts/DrugApprovalRatesChart";
import { TestingProcessChart } from "./charts/TestingProcessChart";
import { NumberOfPeopleTestedChart } from "./charts/NumberOfPeopleTestedChart";
interface CategoryChartProps {
    category: IChartByCategory;
}

export default function CategoryChart({ category }: CategoryChartProps) {
    return (
        <div className="p-4 bg-mywhite rounded-md border border-mygrey-dark inline-flex flex-col justify-start items-start gap-9">
            <div className="card_header text-left flex gap-5">
                <div>
                    <div className="flex items-center gap-3.5">
                        <h3 className="text-xl font-semibold text-myblack mb-1">{category.title}</h3>
                        {category.totalPercentage &&
                            <span className="text-xs font-semibold text-myorange-darker bg-myorange border border-mygorange-dark px-2 py-1 rounded-full">{category.totalPercentage}</span>
                        }
                    </div>
                    <p className="text-sm text-mygrey mb-4 ">{category.subTitle}</p>
                </div>
                {category.count &&
                    <span className="text-lg font-semibold">{category.count}</span>
                }
            </div>

            <div className="chart w-full flex justify-center py-4">
                {category.id === 'cat-1' && <TotalTestedDrugsChart />}
                {category.id === 'cat-2' && <DrugApprovalRatesChart />}
                {category.id === 'cat-3' && <TestingProcessChart />}
                {category.id === 'cat-4' && <NumberOfPeopleTestedChart />}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
                {category.data.map((dataItem) => (
                    <div key={dataItem.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {dataItem.className &&
                                <div className={`w-4 h-2 rounded-sm ${dataItem.className}`}></div>
                            }
                            <span className="text-mygrey text-sm font-medium">{dataItem.title}</span>
                        </div>
                        <span className="text-mygrey text-sm font-medium">{dataItem.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}