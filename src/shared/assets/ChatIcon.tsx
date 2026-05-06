import * as React from "react";

export const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 24, height = 24, color, className}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        className={className}
        viewBox="0 0 32 32"
    >
        <path
            d="M420 309.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m-3 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m-3 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m-4-9a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m-3 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m-3 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1"
            style={{
                color: color,
                fill: color,
                fillRule: "evenodd",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4.1,
            }}
            transform="translate(-396 -292)"
        />
        <path
            d="M400.059 294.014c-1.094 0-2.059.877-2.059 2v10c0 1.122.965 2 2.059 2H402v3a1 1 0 0 0 1.707.707l3.707-3.707H408v7c0 1.122.965 2 2.059 2h4.88l3.707 3.707a1 1 0 0 0 1.708-.707v-3h3.587c1.094 0 2.059-.878 2.059-2v-10c0-1.122-.965-2-2.059-2H416v-7c0-1.123-.965-2-2.059-2zm0 2h13.882c.04 0 .054.004.059.006v9.988a.2.2 0 0 1-.059.006H407a1 1 0 0 0-.707.293L404 308.6v-1.586a1 1 0 0 0-1-1h-2.941a.2.2 0 0 1-.059-.006v-9.989a.2.2 0 0 1 .059-.006zm15.941 9h7.941c.04 0 .054.004.059.006v9.988a.2.2 0 0 1-.059.006h-4.587a1 1 0 0 0-1 1v1.586l-2.293-2.293a1 1 0 0 0-.707-.293h-5.295a.2.2 0 0 1-.059-.006v-6.994h3.941c1.094 0 2.059-.878 2.059-2z"
            style={{
                color: color,
                fill: color,
                fillRule: "evenodd",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 4.1,
            }}
            transform="translate(-396 -292)"
        />
    </svg>
)