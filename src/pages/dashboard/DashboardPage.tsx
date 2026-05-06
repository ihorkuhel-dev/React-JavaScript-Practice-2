import {useCallback, useMemo, useState} from 'react';
import { chart_summary, chart_by_category, total_tests_data } from '@/features/dashboard/api/mock-data.ts';
import CategoryChart from "@/pages/dashboard/ui/CategoryChart.tsx";
import { TotalTestsChart } from "@/pages/dashboard/ui/charts/TotalTestsChart";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/shared/ui/select.tsx";



export function DashboardPage() {
    const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
    const handlePeriodChange = useCallback((val: string) => setSelectedPeriodIndex(Number(val)), []);

    const chartSummaryBlocks = useMemo(() => chart_summary.map((item) => {
        const Icon = item.icon;
        return (
            <div key={item.id} className="flex items-center gap-4 p-4">
                <div className={` flex items-center justify-center ${item.className}`}>
                    <Icon className="size-14" />
                </div>
                <div className="flex flex-col text-left">
                    <h3>{item.title}</h3>
                    <p>{item.subTitle}</p>
                </div>
            </div>
        );
    }), []);

    return (
        <div className="dashboard-page">
            <div className="titles-block mb-12">
                <h1>Testing Dashboard</h1>
                <h2>Uncover insights into your testing processes.</h2>
            </div>
            <div className="chart-block flex-myrow gap-7 max-2xl:gap-4">
                <div className="flex-colum gap-7 flex-1 min-w-0 max-2xl:gap-4">
                    <div className="pb-6 border-b border-mygrey-lighter inline-flex justify-start items-start gap-11 flex-wrap max-lg:gap-5">
                        {chartSummaryBlocks}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="titles-block">
                            <h1>Total tests</h1>
                            <h2>Testing results received in all areas</h2>
                        </div>
                        <Select value={selectedPeriodIndex.toString()} onValueChange={handlePeriodChange}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select a period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Periods</SelectLabel>
                                    {total_tests_data.map((data, idx) => (
                                        <SelectItem key={idx} value={idx.toString()}>{data.period}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <TotalTestsChart data={total_tests_data[selectedPeriodIndex]} />
                </div>
                <div className="category-grid gap-7 flex-1 min-w-0 max-2xl:gap-4">
                    {chart_by_category.map((category) => (
                        <CategoryChart category={category} key={category.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}