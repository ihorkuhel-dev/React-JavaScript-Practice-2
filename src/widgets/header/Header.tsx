import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu"
import {Link} from "@tanstack/react-router";
import {NAV_BUTTON, NAV_LINK} from "@/shared/config/header.ts";
import {Button} from "@/shared/ui/button.tsx";
import "./Header.scss"
import { appDispatch } from '@/shared/lib/dispatch'
import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import { MoonIcon } from "@/shared/assets/MoonIcon";
import { SunIcon } from "@/shared/assets/SunIcon";

export function Header() {

    const {theme} = useTheme()

    return (
        <header  className="fixed w-full p-3 bg-mywhite border-mygrey-lighter border-b grid grid-cols-3 items-center z-50">
            <div></div>

            <NavigationMenu className="justify-self-center">
                <NavigationMenuList>
                    {NAV_LINK.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavigationMenuItem key={link.id}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={link.to} className="header-button text-mygrey hover:text-myblack hover:bg-mygrey-light">
                                        {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5"/>}
                                        {link.title}</Link>
                                    </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="justify-self-end ">
                <NavigationMenuList>
                    {NAV_BUTTON.map((button) => {
                        const Icon = button.icon;
                        return(
                            <NavigationMenuItem key={button.id} className="text-mygrey-darker">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        {button.onClick === 'switch-theme' ? (
                                            theme === 'dark' ? (
                                                <Button
                                                    variant="circle"
                                                    className=" text-mygrey-darker hover:text-myblack hover:bg-mygrey-light"
                                                    onClick={() => appDispatch.dispatch('switch-theme')}
                                                >
                                                <MoonIcon aria-hidden="true" color="currentColor" className="size-5 "/>
                                                </Button>
                                            ):(
                                                <Button
                                                    variant="circle"
                                                    className="text-myorange-darker bg-myorange-lighter"
                                                    onClick={() => appDispatch.dispatch('switch-theme')}
                                                >
                                                <SunIcon aria-hidden="true" color="currentColor" className="size-5 text-myorange-darker "/>
                                                </Button>
                                                    )
                                        ) : (
                                            <Button
                                                variant="circle"
                                                className=" text-mygrey-darker hover:text-myblack hover:bg-mygrey-light"
                                                onClick={() => appDispatch.dispatch(button.onClick as 'logout' | 'switch-theme')}
                                            >
                                                {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5"/>}
                                            </Button>
                                            )
                                        }
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </header>

    )
}
