import { useVanillaChart } from '@/shared/lib/useChart';
import type { ITotalTestsData } from '@/features/dashboard/api/mock-data';

interface TotalTestsChartProps {
    data: ITotalTestsData;
}

export function TotalTestsChart({ data: sourceData }: TotalTestsChartProps) {
    const canvasRef = useVanillaChart<'line'>({
        type: 'line',
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
                    ticks: { maxTicksLimit: 10, align: 'inner' }
                }
            }
        }
    });

    return (
        <div className="relative w-full h-full">
            <canvas ref={canvasRef} />
        </div>
    );
}
