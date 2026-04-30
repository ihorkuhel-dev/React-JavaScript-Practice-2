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

const  MenuContent = memo(function MenuContent({onClick}){
    const {theme} = useTheme()
    return (
        <>
            <div></div>
            <NavigationMenu className="justify-self-center ">
                <NavigationMenuList className="navigation-group">
                    {NAV_LINK.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavigationMenuItem key={link.id}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link onClick={() => onClick()}  to={link.to} className="header-button text-mygrey hover:text-myblack hover:bg-mygrey-light">
                                        {Icon && <Icon aria-hidden="true" color="currentColor" className="size-5"/>}
                                        {link.title}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className="justify-self-end bottom-group">
                <NavigationMenuList className="navigation-group">
                    {NAV_BUTTON.map((button) => {
                        const Icon = button.icon;
                        return(
                            <NavigationMenuItem key={button.id} className="text-mygrey-darker">
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}
                                                    onClick={() => onClick()}
                                >
                                    {button.onClick === 'switch-theme' ? (
                                        theme === 'dark' ? (
                                            <Button
                                                variant="circle"
                                                size="circle"
                                                className=" text-mygrey-darker hover:text-myblack hover:bg-mygrey-light rounded-full  w-9"
                                                onClick={() => appDispatch.dispatch('switch-theme')}
                                            >
                                                <MoonIcon aria-hidden="true" color="currentColor" className="size-5 "/>
                                            </Button>
                                        ):(
                                            <Button
                                                variant="circle"
                                                size="circle"
                                                className="text-myorange-darker bg-myorange-lighter rounded-full w-9"
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
        </>
    )
})

export default MenuContent;
