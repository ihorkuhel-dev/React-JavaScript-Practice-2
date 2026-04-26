import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "@/shared/lib/dispatch.ts";

const queryClient = new QueryClient({
});

const router = createRouter({
    routeTree
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>,
)
