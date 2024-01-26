import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['**/*'],
            manifest: {
                name: 'To Do List',
                short_name: 'To Do',
                description: 'A simple to do list app',
                start_url: '/',
                scope: '.',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff',
                orientation: 'portrait',
                lang: 'en-US',
                icons: [
                    {
                        src: 'vite.svg',
                        sizes: 'any',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
})
