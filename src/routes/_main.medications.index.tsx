import { createFileRoute } from '@tanstack/react-router'
import {MedicationListPage} from "@/pages/medications-list/MedicationListPage.tsx";

export const Route = createFileRoute('/_main/medications/')({
    head: () => ({
        meta: [
            { title: 'CRM | Inventory' },
            { name: 'description', content: 'rowse, filter, and manage your complete pharmaceutical database. Quickly check stock levels, categories, and essential drug information.' },
        ],
    }),
    component: MedicationListPage,
})