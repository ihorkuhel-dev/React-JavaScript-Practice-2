import MenuContent from "@/widgets/header/menu-content/MenuContent.tsx";
import './Menu.scss'
import {Button} from "@/shared/ui/button.tsx";
import {useCallback, useState} from "react";

export default function Menu({isMobile}){

    const [active, setActive] = useState<boolean>(false)

    const handleClick= useCallback(() => {
        setActive(prev => !prev)
    }, [])

    return(
        <header className={`fixed w-full p-3 bg-mywhite border-mygrey-lighter border-b  z-100 ${active ? 'active' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>

            {isMobile &&
            <Button className="absolute top-5 right-5 z-51 navigation-button"
            onClick={() => handleClick()}
            >
                <span className="bg-white rounded-sm"/>
                <span className="bg-white rounded-sm"/>
                <span className="bg-white rounded-sm"/>
            </Button>
            }
            <div className={`${isMobile ? 'mobile-menu border-l border-mygrey-lighter' : 'desktop-menu'} bg-mywhite`}>
                <MenuContent onClick={handleClick}/>
            </div>
        </header>
    )
}