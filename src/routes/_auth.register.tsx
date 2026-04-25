import { createFileRoute } from '@tanstack/react-router'
import {RegisterPage} from "@/pages/register/RegisterPage.tsx";

export const Route = createFileRoute('/_auth/register')({
    component: RegisterPage,
})