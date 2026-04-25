import { createFileRoute } from '@tanstack/react-router'
import {MedicationListPage} from "@/pages/medications-list/MedicationListPage.tsx";

export const Route = createFileRoute('/_main/medications/')({
    component: MedicationListPage,
})