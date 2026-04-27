import {Outlet, createRootRoute, HeadContent} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent/>
      <Outlet />
    </>
  )
}
