import esbuild from "esbuild";
import unimport from "unimport/unplugin";
import { unpluginConfiguration } from "./unimport-configuration";

export async function buildFinal() {
  await esbuild.build({
    entryPoints: ["./server/prod.ts"],
    outfile: "./build/server-bundle.js",
    bundle: true,
    platform: "node",
    external: [],
    minify: true,
    sourcemap: false,

    plugins: [unimport.esbuild(unpluginConfiguration)],
  });
}
