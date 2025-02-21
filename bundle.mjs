import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/**/*.ts", "src/**/**/*.ts"],
  bundle: true,
  minify: true,
  format: "esm",
  platform: "node",
  outdir: "dist",
});
