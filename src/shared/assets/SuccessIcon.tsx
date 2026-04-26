import * as React from "react";

export const SuccessIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({color, width = 24, height = 24}) => (
    <svg width={width} height={height} viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.541 8.868c.42.42 1.11.405 1.515-.03l6.63-7.2a.987.987 0 0 0-.06-1.38.974.974 0 0 0-1.38.06l-5.985 6.51-3.6-3.6a.987.987 0 0 0-1.38 0 .987.987 0 0 0 0 1.38z" fill={color}/></svg>
)