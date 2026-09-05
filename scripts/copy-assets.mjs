import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist/styles", { recursive: true });

copyFileSync(
  "src/styles/spinner.css",
  "dist/styles/spinner.css",
);
