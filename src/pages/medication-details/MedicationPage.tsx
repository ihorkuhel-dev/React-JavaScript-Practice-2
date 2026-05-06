import {getRouteApi} from "@tanstack/react-router";
import {useProductById} from "@/features/medicine/api/medicineApi.ts";
import {MedicationInfoWidget} from "@/pages/medication-details/ui/MedicationInfoWidget.tsx";
import {MedicationAsideWidget} from "@/pages/medication-details/ui/MedicationAsideWidget.tsx";

export function MedicationPage() {
    const routeApi = getRouteApi('/_main/medications/$id')
    const { id } = routeApi.useParams()

    const {
        data: productData,
        isLoading
    } = useProductById(id, true);

    return (
        <div className="flex gap-6 medication-page max-l:flex-col">
            <MedicationInfoWidget productData={productData} isLoading={isLoading} />
            <MedicationAsideWidget productData={productData} isLoading={isLoading} />
        </div>
    )
}