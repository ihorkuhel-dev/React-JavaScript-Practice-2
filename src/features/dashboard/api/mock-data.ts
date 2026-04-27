import type { FC, SVGProps } from 'react';
import {StarIcon} from "@/shared/assets/StarIcon.tsx";
import {PauseIcon} from "@/shared/assets/PauseIcon.tsx";
import {CancelIcon} from "@/shared/assets/CancelIcon.tsx";

export interface IChartSummary {
    id: string | number;
    title: string;
    subTitle: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    className: string;
}

export interface ICategoryData {
    id: string | number;
    className: string;
    title: string;
    value: number | string;
}

export interface IChartByCategory {
    id: string | number;
    title: string;
    subTitle: string;
    totalPercentage?: number | string;
    count?: number | string;
    data: ICategoryData[];
}

export const chart_summary: IChartSummary[] = [
    {
        id: 1,
        title: 'Medicine #580',
        subTitle: 'Awaiting results',
        icon: StarIcon,
        className: 'green',
    },
    {
        id: 2,
        title: 'Awaiting results',
        subTitle: 'On hold',
        icon: PauseIcon,
        className: 'orange',
    },
    {
        id: 3,
        title: '15 products',
        subTitle: 'Out of stock',
        icon: CancelIcon,
        className: 'red',
    },
];

export const chart_by_category: IChartByCategory[] = [
    {
        id: 'cat-1',
        title: 'Total tested drugs',
        subTitle: 'Last 7 days',
        totalPercentage: '-6.8%',
        count: '16,247',
        data: [
            {
                id: 'd-1',
                className: 'bg-accent',
                title: 'Completed',
                value: "52%",
            },
            {
                id: 'd-2',
                className: 'bg-accent-lighter',
                title: 'Awaiting results',
                value: "48%",
            }
        ]
    },
    {
        id: 'cat-2',
        title: 'Drug approval rates',
        subTitle: 'Last 7 days',
        totalPercentage: '+26.5%',
        count: 356,
        data: [
            {
                id: 'a-1',
                className: '',
                title: '01 May',
                value: '07 May',
            }
        ]
    },
    {
        id: 'cat-3',
        title: 'Testing process',
        subTitle: 'Last 7 days',
        data: [
            {
                id: 'a-1',
                className: 'bg-accent',
                title: 'Preclinical testing',
                value: '72%',
            },
            {
                id: 'a-2',
                className: 'bg-accent-lighter',
                title: 'Clinical trials',
                value: '18%',
            },
            {
                id: 'a-3',
                className: 'bg-myaquamarine',
                title: 'Regulatory approval',
                value: '10%',
            }
        ]
    },
    {
        id: 'cat-4',
        title: 'Number of people tested',
        subTitle: 'Last 7 days',
        data: [
            {
                id: 'a-1',
                className: 'bg-accent',
                title: 'Tested',
                value: '70%',
            },
            {
                id: 'a-2',
                className: 'bg-accent-lighter',
                title: 'Non-tested',
                value: '30%',
            }
        ]
    }
];

export interface ITotalTestsData {
    period: string;
    labels: string[];
    completed: number[];
    awaiting: number[];
}

export const total_tests_data: ITotalTestsData[] = [
    {
        period: "Mar 1 - 31, 2022",
        labels: ["01 Mar", "05 Mar", "10 Mar", "15 Mar", "20 Mar", "25 Mar", "31 Mar"],
        completed: [120, 200, 150, 400, 300, 600, 450],
        awaiting: [80, 100, 50, 250, 200, 400, 300]
    },
    {
        period: "Apr 1 - 30, 2022",
        labels: ["01 Apr", "05 Apr", "10 Apr", "15 Apr", "20 Apr", "25 Apr", "30 Apr"],
        completed: [150, 220, 180, 450, 320, 650, 500],
        awaiting: [90, 110, 60, 270, 210, 420, 310]
    },
    {
        period: "May 1 - 31, 2022",
        labels: ["01 May", "05 May", "10 May", "15 May", "20 May", "25 May", "31 May"],
        completed: [100, 150, 120, 300, 250, 500, 350],
        awaiting: [50, 80, 40, 150, 120, 300, 200]
    }
];

