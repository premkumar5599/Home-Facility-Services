# Home Facility Services — Next.js website

A multi-page business website built with Next.js App Router, React, TypeScript and Lucide icons. It uses a static export for the existing Sites host.

## Development

Requires Node.js 20.9+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Edit `src/app` and `src/components`; do not edit generated HTML.

## Pages

- `/` — Home
- `/services/` — Service overview
- `/services/[slug]/` — Six individually generated service detail pages
- `/about/` — Company and values
- `/clients/` — Client portfolio with industry filters
- `/contact/` — Enquiry form, with service preselection from service pages
- `/privacy/` — Enquiry privacy notice
- Custom 404 page

## Project structure

- `src/app/` — Routes, shared layout, page metadata and responsive styles
- `src/components/` — Header, footer, reusable UI, portfolio and enquiry form
- `src/lib/data.ts` — Shared company, service and client content
- `public/assets/` — Assets extracted from supplied client documents
- `next.config.ts` — Static export configuration
- Hosting identity/configuration is not present in this checkout; configure the chosen host separately to publish `out/`.

## Validation and production

```sh
npm run typecheck
npm run build
python3 -m http.server 8080 --directory out
```

The build creates `out/`; serve it with a static host. `npm run dev` runs the development server. The original static prototype remains in `dist/` for reference; it is not the active application or deployment output.

For the confirmed public domain, run `npm run build:production`. This explicitly builds indexable pages for `https://homefacilityservices.in` (or the supplied `SITE_URL`) and checks SEO using the same environment. It does not publish anything. Ordinary development/build commands retain the preview indexing defaults unless you explicitly configure otherwise.

For Lighthouse, run `npm run audit:production -- production-improved` **after** building. It serves `out/` with compression/cache headers in a temporary local server, runs an extension-free mobile Chrome audit, saves HTML/JSON reports under `Lighthouse/`, and closes its server/browser. Google Chrome is required; `CHROME_PATH` can override its Windows executable path. Run it without other browser tests for less CPU interference. These local server settings must also be configured on the eventual host; they do not prove live hosting performance.

Images used by the site are prepared as responsive, content-hashed WebP variants by `scripts/prepare-images.mjs` before development/build. The custom Next image loader uses those files without a runtime image service. Commit the image manifest and prepared assets with the source. The Latin Inter WOFF2 file is hosted locally and preloaded; the original font license remains in `public/fonts/OFL.txt`.

The contact form now submits directly to a separate email endpoint. Copy, email-app and WhatsApp delivery choices have been removed from the form. Use `npm run dev:enquiries:test` with `npm run dev` to test local submissions without sending mail. Real email delivery requires server-side configuration; see [enquiry setup](docs/ENQUIRY-SETUP.md). Company claims and client portfolio permissions still require owner review before launch.

## Content and SEO

See `docs/SEO-CONTENT-NOTES.md` for the search-rater guide mapping, factual source boundaries and launch checklist. `src/lib/seo.ts` owns canonical URLs and structured business data; `src/lib/service-content.ts` owns service-specific planning content and FAQs.

Private previews default to `noindex, nofollow`, disallow crawling and emit a sitemap containing all 13 pages. Configure `SITE_URL` and `SITE_INDEXABLE=true` **at build time only on the confirmed public deployment** (see `.env.example`). Rebuild after changing these values. The owner-private Sites preview cannot be indexed by Google.

Run `npm run check:seo` after a build to validate all page metadata, structured data, local links and indexing rules. When checking a public build, pass the same `SITE_URL` and `SITE_INDEXABLE` values used to build it.

Inter is bundled in `public/fonts/` under the included SIL Open Font License; builds do not fetch Google Fonts. Scroll content remains visible without JavaScript, and the client logo strip includes a pause control. The direct enquiry endpoint requires configured email credentials for live delivery; explicit local test mode sends no mail.

## Customer journey verification

After building, run `npm run test:browser`. The Playwright checks serve the actual `out/` export on a temporary local server and cover mobile navigation, disabled-script contact fallbacks, service preselection, direct submission in test mode and submission failure recovery, the briefing download, FAQ behavior and 404 recovery. No real enquiry is sent. Google Chrome must be installed; set `PLAYWRIGHT_CHANNEL=msedge` to use an installed Edge browser instead. These checks do not establish production-host routing or external message delivery.

See `SEO/WEBSITE-IMPROVEMENT-PLAN.md` for implementation progress and `SEO/BUSINESS-EVIDENCE-REGISTER.md` for claims awaiting owner verification. The blank enquiry template is available at `/downloads/facility-service-brief.txt`.

Enquiry payloads are encrypted in the browser with AES-256-GCM and RSA-OAEP before submission. The endpoint rejects plaintext. Test mode generates a temporary server key; email mode needs a persistent private key configured only on the server. Run `npm run test:enquiries` for encryption and delivery-handler tests. See the [setup instructions](docs/ENQUIRY-SETUP.md) for key generation, deployment, HTTPS requirements and security limits. This does not encrypt email end to end or prevent a visitor from inspecting their own browser's memory.
