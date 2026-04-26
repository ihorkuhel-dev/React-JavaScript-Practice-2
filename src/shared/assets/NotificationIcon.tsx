import * as React from "react";

export const NotificationIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24}) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.154 18.572a1.91 1.91 0 0 0 3.013 1.03 1.9 1.9 0 0 0 .68-1.03M12 4a5.286 5.286 0 0 1 5.28 5.284c0 5.876 2.142 7.034 2.72 7.034H4c.59 0 2.72-1.17 2.72-7.034A5.286 5.286 0 0 1 12 4" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
)