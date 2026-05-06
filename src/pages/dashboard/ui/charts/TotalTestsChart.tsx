import type { ITotalTestsData } from '@/features/dashboard/api/mock-data';
import { memo, useMemo } from 'react';
import {useVanillaChart} from "@/pages/dashboard/lib/useChart.ts";

interface TotalTestsChartProps {
    data: ITotalTestsData;
}

export const TotalTestsChart = memo(function TotalTestsChart({ data: sourceData }: TotalTestsChartProps) {
    const chartConfig = useMemo(() => ({
        type: 'line' as const,
        data: {
            labels: sourceData.labels,
            datasets: [
                {
                    label: 'Completed',
                    data: sourceData.completed,
                    borderColor: '#3874FF',
                    backgroundColor: 'rgba(56, 116, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                },
                {
                    label: 'Awaiting results',
                    data: sourceData.awaiting,
                    borderColor: '#25A7EF',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            scales: {
                y: { display: false, min: 0 },
                x: {
                    grid: { display: true },
                    border: { display: false },
                    ticks: { maxTicksLimit: 10, align: 'inner' as const }
                }
            }
        }
    }), [sourceData]);

    const canvasRef = useVanillaChart<'line'>(chartConfig);

    return (
        <div className="relative w-full h-full min-h-[300px]">
            <canvas ref={canvasRef} />
        </div>
    );
});
