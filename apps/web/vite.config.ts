/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { buildFinal } from "./build";
import Unimport from "unimport/unplugin";
import { unpluginConfiguration } from "./unimport-configuration";

import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_singleFetch: true,
      },
      buildEnd: buildFinal,
      ignoredRouteFiles: ["**/*"],
      routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
    }),
    tsconfigPaths(),
    vanillaExtractPlugin(),

    Unimport.vite(unpluginConfiguration),
  ],

  server: {
    port: 3000,
  },

  test: {},
});
