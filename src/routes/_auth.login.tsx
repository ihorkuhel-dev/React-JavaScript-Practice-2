import { createFileRoute } from '@tanstack/react-router'
import {LoginPage} from "@/pages/login/LoginPage.tsx";

export const Route = createFileRoute('/_auth/login')({
    component: LoginPage,
})