import * as React from "react";

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24}) => (
    <svg width={width} height={height} viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="m15.225 5.462 3 3a.65.65 0 0 1-.85.983l-1.15-1.15v7.867a1.3 1.3 0 0 1-1.3 1.3h-3.2a1.3 1.3 0 0 1-1.3-1.3v-5.4h-2.4v5.4a1.3 1.3 0 0 1-1.3 1.3h-3.2a1.3 1.3 0 0 1-1.3-1.3V8.295l-1.15 1.15a.65.65 0 0 1-.85-.983l3-3L8.305.38a1.3 1.3 0 0 1 1.84 0zm-.3 10.7h-3.2v-5.4a1.3 1.3 0 0 0-1.3-1.3h-2.4a1.3 1.3 0 0 0-1.3 1.3v5.4h-3.2V7l5.7-5.7 5.7 5.7z" fill={color}/></svg>
)