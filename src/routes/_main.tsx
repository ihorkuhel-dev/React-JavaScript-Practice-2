import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAccessToken } from '@/shared/lib/cookies'
import { SearchSchema } from '@/shared/lib/useUrlState.ts';
import Menu from "@/widgets/header/menu/Menu.tsx";
import {useMediaQuery} from "@/shared/lib/useMediaQuery.tsx";
import PopoverChat from "@/widgets/chat/PopoverChat.tsx";
export const Route = createFileRoute('/_main')({
    validateSearch: SearchSchema,
    beforeLoad: () => {
        const token = getAccessToken()
        if (!token) {
            throw redirect({
                to: '/login',
            })
        }
    },
    component: MainLayout,
})

function MainLayout() {
    const isMobile = useMediaQuery('(max-width: 900px)');

    return (
        <div className="min-h-screen flex flex-col bg-mygrey-light overflow-x-hidden">
            <Menu isMobile={isMobile}/>
            <PopoverChat/>
            <main className={`flex flex-col flex-1 p-6 max-w-[1900px] w-full m-auto ${isMobile ? ' ' : 'pt-24'}`}>
                <Outlet />
            </main>
        </div>
    )
}