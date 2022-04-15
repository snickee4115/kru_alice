import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      mode: "development",
      base: "/",
      includeAssets: ["/favicon.png"],
      manifest: {
        name: "Kru Alice",
        short_name: "Kru Alice",
        theme_color: "#ffffff",
        start_url: "/admin",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-384x384.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    })
  ],
  server: {
    host: true,
},
})

