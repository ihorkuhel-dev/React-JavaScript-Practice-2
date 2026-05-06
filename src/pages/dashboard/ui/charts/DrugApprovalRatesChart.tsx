import { memo } from 'react';
import {useVanillaChart , type ChartConfiguration} from "@/pages/dashboard/lib/useChart.ts";

const chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
        labels: ['01 May', '02', '03', '04', '05', '06', '07 May'],
        datasets: [
            {
                label: 'Rate A',
                data: [10, 15, 25, 12, 40, 30, 50],
                borderColor: '#3874FF',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
            },
            {
                label: 'Rate B',
                data: [5, 10, 8, 20, 15, 10, 18],
                borderColor: '#E0E3EB',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
            }
        ]
    },
    options: {
        scales: {
            y: { display: false },
            x: {
                grid: { display: false },
                ticks: { maxTicksLimit: 2, align: 'inner' as const }
            }
        }
    }
};

export const DrugApprovalRatesChart = memo(function DrugApprovalRatesChart() {
    const canvasRef = useVanillaChart<'line'>(chartConfig);

    return (
        <div className="w-full h-32">
            <canvas ref={canvasRef} />
        </div>
    );
});
