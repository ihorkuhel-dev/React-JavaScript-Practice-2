import * as React from "react";

export const MapMarkerIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24}) => (
    <svg xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="-3 0 24 24"><path fill={color} d="M8.075 23.52C1.264 13.642 0 12.629 0 9c0-4.971 4.029-9 9-9s9 4.029 9 9c0 3.629-1.264 4.64-8.075 14.516a1.126 1.126 0 0 1-1.847.004l-.002-.004zM9 12.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5"/></svg>
)