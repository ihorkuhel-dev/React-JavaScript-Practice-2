import { createFileRoute } from '@tanstack/react-router'
import {MedicationPage} from "@/pages/medication-details/MedicationPage.tsx";

export const Route = createFileRoute('/_main/medications/$id')({
    head: () => ({
        meta: [
            { title: 'CRM | Details & Inventory' },
            { name: 'description', content: 'View comprehensive details for Drug #1, including dosages, active ingredients, current stock levels, and manufacturer information.' },
        ],
    }),
    component: MedicationPage,
})