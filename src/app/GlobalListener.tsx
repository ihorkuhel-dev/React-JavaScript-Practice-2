import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import {useEffect} from "react";
import {appDispatch} from "@/shared/lib/dispatch.ts";
import { removeTokens } from "@/shared/lib/cookies.ts";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const GlobalListener = () => {
    const {toggleTheme} = useTheme();
    const router = useRouter();

    useEffect(() => {
        const unsubscribeTheme = appDispatch.subscribe('switch-theme', () => {
            toggleTheme();
        });

        const unsubscribeLogout = appDispatch.subscribe('logout', () => {
            removeTokens();
            router.navigate({ to: '/login' });
        });

        const unsubscribeTools = appDispatch.subscribe('tools', () => {
            toast.info('Tools in development', {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                }});
        });

        return () => {
            unsubscribeTheme();
            unsubscribeLogout();
            unsubscribeTools();
        }
    }, [toggleTheme, router]);

    return null;
}