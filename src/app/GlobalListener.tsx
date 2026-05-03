import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import {useEffect} from "react";
import {appDispatch} from "@/shared/lib/dispatch.ts";
import { removeTokens } from "@/shared/lib/cookies.ts";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {openGoogleCalendar} from "@/pages/medication-details/lib/calendar.ts";

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

        const unsubscribeCalendar = appDispatch.subscribe('add-to-calendar', (detail) => {
            if (detail) {
                openGoogleCalendar(detail.title, detail.description, detail.location, detail.startDate, detail.endDate);
            }
        });

        return () => {
            unsubscribeTheme();
            unsubscribeLogout();
            unsubscribeTools();
            unsubscribeCalendar();
        }
    }, [toggleTheme, router]);

    return null;
}