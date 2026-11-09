import { submitEnquiry } from "../server/enquiry.mjs";
import { createEnquiryEncryption } from "../server/encryption.mjs";
import { test, expect } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

// Serve the actual export locally. Production-host status/routing is a separate check.
let server: Server;
let origin: string;
const root = resolve("out");
const mime: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

test.beforeAll(async () => {
  const encryption = await createEnquiryEncryption({ testMode: true });
  server = createServer(async (request, response) => {
    try {
      const path = new URL(request.url!, "http://localhost").pathname.replace(
        /\/+$/,
        "",
      );
      if (path === "/api/enquiry/key" && request.method === "GET") {
        response
          .writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          })
          .end(JSON.stringify(encryption.descriptor));
        return;
      }
      if (path === "/api/enquiry" && request.method === "POST") {
        const chunks = [];
        for await (const chunk of request) chunks.push(chunk);
        const result = await submitEnquiry(
          await encryption.decrypt(
            JSON.parse(Buffer.concat(chunks).toString()),
          ),
          { testMode: true },
        );
        response
          .writeHead(result.status, { "Content-Type": "application/json" })
          .end(JSON.stringify(result.body));
        return;
      }
      const pathname = decodeURIComponent(
        new URL(request.url!, "http://localhost").pathname,
      );
      const file = resolve(
        root,
        `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`,
      );
      if (!file.startsWith(root + sep)) {
        response.writeHead(403).end();
        return;
      }
      const body = await readFile(file);
      response
        .writeHead(200, {
          "Content-Type": mime[extname(file)] || "application/octet-stream",
        })
        .end(body);
    } catch {
      response
        .writeHead(404, { "Content-Type": "text/html" })
        .end(await readFile(resolve(root, "404.html")));
    }
  });
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Preview server unavailable");
  origin = `http://127.0.0.1:${address.port}`;
});

test.afterAll(async () => {
  await new Promise<void>((done, reject) =>
    server.close((error) => (error ? reject(error) : done())),
  );
});

test("mobile visitors without JavaScript can navigate and cannot submit form fields", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${origin}/contact/`);
  await page.getByRole("button", { name: "Navigation menu" }).click();
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(
    nav.getByRole("link", { name: "Services", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send enquiry" }),
  ).toBeDisabled();
  await expect(page.getByRole("textbox", { name: "Your name" })).toBeDisabled();
  await expect(
    page.getByText("This enquiry tool needs JavaScript."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "email HFS", exact: true }),
  ).toHaveAttribute("href", /^mailto:/);
  await nav.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(`${origin}/services/`);
  await context.close();
});

test("mobile menu opens, closes with Escape, and opens again", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  const toggle = page.getByRole("button", { name: "Navigation menu" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("details.mobile-navigation")).toHaveAttribute(
    "open",
    "",
  );
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("details.mobile-navigation")).not.toHaveAttribute(
    "open",
  );
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(`${origin}/services/`);
});

test("service enquiry link preselects the correct service", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().startsWith(origin))
      failures.push(response.url());
  });
  await page.goto(`${origin}/services/plumbing/`);
  await page
    .getByRole("link", { name: "Discuss plumbing", exact: true })
    .click();
  await expect(
    page.getByRole("combobox", { name: "Service required" }),
  ).toHaveValue("plumbing");
  await expect(page.getByRole("textbox", { name: "Your name" })).toBeEnabled();
  await expect(
    page.getByRole("link", { name: "Read how your enquiry is handled." }),
  ).toHaveAttribute("href", "/privacy/");
  expect(failures).toEqual([]);
});

test("mobile header keeps the same height before and after hydration", async ({
  browser,
}) => {
  const withoutScripts = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 412, height: 823 },
  });
  const withScripts = await browser.newContext({
    viewport: { width: 412, height: 823 },
  });
  try {
    const staticPage = await withoutScripts.newPage();
    const hydratedPage = await withScripts.newPage();
    await staticPage.goto(origin);
    await hydratedPage.goto(origin);
    const before = await staticPage.locator(".site-header").boundingBox();
    const after = await hydratedPage.locator(".site-header").boundingBox();
    expect(Math.abs(before!.height - after!.height)).toBeLessThan(1);
  } finally {
    await withoutScripts.close();
    await withScripts.close();
  }
});

test("direct submission reaches the test endpoint and clearly reports that no email was sent", async ({
  page,
}) => {
  await page.goto(`${origin}/contact/?service=plumbing`);
  await expect(
    page.getByRole("combobox", { name: "Service required" }),
  ).toHaveValue("plumbing");
  await expect(page.getByRole("combobox")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Copy enquiry" })).toHaveCount(
    0,
  );
  await page.getByRole("textbox", { name: "Your name" }).fill("Test Manager");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("test@example.com");
  await page
    .getByRole("textbox", { name: "Your requirements" })
    .fill("Office plumbing support");
  const request = page.waitForRequest(
    (request) =>
      /\/api\/enquiry\/?$/.test(request.url()) && request.method() === "POST",
  );
  await page.getByRole("button", { name: "Send enquiry" }).click();
  const envelope = (await request).postDataJSON();
  expect(Object.keys(envelope).sort()).toEqual([
    "ciphertext",
    "iv",
    "keyId",
    "version",
    "wrappedKey",
  ]);
  expect(envelope.version).toBe(1);
  expect(JSON.stringify(envelope)).not.toContain("Test Manager");
  expect(JSON.stringify(envelope)).not.toContain("test@example.com");
  expect(JSON.stringify(envelope)).not.toContain("Office plumbing support");
  await expect(page.getByRole("status")).toHaveText(
    "Test enquiry received successfully. No email was sent.",
  );
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue(
    "",
  );
});

test("submission failure keeps the details and allows retry", async ({
  page,
}) => {
  await page.route(/\/api\/enquiry\/?$/, (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ ok: false }),
    }),
  );
  await page.goto(`${origin}/contact/?service=housekeeping`);
  await page.getByRole("textbox", { name: "Your name" }).fill("Test Manager");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("test@example.com");
  await page
    .getByRole("textbox", { name: "Your requirements" })
    .fill("Office housekeeping");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("#enquiry").getByRole("alert")).toContainText(
    "We could not submit your enquiry",
  );
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue(
    "Test Manager",
  );
  await expect(
    page.getByRole("button", { name: "Send enquiry" }),
  ).toBeEnabled();
});

test("unavailable encryption key prevents any plaintext submission", async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST" && /\/api\/enquiry\/?$/.test(request.url()))
      submissions.push(request.postData() || "");
  });
  await page.route(/\/api\/enquiry\/key\/?$/, (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
  );
  await page.goto(`${origin}/contact/?service=plumbing`);
  await page.getByRole("textbox", { name: "Your name" }).fill("Test Manager");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("test@example.com");
  await page
    .getByRole("textbox", { name: "Your requirements" })
    .fill("Office plumbing support");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("#enquiry").getByRole("alert")).toContainText(
    "We could not submit your enquiry",
  );
  expect(submissions).toEqual([]);
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue(
    "Test Manager",
  );
});

test("service comparison, briefing download, and FAQs provide usable information", async ({
  page,
}) => {
  await page.goto(`${origin}/services/`);
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(7);
  await page.goto(`${origin}/facility-planning/`);
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", {
      name: "Download a blank facility service brief (.txt)",
    })
    .click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "facility-service-brief.txt",
  );
  await page.goto(`${origin}/contact/`);
  await page
    .getByText("Does submitting the enquiry form confirm a booking?", {
      exact: true,
    })
    .click();
  await expect(
    page.getByText(/Submitting an enquiry does not confirm a booking/),
  ).toBeVisible();
});

test("404 offers direct recovery and logos have an operable pause control", async ({
  page,
}) => {
  const response = await page.goto(`${origin}/missing-service/`);
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("main").getByRole("link", { name: "Explore services" }),
  ).toHaveAttribute("href", "/services/");
  await expect(
    page.getByRole("main").getByRole("link", { name: "Contact HFS" }),
  ).toHaveAttribute("href", "/contact/");
  await page.goto(origin);
  await page.getByRole("button", { name: "Pause client logos" }).click();
  await expect(page.locator("#client-logo-track")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
});

test("home, contact and services fit mobile and desktop without page overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/contact/", "/services/"]) {
      await page.goto(`${origin}${route}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      if (route === "/") {
        await expect(page.locator(".home-photo-card")).toHaveCount(6);
        for (const image of await page.locator(".home-photo-card img").all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (element: HTMLImageElement) =>
                  element.complete && element.naturalWidth > 0,
              ),
            )
            .toBe(true);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      await page.screenshot({
        path: test
          .info()
          .outputPath(`${route.replaceAll("/", "")}-${width}.png`),
        fullPage: true,
      });
    }
  }
  expect(errors).toEqual([]);
});
