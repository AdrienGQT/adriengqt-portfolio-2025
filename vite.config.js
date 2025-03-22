import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "/index.html",
        privacyPolicy: "/src/html/project.html",
        // Add more pages here
      },
    },
  },
});
