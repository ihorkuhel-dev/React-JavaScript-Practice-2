import {useTheme} from "@/shared/lib/ThemeContext.tsx";
import {useEffect} from "react";
import {appDispatch} from "@/shared/lib/dispatch.ts";

export const GlobalListener = () => {
    const {toggleTheme} = useTheme();

    useEffect(() => {
        const unsubscribe = appDispatch.subscribe('switch-theme', () => {
            toggleTheme();
        });

        return () => {
            unsubscribe();
        }
    }, [toggleTheme])

    return null
}