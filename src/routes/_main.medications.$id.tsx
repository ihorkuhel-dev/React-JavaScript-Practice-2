import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/medications/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/medications/$id"!</div>
}
