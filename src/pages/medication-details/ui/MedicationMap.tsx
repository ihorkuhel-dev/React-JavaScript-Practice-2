import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from "react";

export default function MedicationMap() {

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map>(null);

    const styleApi = 'streets-v12'
    const API_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

    useEffect(() => {
        if(mapRef.current && !mapInstanceRef.current){
            const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

            L.tileLayer(
                `https://api.mapbox.com/styles/v1/mapbox/${styleApi}/tiles/256/{z}/{x}/{y}@2x?access_token=${API_TOKEN}`,
                {
                    maxZoom: 19,
                }
            ).addTo(map);

            L.marker([51.505, -0.09], {alt: 'Warsaw'})
                .addTo(map)

            mapInstanceRef.current = map;
        }

        return() => {
            if (mapInstanceRef.current){
                mapInstanceRef.current.remove()
                mapInstanceRef.current = undefined;
            }
        }
    }, [])

    return (
        <div
            ref={mapRef}
            style={{ height: '400px', width: '100%' }}
        />
    )
}