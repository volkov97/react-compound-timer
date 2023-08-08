import fs from "fs";
import { defineConfig, Options } from "tsup";

const packageName = "react-compound-timer";

export default defineConfig((options) => {
  const commonOptions: Partial<Options> = {
    entry: {
      [packageName]: "src/index.ts",
    },
    sourcemap: true,
    clean: true,
    ...options,
  };

  return [
    // standard ESM
    {
      ...commonOptions,
      format: ["esm"],
      dts: true,
      outExtension: () => ({ js: ".mjs" }),
      onSuccess() {
        // Support Webpack 4 by pointing `"module"` to a file with a `.js` extension
        fs.copyFileSync(
          `dist/${packageName}.mjs`,
          `dist/${packageName}.legacy-esm.js`
        );

        return Promise.resolve();
      },
    },
    // browser-ready ESM, production + minified
    {
      ...commonOptions,
      entry: {
        [`${packageName}.browser`]: "src/index.ts",
      },
      format: ["esm"],
      outExtension: () => ({ js: ".mjs" }),
      minify: true,
    },
    {
      ...commonOptions,
      format: "cjs",
      dts: true,
      outDir: "./dist/cjs/",
      outExtension: () => ({ js: ".cjs" }),
    },
  ];
});
