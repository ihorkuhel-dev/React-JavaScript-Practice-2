import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAccessToken } from '@/shared/lib/cookies'

export const Route = createFileRoute('/_main')({
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
        <div className="min-h-screen flex flex-col bg-secondary-background">
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}