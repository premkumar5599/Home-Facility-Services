import { spawnSync } from "node:child_process";

// An explicit public build; ordinary build/dev keep preview indexing defaults.
const env = {
  ...process.env,
  SITE_URL: process.env.SITE_URL || "https://homefacilityservices.in",
  SITE_INDEXABLE: "true",
};
for (const args of [
  ["scripts/prepare-images.mjs"],
  ["node_modules/next/dist/bin/next", "build", "--webpack"],
  ["scripts/check-seo.mjs"],
]) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status || 1);
}
