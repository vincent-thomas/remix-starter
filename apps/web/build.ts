import esbuild from "esbuild";

export function buildFinal() {
  esbuild.buildSync({
    entryPoints: ["./server/prod.ts"],
    outfile: "./build/server-bundle.js",
    bundle: true,
    platform: "node",
    external: [],
    minify: true,
    sourcemap: false,
  });
}
