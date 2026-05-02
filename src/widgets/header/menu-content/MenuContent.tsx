import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu.tsx"
import {Link} from "@tanstack/react-router";
import {NAV_BUTTON, NAV_LINK} from "@/shared/config/header.ts";
import {Button} from "@/shared/ui/button.tsx";
import { appDispatch } from '@/shared/lib/dispatch.ts'
import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import { MoonIcon } from "@/shared/assets/MoonIcon.tsx";
import { SunIcon } from "@/shared/assets/SunIcon.tsx";
import {memo} from "react";
import { useGetCurrentUser } from "@/features/auth/api/authApi.ts";

const NavLinkItem = ({ link, onClick }: { link: typeof NAV_LINK[0], onClick?: () => void }) => {
    const Icon = link.icon;
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link onClick={onClick} to={link.to} className="header-button text-mygrey hover:text-myblack hover:bg-mygrey-light">
                    {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5"/>}
                    {link.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const NavButtonItem = ({ button, theme, onClick, userImage }: { button: typeof NAV_BUTTON[0], theme: string, onClick?: () => void, userImage?: string }) => {
    const isTheme = button.onClick === 'switch-theme';
    const isAvatar = button.id === 'btn-avatar';
    const isDark = theme === 'dark';
    
    const handleAction = () => {
        appDispatch.dispatch(button.onClick as 'logout' | 'switch-theme' | 'open-user-avatar');
        if (onClick && (button.onClick === 'logout' || isAvatar)) onClick();
    };

    const CurrentIcon = isTheme ? (isDark ? MoonIcon : SunIcon) : button.icon;

    let btnClasses = "text-mygrey-darker hover:text-myblack hover:bg-mygrey-light";
    if (isTheme) {
        btnClasses = isDark 
            ? "text-mygrey-darker hover:text-myblack hover:bg-mygrey-light rounded-full w-9"
            : "text-myorange-darker bg-myorange-lighter rounded-full w-9";
    }

    return (
        <NavigationMenuItem className="text-mygrey-darker flex items-center justify-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button
                    variant="circle"
                    size={isTheme || isAvatar ? "circle" : "default"}
                    className={`${btnClasses} ${isAvatar ? 'p-0 overflow-hidden w-9 h-9' : ''}`}
                    onClick={handleAction}
                >
                    {isAvatar && userImage ? (
                        <img src={userImage} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        CurrentIcon && (
                            <CurrentIcon 
                                aria-hidden="true" 
                                color="currentColor" 
                                className={`size-5 ${isTheme && !isDark ? 'text-myorange-darker' : ''}`} 
                            />
                        )
                    )}
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const MenuContent = memo(function MenuContent({ onClick }: { onClick?: () => void }) {
    const { theme } = useTheme();
    const { data: user } = useGetCurrentUser();

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
                    {NAV_BUTTON.map(button => (
                        <NavButtonItem key={button.id} button={button} theme={theme} onClick={onClick} userImage={user?.image} />
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
});

export default MenuContent;
