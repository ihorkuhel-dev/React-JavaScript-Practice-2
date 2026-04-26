import {HomeIcon} from "@/shared/assets/HomeIcon.tsx";
import {TableIcon} from "@/shared/assets/TableIcon.tsx";
import {ProcessIcon} from "@/shared/assets/ProcessIcon.tsx";
import {DocumentationIcon} from "@/shared/assets/DocumentationIcon.tsx";
import {LogOutIcon} from "@/shared/assets/LogOutIcon.tsx";
import {SunIcon} from "@/shared/assets/SunIcon.tsx";
import type {FC, SVGProps} from "react";

export interface INavLink {
    id: string | number;
    title: string;
    to: string;
    icon:  FC<SVGProps<SVGSVGElement>>;
}

export interface INavButton {
    id: string | number;
    description: string;
    onClick: () => void;
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
        to: '/profile',
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

export const NAV_BUTTON: INavButton[] = [
    {
        id: 'btn-theme',
        description: 'Change theme',
        onClick: () => {
            console.log('Тема изменена');
        },
        icon: SunIcon,
    },
    {
        id: 'btn-logout',
        description: 'Logout',
        onClick: () => {
            console.log('Пользователь вышел');
        },
        icon: LogOutIcon,
    },
];