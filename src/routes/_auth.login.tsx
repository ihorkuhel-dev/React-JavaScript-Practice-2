import { createFileRoute } from '@tanstack/react-router'
import {LoginPage} from "@/pages/login/LoginPage.tsx";

export const Route = createFileRoute('/_auth/login')({
    head: () => ({
        meta: [
            { title: 'CRM | Sign In' },
            { name: 'description', content: 'Log in to your account to access your CRM dashboard, manage your drug inventory, and view real-time analytics.' },
        ],
    }),
    component: LoginPage,
})