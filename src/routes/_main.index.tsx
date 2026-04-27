import { createFileRoute } from '@tanstack/react-router'
import {DashboardPage} from "@/pages/dashboard/DashboardPage.tsx";

export const Route = createFileRoute('/_main/')({
    head: () => ({
        meta: [
            { title: 'CRM | Dashboard' },
            { name: 'description', content: 'Get a complete overview of your pharmaceutical operations. Monitor key metrics, recent system activity, and low-stock alerts at a glance.' },
        ],
    }),
    component: DashboardPage,
})