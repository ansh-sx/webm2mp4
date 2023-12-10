import {defineConfig} from "vite";
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [VitePWA({
        injectRegister: 'auto',
        registerType: 'autoUpdate',
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
            maximumFileSizeToCacheInBytes: 32 * 1024 * 1024
        },
        manifest: {
            "name": "WebM to MP4 Converter",
            "short_name": "Video Convertor",
            "description": "Convert WebM to MP4 easily with this online converter. Fast and efficient video conversion tool.",
            "background_color": "#ffffff",
            "theme_color": "#ffffff",
            "display": "standalone",
            "orientation": 'any',
            "scope": "/",
            "start_url": "/",
            "icons": [
                {
                    "src": "icons/icon-72x72.png",
                    "sizes": "72x72",
                    "type": "image/png",
                },
                {
                    "src": "icons/icon-96x96.png",
                    "sizes": "96x96",
                    "type": "image/png",
                },
                {
                    "src": "icons/icon-128x128.png",
                    "sizes": "128x128",
                    "type": "image/png",
                },
                {
                    "src": "icons/icon-144x144.png",
                    "sizes": "144x144",
                    "type": "image/png",

                },
                {
                    "src": "icons/icon-152x152.png",
                    "sizes": "152x152",
                    "type": "image/png",

                },
                {
                    "src": "icons/icon-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",

                },
                {
                    "src": "icons/icon-384x384.png",
                    "sizes": "384x384",
                    "type": "image/png",

                },
                {
                    "src": "icons/icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "icons/icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]
        }
    })],
    optimizeDeps: {
        exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
    server: {
        hmr: {overlay: false},
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    },
})