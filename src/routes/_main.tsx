import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAccessToken } from '@/shared/lib/cookies'
import {Header} from "@/widgets/header/Header.tsx";
import { tableSearchSchema } from '@/shared/lib/useUrlState.ts';

export const Route = createFileRoute('/_main')({
    validateSearch: tableSearchSchema,
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
    return (
        <div className="min-h-screen flex flex-col bg-mygrey-light ">
            <Header/>
            <main className="flex-1 p-6 pt-24 max-w-[1900px] w-full m-auto">
                <Outlet />
            </main>
        </div>
    )
}