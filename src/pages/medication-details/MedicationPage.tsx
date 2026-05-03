import {getRouteApi} from "@tanstack/react-router";
import {useProductById} from "@/features/medicine/api/medicineApi.ts";
import { MedicationInfoWidget } from "@/widgets/medication-info/ui/MedicationInfoWidget.tsx";
import { MedicationAsideWidget } from "@/widgets/medication-aside/ui/MedicationAsideWidget.tsx";
import './MedicationPage.scss'

export function MedicationPage() {
    const routeApi = getRouteApi('/_main/medications/$id')
    const { id } = routeApi.useParams()

    const {
        data: productData,
        isLoading
    } = useProductById(id, true);

    return (
        <div className="medication-page">
            <MedicationInfoWidget productData={productData} isLoading={isLoading} />
            <MedicationAsideWidget productData={productData} isLoading={isLoading} />
        </div>
    )
}