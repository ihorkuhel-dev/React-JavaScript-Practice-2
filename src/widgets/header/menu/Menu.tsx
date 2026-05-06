import MenuContent from "@/widgets/header/menu-content/MenuContent.tsx";
import './Menu.scss'
import {Button} from "@/shared/ui/button.tsx";
import {useCallback, useState, useRef} from "react";
import {useMenuControls} from "@/widgets/header/lib/useMenuControls.ts";

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

    useMenuControls({ active, closeMenu, menuRef, buttonRef });

    return(
        <header className={`fixed w-full p-3 bg-mywhite border-mygrey-lighter border-b  z-100 ${active ? 'active' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>

            {isMobile &&
                <Button
                    ref={buttonRef}
                    className="absolute top-5 right-5 z-51 navigation-button"
                    onClick={handleClick}
                    name="menu-button"
                    aria-label="Toggle menu"
                >
                    <span className="bg-white rounded-sm"/>
                    <span className="bg-white rounded-sm"/>
                    <span className="bg-white rounded-sm"/>
                </Button>
            }
            <div
                key={isMobile ? 'mobile' : 'desktop'}
                ref={menuRef}
                className={`${isMobile ? 'mobile-menu border-l border-mygrey-lighter' : 'desktop-menu'} bg-mywhite`}
            >
                <MenuContent onClick={isMobile ? closeMenu : undefined} isMobile={isMobile} />
            </div>
        </header>
    )
}