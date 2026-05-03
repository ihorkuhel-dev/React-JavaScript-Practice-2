import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {ThemeProvider} from "@/shared/lib/ThemeContext.tsx";

const queryClient = new QueryClient({
});

export const router = createRouter({
    routeTree
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
          </QueryClientProvider>
      </ThemeProvider>
  </StrictMode>,
)
