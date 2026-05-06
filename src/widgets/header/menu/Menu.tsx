import MenuContent from "@/widgets/header/menu-content/MenuContent.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {useCallback, useState, useEffect, useRef} from "react";

export default function Menu({isMobile}: { isMobile: boolean }) {

    const [active, setActive] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(() => {
        setActive(prev => !prev)
    }, [])

    const closeMenu = useCallback(() => {
        setActive(false)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && active) {
                closeMenu();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (active && menuRef.current && !menuRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [active, closeMenu]);

    return(
        <header className={`menu-header  ${active ? 'active' : ''} ${isMobile ? 'mobile p-0 h-0' : 'desktop'}`}>

            {isMobile &&
                <Button
                    ref={buttonRef}
                    className=" navigation-button"
                    onClick={handleClick}
                    name="menu-button"
                    aria-label="Toggle menu"
                >
                    <span className="menu-span"/>
                    <span className="menu-span"/>
                    <span className="menu-span"/>
                </Button>
            }
            <div
                key={isMobile ? 'mobile' : 'desktop'}
                ref={menuRef}
                className={`${isMobile ? 'mobile-menu ' : 'desktop-menu'} bg-mywhite`}
            >
                <MenuContent onClick={isMobile ? closeMenu : undefined} isMobile={isMobile} />
            </div>
        </header>
    )
}