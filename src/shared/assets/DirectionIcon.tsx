import * as React from "react";

export const DirectionIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24, className}) => (
    <svg width={width} className={className} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8.154H5.077L2 5.077 5.077 2H12v20m0-9.23h6.923L22 9.691l-3.077-3.077H12m0 10.77H5.077L2 14.308l3.077-3.077H12" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
)