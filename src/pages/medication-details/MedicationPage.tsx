import {getRouteApi} from "@tanstack/react-router";
import {useProductById} from "@/features/medecine/api/medicineApi.ts";
import {GeoIcon} from "@/shared/assets/GeoIcon.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {CalendarIcon} from "@/shared/assets/CalendarIcon.tsx";
import {DirectionIcon} from "@/shared/assets/DeclineIcon.tsx";
import {Badge} from "@/shared/ui/badge.tsx";
import './MedicationPage.scss'
export function MedicationPage() {

    const routeApi = getRouteApi('/_main/medications/$id')
    const { id } = routeApi.useParams()

    const {
        data: productData,
    } = useProductById(id, true);

    return (
        <div className="medication-page">
            <div className="medication-info-block">
                <div className="bg-mywhite border-mygrey-lighter base-info">
                    <div>
                        <h1 className="text-3xl font-semibold text-myblack mb-2">{productData?.title}</h1>
                        <p className="text-sm font-medium text-mygrey">{productData?.brand}</p>
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
                        <Button className="flex-1 max-sm:flex-initial">Start Process</Button>
                        <Button className="flex-1 max-sm:flex-initial"
                                variant="secondary">
                            <CalendarIcon color="currentColor" className="mr-1" /> Add to Calendar
                        </Button>
                    </div>
                </div>
                <div className="about-block">
                    <h2 className="text-3xl font-semibold text-myblack">About this event</h2>
                    <p className="text-sm font-medium text-mygrey">{productData?.description}</p>
                </div>
            </div>
            <aside className='medication-aside border-mygrey-lighter'>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">Manufacturer</h3>
                    <p className="text-sm font-medium text-mygrey">Serenity Health Clinic</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">Location</h3>

                    <address className="flex gap-4">
                        <p className="text-sm font-medium text-myblack">434 Rockaway Ave, 11212-5636</p>
                        <p className="text-sm font-medium text-mygrey">Brooklyn New York</p>
                    </address>

                    <Button variant='secondary'><DirectionIcon color="currentColor"/> Get Directions</Button>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">Tags</h3>
                    <div className="flex gap-4 ">
                        {productData?.tags ? (
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