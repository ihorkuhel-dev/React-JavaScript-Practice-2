import {useEffect, useState} from "react";

export function useMediaQuery(query: string) {
    const getMatches = (query: string) => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(() => getMatches(query));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        setMatches(mediaQueryList.matches);

        const documentChangeHandler = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        mediaQueryList.addEventListener('change', documentChangeHandler);

        return () => {
            mediaQueryList.removeEventListener('change', documentChangeHandler);
        };
    }, [query]);

    return matches;
}