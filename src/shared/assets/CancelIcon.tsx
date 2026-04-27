import * as React from "react";

export const CancelIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 24, height = 24, className}) => (
<svg className={className} height={height} width={width} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="23.773" width="29.204" height="29.204" rx="6" transform="rotate(-7.836 4 23.773)" fill="#faa69a"/><circle cx="35.461" cy="21.375" r="16.375" fill="#f8d9d6" stroke="#fff" strokeWidth="2"/><rect x="29.594" y="16.466" width="3.466" height="14.373" rx="1" transform="rotate(-40 29.594 16.466)" fill="#d63f3a"/><rect x="38.836" y="14.238" width="3.466" height="14.373" rx="1" transform="rotate(40 38.836 14.238)" fill="#d63f3a"/></svg>
)