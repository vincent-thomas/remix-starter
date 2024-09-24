import esbuild from "esbuild";

export function buildFinal() {
  esbuild.buildSync({
    entryPoints: ["./server/prod.js"],
    outfile: "./build/server-bundle.js",
    bundle: true,
    platform: "node",
    external: [],
    minify: false,
    sourcemap: false,
  });
}
