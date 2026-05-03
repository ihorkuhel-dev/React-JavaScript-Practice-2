import {getRouteApi} from "@tanstack/react-router";
import {useProductById} from "@/features/medecine/api/medicineApi.ts";
import {GeoIcon} from "@/shared/assets/GeoIcon.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {DirectionIcon} from "@/shared/assets/DeclineIcon.tsx";
import {Badge} from "@/shared/ui/badge.tsx";
import './MedicationPage.scss'
import MedicationMap from "@/pages/medication-details/ui/MedicationMap.tsx";
import {toast} from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx";
import { appDispatch } from "@/shared/lib/dispatch.ts";
import { MedicationCalendarPopover } from "@/pages/medication-details/ui/MedicationCalendarPopover.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";

export function MedicationPage() {

    const routeApi = getRouteApi('/_main/medications/$id')
    const { id } = routeApi.useParams()

    const {
        data: productData,
        isLoading
    } = useProductById(id, true);

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
        <div className="medication-page">
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
            <aside className='medication-aside border-mygrey-lighter'>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">Manufacturer</h3>
                    <p className="text-sm font-medium text-mygrey">Serenity Health Clinic</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">Location</h3>
                    {isLoading ? <Skeleton className="w-full h-[400px]" /> : <MedicationMap/>}
                    <address className="flex gap-4">
                        <p className="text-sm font-medium text-myblack">434 Rockaway Ave, 11212-5636</p>
                        <p className="text-sm font-medium text-mygrey">Brooklyn New York</p>
                    </address>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant='secondary'><DirectionIcon color="currentColor"/> Get Directions</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2 flex flex-col gap-1 z-[105]" align="end">
                            <Button variant="ghost" className="justify-start w-full" onClick={() => window.open(`https://maps.apple.com/?q=${encodeURIComponent('434 Rockaway Ave, Brooklyn New York')}`, '_blank')}>
                                Apple Maps
                            </Button>
                            <Button variant="ghost" className="justify-start w-full" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent('434 Rockaway Ave, Brooklyn New York')}`, '_blank')}>
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
                                    <Badge variant="secondary" className="capitalize">Medicine #459026</Badge>
                                    <Badge variant="secondary" className="capitalize">Vaccine #78</Badge>
                                </>
                            )
                        }

                    </div>
                </div>
            </aside>
        </div>

    )
}