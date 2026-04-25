import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAccessToken } from '@/shared/lib/cookies'

export const Route = createFileRoute('/_auth')({
    beforeLoad: () => {
        const token = getAccessToken()
        console.log(token)

        if (token) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-secondary-background">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </div>
    )
}