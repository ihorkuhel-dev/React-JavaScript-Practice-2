import { useEffect } from "react";

interface UseMenuControlsProps {
    active: boolean;
    closeMenu: () => void;
    menuRef: React.RefObject<HTMLDivElement | null>;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const useMenuControls = ({ active, closeMenu, menuRef, buttonRef }: UseMenuControlsProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && active) {
                closeMenu();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (
                active && 
                menuRef.current && 
                !menuRef.current.contains(e.target as Node) && 
                buttonRef.current && 
                !buttonRef.current.contains(e.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [active, closeMenu, menuRef, buttonRef]);
};
