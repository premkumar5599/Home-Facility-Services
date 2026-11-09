import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const root = resolve("out");
const label = process.argv[2] || "production";
if (!/^[a-z0-9-]+$/.test(label)) throw new Error("Use a simple report label");
const auditPath = process.argv[3] || "/";
if (!/^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(auditPath))
  throw new Error("Use a local page path such as /services/");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};
const server = createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const file = resolve(
      root,
      `.${path.endsWith("/") ? path + "index.html" : path}`,
    );
    if (!file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    let body = await readFile(file);
    response.setHeader(
      "Content-Type",
      mime[extname(file)] || "application/octet-stream",
    );
    response.setHeader(
      "Cache-Control",
      path.startsWith("/_next/static/") || path.startsWith("/assets/optimized/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate",
    );
    if (
      /\bgzip\b/.test(request.headers["accept-encoding"] || "") &&
      /\.(html|js|css|json|txt|xml|svg)$/.test(file)
    ) {
      body = gzipSync(body);
      response.setHeader("Content-Encoding", "gzip");
      response.setHeader("Vary", "Accept-Encoding");
    }
    response.end(body);
  } catch {
    response
      .writeHead(404, { "Content-Type": "text/html" })
      .end(await readFile(resolve(root, "404.html")));
  }
});
let chrome;
try {
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  chrome = await launch({
    chromeFlags: ["--headless=new", "--disable-extensions"],
    chromePath:
      process.env.CHROME_PATH ||
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const url = `http://127.0.0.1:${server.address().port}${auditPath}`;
  const result = await lighthouse(url, {
    port: chrome.port,
    output: ["html", "json"],
    logLevel: "error",
    onlyCategories: [
      "performance",
      "accessibility",
      "best-practices",
      "seo",
      "agentic-browsing",
    ],
  });
  await mkdir("Lighthouse", { recursive: true });
  await writeFile(`Lighthouse/${label}.html`, result.report[0]);
  await writeFile(`Lighthouse/${label}.json`, result.report[1]);
  console.log(
    JSON.stringify(
      {
        categories: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [
            k,
            Math.round(v.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((k) => [k, result.lhr.audits[k].displayValue]),
        ),
      },
      null,
      2,
    ),
  );
} finally {
  if (chrome) await chrome.kill();
  await new Promise((done) => server.close(done));
}
