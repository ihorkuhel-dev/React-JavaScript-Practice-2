import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createRouter({
    routeTree
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={new QueryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>,
)
