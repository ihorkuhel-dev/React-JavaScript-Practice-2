import * as React from "react";

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 56, height = 56, color, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 64 64" className={className} strokeWidth="3" stroke={color} fill="none"><path d="M38.61 54.93 27.94 35.57 9.08 25.38a1 1 0 0 1 .2-1.8l44.8-14.94a1 1 0 0 1 1.27 1.27L40.41 54.73a1 1 0 0 1-1.8.2Z"/><path strokeLinecap="round" d="M55.13 8.91 27.94 35.57"/></svg>
)