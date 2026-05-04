import {Outlet, createRootRoute, HeadContent} from '@tanstack/react-router'
import { Toaster } from "@/shared/ui/sonner.tsx";


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent/>
      <Outlet />
      <Toaster />
    </>
  )
}
