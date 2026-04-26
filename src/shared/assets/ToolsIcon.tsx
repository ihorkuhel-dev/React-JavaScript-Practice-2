import * as React from "react";

export const ToolsIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24, className}) => (
    <svg width={width} className={className} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0m0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m8-14a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m2 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4m2 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-2 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" fill={color}/></svg>
)