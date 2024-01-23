import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "https://www.tfdjqp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        ws: true,
      },
    },
  },
});
