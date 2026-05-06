import {MedicationsTableWidget} from "@/pages/medications-list/ui/MedicationsTableWidget.tsx";

function MedicationListPage() {
    return (
        <>
            <div className="titles-block mb-12">
                <h1>List of medications in development</h1>
                <h2>Brief summary of testing processes</h2>
            </div>
            <MedicationsTableWidget />
        </>
    )
}

export default MedicationListPage;