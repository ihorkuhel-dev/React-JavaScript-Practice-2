import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {ThemeProvider} from "@/shared/lib/ThemeContext.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: false,
        }
    }
});

export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
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
