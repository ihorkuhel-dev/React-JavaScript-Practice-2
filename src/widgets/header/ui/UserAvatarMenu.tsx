import { memo } from "react";
import { NavigationMenuItem } from "@/shared/ui/navigation-menu.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx";
import { Skeleton } from "@/shared/ui/skeleton.tsx";
import { SunIcon } from "@/shared/assets/SunIcon.tsx";
import { useGetCurrentUser } from "@/features/auth/api/authApi.ts";

export const UserAvatarMenu = memo(({ isMobile }: { isMobile: boolean }) => {
    const { data: user, isLoading } = useGetCurrentUser();

    return (
        <NavigationMenuItem className="text-mygrey-darker flex items-center justify-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="circle"
                        size="circle"
                        className="text-mygrey-darker hover:text-myblack hover:bg-mygrey-light p-0 overflow-hidden w-9 h-9"
                        aria-label="User menu"
                    >
                        {isLoading ? (
                            <Skeleton className="w-9 h-9 rounded-full" />
                        ) : user?.image ? (
                            <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <SunIcon
                                aria-hidden="true"
                                color="currentColor"
                                className="size-5"
                            />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 z-[105]" align="end" side={isMobile ? 'top' : 'bottom'}>
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
        </NavigationMenuItem>
    );
});
