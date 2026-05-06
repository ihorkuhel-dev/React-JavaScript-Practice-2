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
import { removeTokens } from "@/shared/lib/cookies.ts";
import { router } from "@/app/main.tsx";
import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import { MoonIcon } from "@/shared/assets/MoonIcon.tsx";
import { SunIcon } from "@/shared/assets/SunIcon.tsx";
import {memo, useCallback} from "react";
import { useGetCurrentUser, type User } from "@/features/auth/api/authApi.ts";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";

const NavLinkItem = memo(({ link, onClick }: { link: typeof NAV_LINK[0], onClick?: () => void }) => {
    const Icon = link.icon;
    const location = useLocation();

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (link.to === '#') {
            e.preventDefault();
            toast.warning('This page in development' , {
                action: {
                    label: "Undo",
                    onClick: () => {},
                }
            });
        } else if (link.to === location.pathname) {
            e.preventDefault();
            toast.error('This is the same page', {
                action: {
                    label: "Undo",
                    onClick: () => {},
                }
            });
        }
        if (onClick) onClick();
    }, [link.to, location.pathname, onClick]);

    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link onClick={handleClick} to={link.to} className="header-button">
                    {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5"/>}
                    {link.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});

const NavButtonItem = memo(({ button, theme, toggleTheme, onClick, user, isLoading, isMobile }: { button: typeof NAV_BUTTON[0], theme: string, toggleTheme: () => void, onClick?: () => void, user?: User, isLoading?: boolean, isMobile:boolean }) => {
    const isTheme = button.onClick === 'switch-theme';
    const isAvatar = button.id === 'btn-avatar';
    const isDark = theme === 'dark';
    
    const handleAction = useCallback(() => {
        if (button.onClick === 'switch-theme') {
            toggleTheme();
        } else if (button.onClick === 'logout') {
            removeTokens();
            void router.navigate({ to: '/login' });
        } else if (button.onClick === 'tools') {
            toast.info('Tools in development', {
                action: {
                    label: "Undo",
                    onClick: () => {},
                }
            });
        }
        if (onClick && (button.onClick === 'logout' || isAvatar)) onClick();
    }, [button.onClick, toggleTheme, onClick, isAvatar]);

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
            aria-label={button.description}
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
        <NavigationMenuItem className="text-mygrey-darker flex">
            {isAvatar ? (
                <Popover >
                    <PopoverTrigger asChild>
                        {buttonContent}
                    </PopoverTrigger>
                    <PopoverContent className="p-4 z-105 bg-mywhite" align="end" side={isMobile ? 'top' : 'bottom'}>
                        {isLoading ? (
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="h-4 w-37.5" />
                                <Skeleton className="h-3 w-25" />
                            </div>
                        ) : user ? (
                            <div className="flex flex-col space-y-2">
                                <p className="leading-none text-myblack">{user.firstName} {user.lastName}</p>
                                <p>{user.email}</p>
                            </div>
                        ) : (
                            <p>Not logged in</p>
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
});

const MenuContent = memo(function MenuContent({ onClick, isMobile }: { onClick?: () => void, isMobile:boolean }) {
    const { theme, toggleTheme } = useTheme();
    const { data: user, isLoading } = useGetCurrentUser();

    return (
        <>
            <div aria-hidden="true"></div>

            <NavigationMenu className="">
                <NavigationMenuList className="navigation-group">
                    {NAV_LINK.map(link => (
                        <NavLinkItem key={link.id} link={link} onClick={onClick} />
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="justify-self-end bottom-group">
                <NavigationMenuList className=" button-group" >
                    {NAV_BUTTON.map(button => (
                        <NavButtonItem key={button.id} button={button} theme={theme} toggleTheme={toggleTheme} onClick={onClick} user={user} isLoading={isLoading}  isMobile={isMobile}/>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
});

export default MenuContent;
