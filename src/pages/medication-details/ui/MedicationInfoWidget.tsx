import { useCallback } from "react";
import { GeoIcon } from "@/shared/assets/GeoIcon.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { toast } from "sonner";
import { openGoogleCalendar } from "@/pages/medication-details/lib/calendar.ts";
import { MedicationCalendarPopover } from "@/pages/medication-details/ui/MedicationCalendarPopover.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";
import type { Product } from "@/features/medicine/api/medicineApi.ts";
import {MEDICATION_MOCK_DATA} from "@/features/medicine/api/medication-mock-data.ts";

interface MedicationInfoWidgetProps {
    productData?: Product;
    isLoading: boolean;
}

export function MedicationInfoWidget({ productData, isLoading }: MedicationInfoWidgetProps) {
    const handleStartProcess = useCallback(() => {
        toast.success('Processing product!');
    }, []);

    const handleAddToCalendar = useCallback((startDate: Date, endDate: Date) => {
        const title = productData?.title || 'Taking medication';
        const description = productData?.description || '';
        const location = MEDICATION_MOCK_DATA.locationFull;
        openGoogleCalendar(title, description, location, startDate, endDate);
    }, [productData?.title, productData?.description]);

    return (
        <div className="medication-info-block flex-colum">
            <div className="info-block flex-colum">
                <div>
                    {isLoading ? (
                        <>
                            <Skeleton className="h-9 w-3/4 mb-2" />
                            <Skeleton className="h-5 w-1/4" />
                        </>
                    ) : (
                        <>
                            <h1 className="mb-2">{productData?.title}</h1>
                            <p>{productData?.brand}</p>
                        </>
                    )}
                </div>
                <div className="card-block">
                    <div className="card flex-colum">
                        <div className="card-info">
                            <span className="card-icon bg-myaquamarine-lighter">
                                <GeoIcon color="currentColor" className="text-myaquamarine"/>
                            </span>
                            <h3>Location</h3>
                        </div>
                        <p>{MEDICATION_MOCK_DATA.locationFull}</p>
                    </div>
                    <div className="card flex-colum">
                        <div className="card-info">
                            <span className="card-icon bg-myaquamarine-lighter">
                                <GeoIcon color="currentColor" className="text-myaquamarine"/>
                            </span>
                            <h3>Date & Time</h3>
                        </div>
                        <p>{MEDICATION_MOCK_DATA.dateTime}</p>
                    </div>
                </div>
                <div className="flex gap-4 max-sm:flex-col ">
                    <Button className="flex-1 max-sm:flex-initial" onClick={handleStartProcess}>Start Process</Button>
                    <MedicationCalendarPopover onAdd={handleAddToCalendar} />
                </div>
            </div>
            <div className="flex-colum">
                <h2 className="text-3xl font-semibold text-myblack">About this event</h2>
                {isLoading ? (
                    <div className="flex flex-col gap-2 mt-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                ) : (
                    <p>{productData?.description}</p>
                )}
            </div>
        </div>
    )
}
