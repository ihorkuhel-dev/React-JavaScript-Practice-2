import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter  } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => ({
    plugins: [
        tailwindcss(),
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: './src/routes',
            generatedRouteTree: './src/app/routeTree.gen.ts',
        }),
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'vendor-react';
                        if (id.includes('@tanstack')) return 'vendor-tanstack';
                        if (id.includes('chart.js')) return 'vendor-charts';
                        return 'vendor';
                    }
                }
            }
        }
    },
    esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
    }
}));