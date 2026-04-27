import * as React from "react";

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={className} viewBox="0 0 24 24" fill="none"><path d="M3.32 11.684a9 9 0 0 0 17.357 3.348A9 9 0 0 1 8.32 6.683c0-1.18.23-2.32.644-3.353a9 9 0 0 0-5.645 8.354" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)