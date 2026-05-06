import { memo } from 'react';
import {useVanillaChart , type ChartConfiguration} from "@/pages/dashboard/lib/useChart.ts";

const chartConfig: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
        labels: ['Preclinical testing', 'Clinical trials', 'Regulatory approval'],
        datasets: [
            {
                data: [72, 18, 10],
                backgroundColor: ['#3874FF', '#E5EDFF', '#25A7EF'],
                borderWidth: 0,
            }
        ]
    },
    options: {
        cutout: '80%'
    }
};

export const TestingProcessChart = memo(function TestingProcessChart() {
    const canvasRef = useVanillaChart<'doughnut'>(chartConfig);

    return (
        <div className="relative w-full h-32 flex justify-center items-center">
            <canvas ref={canvasRef} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xl font-semibold text-myblack">72%</span>
            </div>
        </div>
    );
});
