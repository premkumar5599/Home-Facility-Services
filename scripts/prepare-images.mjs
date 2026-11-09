import sharp from "sharp";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { format } from "prettier";

async function sources(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? sources(join(directory, entry.name))
        : /\.(ts|tsx)$/.test(entry.name)
          ? [join(directory, entry.name)]
          : [],
    ),
  );
  return files.flat();
}
const assets = new Set();
for (const file of await sources("src")) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(
    /["'](\/assets\/[^"'`]+\.(?:png|jpe?g|webp))["']/g,
  ))
    assets.add(match[1]);
  if (file.endsWith("data.ts"))
    for (const match of source.matchAll(
      /image:\s*["']([^"']+\.(?:png|jpe?g|webp))["']/g,
    ))
      assets.add(match[1].startsWith("/") ? match[1] : `/assets/${match[1]}`);
}
await mkdir("public/assets/optimized", { recursive: true });
const manifest = {};
let originalBytes = 0;
let largestVariantBytes = 0;
for (const src of [...assets].sort()) {
  const bytes = await readFile(resolve("public", `.${src}`));
  const metadata = await sharp(bytes).metadata();
  const widths = [
    ...new Set(
      [48, 64, 96, 160, 320, 480, 640, 960, 1280]
        .filter((width) => width < metadata.width)
        .concat(Math.min(metadata.width, 1280)),
    ),
  ];
  const quality = src.endsWith("/water-wash.jpg") ? 60 : 75;
  const hash = createHash("sha256")
    .update(bytes)
    .update(`webp-q${quality}-v1`)
    .digest("hex")
    .slice(0, 16);
  for (const width of widths) {
    const output = await sharp(bytes)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toBuffer();
    await writeFile(`public/assets/optimized/${hash}-${width}.webp`, output);
    if (width === widths.at(-1)) largestVariantBytes += output.length;
  }
  originalBytes += bytes.length;
  manifest[src] = {
    width: metadata.width,
    height: metadata.height,
    widths,
    hash,
  };
}
await writeFile(
  "src/lib/image-manifest.json",
  await format(JSON.stringify(manifest), { parser: "json" }),
);
console.log(
  `Prepared ${assets.size} responsive images. Originals: ${Math.round(originalBytes / 1024)} KiB; largest WebP variants: ${Math.round(largestVariantBytes / 1024)} KiB.`,
);
