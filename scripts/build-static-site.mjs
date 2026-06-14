import { cp, mkdir, rm } from "node:fs/promises";

const outputDir = "dist";

const rootFiles = [
  ".nojekyll",
  "index.html",
  "resources.html",
  "script.js",
  "styles.css",
];

const dataFiles = [
  "cases.csv",
  "prompts.csv",
  "rag-config.json",
  "resources.csv",
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(`${outputDir}/data`, { recursive: true });

for (const file of rootFiles) {
  await cp(file, `${outputDir}/${file}`);
}

for (const file of dataFiles) {
  await cp(`data/${file}`, `${outputDir}/data/${file}`);
}

console.log(`Static site prepared in ${outputDir}/`);
