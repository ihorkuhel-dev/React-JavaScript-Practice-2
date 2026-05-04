import { useCallback } from "react";
import { DirectionIcon } from "@/shared/assets/DeclineIcon.tsx";
import { Badge } from "@/shared/ui/badge.tsx";
import MedicationMap from "@/pages/medication-details/ui/MedicationMap.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";
import type { Product } from "@/features/medicine/api/medicineApi.ts";
import {MEDICATION_MOCK_DATA} from "@/features/medicine/api/medication-mock-data.ts";

interface MedicationAsideWidgetProps {
    productData?: Product;
    isLoading: boolean;
}

export function MedicationAsideWidget({ productData, isLoading }: MedicationAsideWidgetProps) {
    const handleOpenMap = useCallback((type: 'apple' | 'google') => {
        const url = type === 'apple' 
            ? `https://maps.apple.com/?q=${encodeURIComponent(MEDICATION_MOCK_DATA.locationFull)}`
            : `https://maps.google.com/?q=${encodeURIComponent(MEDICATION_MOCK_DATA.locationFull)}`;
        window.open(url, '_blank');
    }, []);

    return (
        <aside className='medication-aside border-mygrey-lighter'>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold">Manufacturer</h3>
                <p className="text-sm font-medium text-mygrey">{MEDICATION_MOCK_DATA.manufacturer}</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold">Location</h3>
                {isLoading ? <Skeleton className="w-full h-[400px]" /> : <MedicationMap/>}
                <address className="flex gap-4">
                    <p className="text-sm font-medium text-myblack">{MEDICATION_MOCK_DATA.locationAddress}</p>
                    <p className="text-sm font-medium text-mygrey">{MEDICATION_MOCK_DATA.locationCity}</p>
                </address>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant='secondary'><DirectionIcon color="currentColor"/> Get Directions</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 flex flex-col gap-1 z-[105]" align="end">
                        <Button variant="ghost" className="justify-start w-full" onClick={() => handleOpenMap('apple')}>
                            Apple Maps
                        </Button>
                        <Button variant="ghost" className="justify-start w-full" onClick={() => handleOpenMap('google')}>
                            Google Maps
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold">Tags</h3>
                <div className="flex gap-4 ">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </>
                    ) : productData?.tags ? (
                        productData?.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                        ))
                    )
                        : (
                            <>
                                {MEDICATION_MOCK_DATA.defaultTags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                                ))}
                            </>
                        )
                    }
                </div>
            </div>
        </aside>
    )
}
