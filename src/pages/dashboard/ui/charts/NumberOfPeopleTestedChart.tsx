import { memo } from 'react';
import {useVanillaChart , type ChartConfiguration} from "@/pages/dashboard/lib/useChart.ts";

const chartConfig: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
        labels: ['Tested', 'Non-tested'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ['#3874FF', '#E5EDFF'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
            }
        ]
    },
    options: {
        aspectRatio: 2,
        cutout: '80%',
    }
};

export const NumberOfPeopleTestedChart = memo(function NumberOfPeopleTestedChart() {
    const canvasRef = useVanillaChart<'doughnut'>(chartConfig);

    return (
        <div className="w-full h-24 flex justify-center items-end">
            <canvas ref={canvasRef} />
        </div>
    );
});
