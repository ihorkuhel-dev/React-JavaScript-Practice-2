import { createFileRoute } from '@tanstack/react-router'
import {MedicationPage} from "@/pages/medication-details/MedicationPage.tsx";

export const Route = createFileRoute('/_main/medications/$id')({
    component: MedicationPage,
})