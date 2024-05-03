import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// import devtools from "solid-devtools/vite";

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ["quill"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    target: "esnext",
  },
});
