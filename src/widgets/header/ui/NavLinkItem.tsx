import { memo, useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { toast } from "sonner";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu.tsx";
import type { INavLink } from "@/shared/config/header.ts";

export const NavLinkItem = memo(({ link, onClick }: { link: INavLink, onClick?: () => void }) => {
    const Icon = link.icon;
    const location = useLocation();

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (link.to === '#') {
            e.preventDefault();
            toast.warning('This page in development', {
                action: {
                    label: "Undo",
                    onClick: () => { },
                }
            });
        } else if (link.to === location.pathname) {
            e.preventDefault();
            toast.error('This is the same page', {
                action: {
                    label: "Undo",
                    onClick: () => { },
                }
            });
        }
        if (onClick) onClick();
    }, [link.to, location.pathname, onClick]);

    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link onClick={handleClick} to={link.to} className="header-button text-mygrey hover:text-myblack hover:bg-mygrey-light">
                    {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5" />}
                    {link.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});
