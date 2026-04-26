import * as React from "react";

export const LogOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={className} viewBox="0 0 24 24" fill="none"><path d="M21 12h-8m5 3 2.913-2.913a.123.123 0 0 0 0-.174L18 9m-2-4v-.5A1.5 1.5 0 0 0 14.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.5a1.5 1.5 0 0 0 1.5-1.5V19" stroke={color}/></svg>);