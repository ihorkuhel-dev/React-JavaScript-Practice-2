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
import "./Dashboard.scss"



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
                    <h3 className="text-lg font-semibold text-myblack">{item.title}</h3>
                    <p className="text-sm text-mygrey font-medium">{item.subTitle}</p>
                </div>
            </div>
        );
    }), []);

    return (
        <div className="dashboardPage">
            <div className="flex flex-col items-start  gap-2 mb-12">
                <h1 className="text-myblack text-2xl font-semibold">Testing Dashboard</h1>
                <h2 className="text-mygrey text-sm">Uncover insights into your testing processes.</h2>
            </div>
            <div className="chartBlock gap-7">
                <div className="totalChart gap-7">
                    <div className="chartSummary pb-6 border-b border-mygrey-lighter inline-flex justify-start items-start gap-11 flex-wrap">
                        {chartSummaryBlocks}
                    </div>
                    <div className="chartHeader gap-2">
                        <div className="flex flex-col items-start gap-1">
                            <h1 className="text-myblack text-xl font-semibold">Total tests</h1>
                            <h2 className="text-mygrey text-sm">Testing results received in all areas</h2>
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
                <div className="categoryGrid gap-7">
                    {chart_by_category.map((category) => (
                        <CategoryChart category={category} key={category.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}