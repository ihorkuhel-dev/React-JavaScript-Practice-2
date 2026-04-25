import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter  } from '@tanstack/router-plugin/vite'

export default defineConfig({
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
})