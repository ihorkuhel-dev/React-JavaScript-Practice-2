import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  DoughnutController,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ChartConfiguration, ChartType } from 'chart.js';
import { useEffect, useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  DoughnutController,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

export type { ChartConfiguration };

export function useVanillaChart<T extends ChartType>(config: ChartConfiguration<T>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<ChartJS | null>(null);
    const configRef = useRef(config);

    useEffect(() => {
        configRef.current = config;
    });

    const dataString = JSON.stringify(config.data);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const currentConfig = configRef.current;

        const existingChart = ChartJS.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
        
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        const mergedConfig = {
            ...currentConfig,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                ...currentConfig.options,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true, mode: 'index' as const, intersect: false },
                    ...currentConfig.options?.plugins
                },
                transitions: {
                    resize: {
                        animation: {
                            duration: 0
                        }
                    },
                    ...currentConfig.options?.transitions
                }
            }
        } as unknown as ChartConfiguration<T>;

        chartInstance.current = new ChartJS(canvas, mergedConfig) as unknown as ChartJS;

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            if (canvas) {
                const chartToDestroy = ChartJS.getChart(canvas);
                if (chartToDestroy) {
                    chartToDestroy.destroy();
                }
            }
        };
    }, [dataString]);

    return canvasRef;
}
