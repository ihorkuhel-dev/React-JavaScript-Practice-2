import { createFileRoute } from '@tanstack/react-router'
import {DashboardPage} from "@/pages/dashboard/DashboardPage.tsx";

export const Route = createFileRoute('/_main/')({
    component: DashboardPage,
})