import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu.tsx"
import {Link, useLocation} from "@tanstack/react-router";
import {NAV_BUTTON, NAV_LINK} from "@/shared/config/header.ts";
import {Button} from "@/shared/ui/button.tsx";
import { appDispatch } from '@/shared/lib/dispatch.ts'
import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import { MoonIcon } from "@/shared/assets/MoonIcon.tsx";
import { SunIcon } from "@/shared/assets/SunIcon.tsx";
import {memo} from "react";
import { useGetCurrentUser, type User } from "@/features/auth/api/authApi.ts";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";

const NavLinkItem = ({ link, onClick }: { link: typeof NAV_LINK[0], onClick?: () => void }) => {
    const Icon = link.icon;
    const location = useLocation();

    const handleClick = (e: React.MouseEvent) => {
        if (link.to === '#') {
            e.preventDefault();
            toast.warning('This page in development' , {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                }
            });
        } else if (link.to === location.pathname) {
            e.preventDefault();
            toast.error('This is the same page', {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                }
            });
        }
        if (onClick) onClick();
    };

    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link onClick={handleClick} to={link.to} className="header-button text-mygrey hover:text-myblack hover:bg-mygrey-light">
                    {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5"/>}
                    {link.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const NavButtonItem = ({ button, theme, onClick, user, isLoading }: { button: typeof NAV_BUTTON[0], theme: string, onClick?: () => void, user?: User, isLoading?: boolean }) => {
    const isTheme = button.onClick === 'switch-theme';
    const isAvatar = button.id === 'btn-avatar';
    const isDark = theme === 'dark';
    
    const handleAction = () => {
        if (button.onClick) {
            appDispatch.dispatch(button.onClick);
        }
        if (onClick && (button.onClick === 'logout' || isAvatar)) onClick();
    };

    const CurrentIcon = isTheme ? (isDark ? MoonIcon : SunIcon) : button.icon;

    let btnClasses = "text-mygrey-darker hover:text-myblack hover:bg-mygrey-light";
    if (isTheme) {
        btnClasses = isDark 
            ? "text-mygrey-darker hover:text-myblack hover:bg-mygrey-light rounded-full w-9"
            : "text-myorange-darker bg-myorange-lighter rounded-full w-9";
    }

    const buttonContent = (
        <Button
            variant="circle"
            size={isTheme || isAvatar ? "circle" : "default"}
            className={`${btnClasses} ${isAvatar ? 'p-0 overflow-hidden w-9 h-9' : ''}`}
            onClick={!isAvatar ? handleAction : undefined}
        >
            {isAvatar && isLoading ? (
                <Skeleton className="w-9 h-9 rounded-full" />
            ) : isAvatar && user?.image ? (
                <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
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
    );

    return (
        <NavigationMenuItem className="text-mygrey-darker flex items-center justify-center">
            {isAvatar ? (
                <Popover>
                    <PopoverTrigger asChild>
                        {buttonContent}
                    </PopoverTrigger>
                    <PopoverContent className="p-4 z-[105]" align="end">
                        {isLoading ? (
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-3 w-[100px]" />
                            </div>
                        ) : user ? (
                            <div className="flex flex-col space-y-2">
                                <p className="text-sm font-medium leading-none text-myblack">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-mygrey">{user.email}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-mygrey">Not logged in</p>
                        )}
                    </PopoverContent>
                </Popover>
            ) : (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    {buttonContent}
                </NavigationMenuLink>
            )}
        </NavigationMenuItem>
    );
};

const MenuContent = memo(function MenuContent({ onClick }: { onClick?: () => void }) {
    const { theme } = useTheme();
    const { data: user, isLoading } = useGetCurrentUser();

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
                        <NavButtonItem key={button.id} button={button} theme={theme} onClick={onClick} user={user} isLoading={isLoading} />
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
});

export default MenuContent;
