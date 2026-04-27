import { createFileRoute } from '@tanstack/react-router'
import {RegisterPage} from "@/pages/register/RegisterPage.tsx";

export const Route = createFileRoute('/_auth/register')({
    head: () => ({
        meta: [
            { title: 'CRM | Create Account' },
            { name: 'description', content: 'Register for to manage your pharmaceutical inventory, track drug data, and streamline your clinical workflow securely.' },
        ],
    }),
    component: RegisterPage,
})