import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return(
      <div className="flex min-h-screen items-center justify-center bg-muted/50">
          <div className="w-full max-w-md p-8 bg-background shadow border rounded-lg">
              <Outlet />
          </div>
      </div>
  )

}
