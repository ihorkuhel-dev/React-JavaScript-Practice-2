import { memo, useCallback } from "react";
import { NavigationMenu, NavigationMenuList } from "@/shared/ui/navigation-menu.tsx";
import { NAV_LINK } from "@/shared/config/header.ts";
import { NavLinkItem } from "@/widgets/header/ui/NavLinkItem.tsx";
import { ThemeToggleButton } from "@/widgets/header/ui/ThemeToggleButton.tsx";
import { UserAvatarMenu } from "@/widgets/header/ui/UserAvatarMenu.tsx";
import { ActionButton } from "@/widgets/header/ui/ActionButton.tsx";
import { LogOutIcon } from "@/shared/assets/LogOutIcon.tsx";
import { removeTokens} from "@/shared/utils/cookies.ts";
import { router } from "@/app/main.tsx";
import { toast } from "sonner";
import {ToolsIcon} from "@/shared/assets/ToolsIcon.tsx";

const MenuContent = memo(function MenuContent({ onClick, isMobile }: { onClick?: () => void, isMobile: boolean }) {
    
    const handleLogout = useCallback(() => {
        removeTokens();
        void router.navigate({ to: '/login' });
        if (onClick) onClick();
    }, [onClick]);

    const handleTools = useCallback(() => {
        toast.info('Tools in development', {
            action: {
                label: "Undo",
                onClick: () => {},
            }
        });
        if (onClick) onClick();
    }, [onClick]);

    return (
        <>
            <div aria-hidden="true"></div>

            <NavigationMenu className="justify-self-center">
                <NavigationMenuList className="navigation-group">
                    {NAV_LINK.map(link => (
                        <NavLinkItem key={link.id} link={link} onClick={onClick} />
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="justify-self-end bottom-group">
                <NavigationMenuList className="navigation-group button-group" >
                    <ThemeToggleButton />
                    <ActionButton 
                        icon={LogOutIcon} 
                        description="Logout" 
                        onClick={handleLogout} 
                    />
                    <ActionButton 
                        icon={ToolsIcon} 
                        description="Tools" 
                        onClick={handleTools} 
                    />
                    <UserAvatarMenu isMobile={isMobile} />
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
});

export default MenuContent;