import { memo } from "react";
import { 
    NavigationMenuItem, 
    NavigationMenuLink, 
    navigationMenuTriggerStyle 
} from "@/shared/ui/navigation-menu.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { MoonIcon } from "@/shared/assets/MoonIcon.tsx";
import { SunIcon } from "@/shared/assets/SunIcon.tsx";
import { useTheme } from "@/shared/lib/ThemeContext.tsx";

export const ThemeToggleButton = memo(() => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const btnClasses = isDark
        ? "text-mygrey-darker hover:text-myblack hover:bg-mygrey-light rounded-full w-9"
        : "text-myorange-darker bg-myorange-lighter rounded-full w-9";

    const CurrentIcon = isDark ? MoonIcon : SunIcon;

    return (
        <NavigationMenuItem className="text-mygrey-darker flex items-center justify-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button
                    variant="circle"
                    size="circle"
                    className={btnClasses}
                    onClick={toggleTheme}
                    aria-label="Change theme"
                >
                    <CurrentIcon
                        aria-hidden="true"
                        color="currentColor"
                        className={`size-5 ${!isDark ? 'text-myorange-darker' : ''}`}
                    />
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});
