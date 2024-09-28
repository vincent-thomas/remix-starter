import { resolve } from "node:path";
import { cwd } from "node:process";

export const unpluginConfiguration = {
  dts: resolve(cwd(), "unimport.d.ts"),
  dirs: [
    "./app/.server/composables/*.ts",
    "./app/.server/composables/*/index.ts",
    "./app/.client/composables",
  ],
};
