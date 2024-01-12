import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts", // Replace with your actual file path
      name: "Peerfy", // Replace with your actual package name
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Add other external dependencies if needed
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
