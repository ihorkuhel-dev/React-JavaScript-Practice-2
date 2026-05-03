import { MedicationsTableWidget } from "@/widgets/medications-table/ui/MedicationsTableWidget.tsx";

function MedicationListPage() {
    return (
        <>
            <div className="flex flex-col items-start gap-2 mb-12">
                <h1 className="text-myblack text-2xl font-semibold">List of medications in development</h1>
                <h2 className="text-mygrey text-sm">Brief summary of testing processes</h2>
            </div>
            <MedicationsTableWidget />
        </>
    )
}

export default MedicationListPage;