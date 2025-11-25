import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { visualizer as viteVisualizerPlugin } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import viteCompressPlugin from "vite-plugin-compression";
import { createHtmlPlugin as viteHtmlPlugin } from "vite-plugin-html";
import removeConsole from "vite-plugin-remove-console";
import { viteArchiverPlugin } from "./src/vite-plugins/archiver";

const vendorcoreReg = /[\\/]node_modules[\\/](react|react-dom)(?:[\\/]|$)/;
const vendorutilsReg =
  /[\\/]node_modules[\\/](zustand|@iconify[\\/]react)(?:[\\/]|$)/;

const initViteCompressPlugin = (compressTypes: string[]) => {
  const compressPlugins: PluginOption[] = [];
  if (compressTypes?.includes("brotli")) {
    compressPlugins.push(
      viteCompressPlugin({ deleteOriginFile: false, ext: ".br" })
    );
  }
  if (compressTypes?.includes("gzip")) {
    compressPlugins.push(
      viteCompressPlugin({ deleteOriginFile: false, ext: ".gz" })
    );
  }
  return compressPlugins;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const alias = {
    "@": path.resolve(__dirname, "src"),
    "#": path.resolve(__dirname, "src/types"),
  };

  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_APP_PUBLIC_PATH || "/";
  const isProduction = mode === "production";
  const visualizer = isProduction && env.VITE_APP_VISUALIZER === "true";
  const html = isProduction && env.VITE_APP_HTML_PLUGIN === "true";
  const compressTypes = env.VITE_APP_COMPRESS_PLUGIN?.split(",") || [];
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      vanillaExtractPlugin({
        identifiers: ({ debugId }) => `${debugId}`,
      }),
      tailwindcss(),
      removeConsole(),
      visualizer &&
        viteVisualizerPlugin({
          filename: "./node_modules/.cache/visualizer/stats.html",
          gzipSize: true,
          open: true,
          brotliSize: true,
          template: "treemap",
        }),
      html &&
        viteHtmlPlugin({
          minify: true,
        }),
      ...initViteCompressPlugin(compressTypes),
      viteArchiverPlugin(),
    ],
    base,
    resolve: {
      alias,
    },
    server: {
      open: true,
      host: true,
      port: 9527,
    },
    build: {
      target: "esnext",
      minify: "oxc",
      sourcemap: !isProduction,
      cssMinify: "esbuild",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          advancedChunks: {
            groups: [
              {
                name: "vendor-core",
                test: vendorcoreReg,
              },
              {
                name: "vendor-utils",
                test: vendorutilsReg,
              },
            ],
          },
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@iconify/react"],
    },
  };
});
