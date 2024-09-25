/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { buildFinal } from "./build";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      buildEnd: buildFinal,
    }),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    nodeResolve({
      moduleDirectories: ["node_modules"],
    }),
  ],

  server: {
    port: 3000,
  },

  test: {},
});
