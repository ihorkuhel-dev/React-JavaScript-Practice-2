import { createFileRoute } from '@tanstack/react-router'
import {MediacationPage} from "@/pages/medication-details/MedicationPage.tsx";

export const Route = createFileRoute('/_main/medications/$id')({
    component: MediacationPage,
})