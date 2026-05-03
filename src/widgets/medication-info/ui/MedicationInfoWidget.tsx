import { GeoIcon } from "@/shared/assets/GeoIcon.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { toast } from "sonner";
import { appDispatch } from "@/shared/lib/dispatch.ts";
import { MedicationCalendarPopover } from "@/pages/medication-details/ui/MedicationCalendarPopover.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";
import type { Product } from "@/features/medicine/api/medicineApi.ts";

interface MedicationInfoWidgetProps {
    productData?: Product;
    isLoading: boolean;
}

export function MedicationInfoWidget({ productData, isLoading }: MedicationInfoWidgetProps) {
    const handleStartProcess = () => {
        toast.success('Processing product!');
    };

    const handleAddToCalendar = (startDate: Date, endDate: Date) => {
        const title = productData?.title || 'Taking medication';
        const description = productData?.description || '';
        const location = '434 Rockaway Ave, Brooklyn New York, 11212-5636';

        appDispatch.dispatch('add-to-calendar', { title, description, location, startDate, endDate });
    };

    return (
        <div className="medication-info-block">
            <div className="bg-mywhite border-mygrey-lighter base-info">
                <div>
                    {isLoading ? (
                        <>
                            <Skeleton className="h-9 w-3/4 mb-2" />
                            <Skeleton className="h-5 w-1/4" />
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-semibold text-myblack mb-2">{productData?.title}</h1>
                            <p className="text-sm font-medium text-mygrey">{productData?.brand}</p>
                        </>
                    )}
                </div>
                <div className="card-block border-mygrey-lighter ">
                    <div className="card">
                        <div className="flex gap-2 items-center">
                            <span className="bg-myaquamarine-lighter w-10 h-10 rounded-sm flex items-center justify-center">
                                <GeoIcon color="currentColor" className="text-myaquamarine"/>
                            </span>
                            <h3 className="text-lg font-semibold">Location</h3>
                        </div>
                        <p className="text-mygrey text-sm font-medium">434 Rockaway Ave, ,BrooklynNew York,
                            11212-5636</p>
                    </div>
                    <div className="card">
                        <div className="flex gap-2 items-center">
                            <span className="bg-myaquamarine-lighter w-10 h-10 rounded-sm flex items-center justify-center">
                                <GeoIcon color="currentColor" className="text-myaquamarine"/>
                            </span>
                            <h3 className="text-lg font-semibold">Date & Time</h3>
                        </div>
                        <p className="text-mygrey text-sm font-medium">28th June - 2nd July 2022
                            10 am - 4 pm Eastern Daylight Time </p>
                    </div>
                </div>
                <div className="flex gap-4 max-sm:flex-col ">
                    <Button className="flex-1 max-sm:flex-initial" onClick={handleStartProcess}>Start Process</Button>
                    <MedicationCalendarPopover onAdd={handleAddToCalendar} />
                </div>
            </div>
            <div className="about-block">
                <h2 className="text-3xl font-semibold text-myblack">About this event</h2>
                {isLoading ? (
                    <div className="flex flex-col gap-2 mt-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                ) : (
                    <p className="text-sm font-medium text-mygrey">{productData?.description}</p>
                )}
            </div>
        </div>
    )
}
