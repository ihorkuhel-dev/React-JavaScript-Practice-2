import {Outlet, createRootRoute, HeadContent} from '@tanstack/react-router'
import { Toaster } from "@/shared/ui/sonner.tsx";
import { GlobalListener } from "@/app/GlobalListener.tsx";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent/>
      <GlobalListener />
      <Outlet />
      <Toaster />
    </>
  )
}
