import {HomeIcon} from "@/shared/assets/HomeIcon.tsx";
import {TableIcon} from "@/shared/assets/TableIcon.tsx";
import {ProcessIcon} from "@/shared/assets/ProcessIcon.tsx";
import {DocumentationIcon} from "@/shared/assets/DocumentationIcon.tsx";
import type {FC, SVGProps} from "react";

export interface INavLink {
    id: string | number;
    title: string;
    to: string;
    icon:  FC<SVGProps<SVGSVGElement>>;
}

export const NAV_LINK: INavLink[] = [
    {
        id: 'link-home',
        title: 'Home',
        to: '/',
        icon: HomeIcon,
    },
    {
        id: 'link-tables',
        title: 'Tables',
        to: '/medications',
        icon: TableIcon,
    },
    {
        id: 'link-process',
        title: 'Process',
        to: '#',
        icon: ProcessIcon,
    },
    {
        id: 'link-documentation',
        title: 'Documentation',
        to: '#',
        icon: DocumentationIcon,
    },
];
