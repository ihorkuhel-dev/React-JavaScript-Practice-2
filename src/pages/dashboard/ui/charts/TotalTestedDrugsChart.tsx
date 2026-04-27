import { useVanillaChart } from '@/shared/lib/useChart';

export function TotalTestedDrugsChart() {
    const canvasRef = useVanillaChart<'bar'>({
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [
                {
                    label: 'Tested',
                    data: [40, 60, 45, 70, 50, 80, 55],
                    backgroundColor: '#3874FF',
                    borderRadius: 4,
                    barPercentage: 0.4,
                },
                {
                    label: 'Awaiting',
                    data: [20, 30, 25, 35, 25, 40, 30],
                    backgroundColor: '#E5EDFF',
                    borderRadius: 4,
                    barPercentage: 0.4,
                }
            ]
        },
        options: {
            scales: {
                x: { display: false, stacked: false },
                y: { display: false, min: 0, stacked: false }
            }
        }
    });

    return (
        <div className="w-full h-32 flex items-center justify-center">
            <div className="w-32 h-full">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
