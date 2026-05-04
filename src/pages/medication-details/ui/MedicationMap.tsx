import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef, memo} from "react";
import {useTheme} from "@/shared/lib/ThemeContext.tsx";

export default memo(function MedicationMap() {

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const {theme} = useTheme();
    const styleApi = theme == 'light' ? 'streets-v12' : 'dark-v11'
    const API_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

    useEffect(() => {
        if(mapRef.current && !mapInstanceRef.current){
            const map = L.map(mapRef.current,{
                center: [51.505, -0.09],
                zoom: 10,
                preferCanvas: true,
                zoomControl: false
            })

            L.tileLayer(
                `https://api.mapbox.com/styles/v1/mapbox/${styleApi}/tiles/256/{z}/{x}/{y}@2x?access_token=${API_TOKEN}`,
                {
                    maxZoom: 19
                }
            ).addTo(map);

            L.marker([51.505, -0.09], {alt: 'Warsaw'})
                .addTo(map)

            mapInstanceRef.current = map;
        }

        return() => {
            if (mapInstanceRef.current){
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null;
            }
        }
    }, [styleApi])

    return (
        <div
            ref={mapRef}
            style={{ height: '400px', width: '100%' , zIndex: 5 }}
        />
    )
});