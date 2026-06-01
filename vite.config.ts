import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isSelfHosted = mode === "self-hosted";

  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "OnyxWidget",
        fileName: "onyx-widget",
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          codeSplitting: false,
        },
      },
      sourcemap: false,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    define: isSelfHosted
      ? {
          "import.meta.env.VITE_WIDGET_BACKEND_URL": JSON.stringify(
            env.VITE_WIDGET_BACKEND_URL
          ),
          "import.meta.env.VITE_WIDGET_API_KEY": JSON.stringify(
            env.VITE_WIDGET_API_KEY
          ),
        }
      : {},
  };
});
