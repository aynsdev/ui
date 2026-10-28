import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "node:url"

const at = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// Docs site. Components are imported exactly as a consuming project would after `shadcn add`.
export default defineConfig({
  root: "docs",
  base: "./",
  publicDir: "public",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/components/ui": at("./registry/ui"),
      "@/lib": at("./registry/lib"),
      "@/hooks": at("./registry/hooks"),
      "@/docs": at("./docs"),
    },
  },
  server: { port: 4321, fs: { allow: [".."] } },
  build: { outDir: "../docs-dist", emptyOutDir: true },
})
