import { memo } from "react";
import { 
    NavigationMenuItem, 
    NavigationMenuLink, 
    navigationMenuTriggerStyle 
} from "@/shared/ui/navigation-menu.tsx";
import { Button } from "@/shared/ui/button.tsx";
import type { FC, SVGProps } from "react";

interface ActionButtonProps {
    icon: FC<SVGProps<SVGSVGElement>>;
    description: string;
    onClick: () => void;
}

export const ActionButton = memo(({ icon: Icon, description, onClick }: ActionButtonProps) => {
    return (
        <NavigationMenuItem className="text-mygrey-darker flex items-center justify-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Button
                    variant="circle"
                    className="text-mygrey-darker hover:text-myblack hover:bg-mygrey-light"
                    onClick={onClick}
                    aria-label={description}
                >
                    <Icon aria-hidden="true" color="currentColor" className="size-5" />
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
});
