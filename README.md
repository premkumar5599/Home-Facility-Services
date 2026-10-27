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
- `.openai/hosting.json` — Existing Site identity; publishes `out/`

## Validation and production

```sh
npm run typecheck
npm run build
python3 -m http.server 8080 --directory out
```

The build creates `out/`; serve it with a static host. `npm run dev` runs the development server. The original static prototype remains in `dist/` for reference; it is not the active application or deployment output.

The contact form opens the visitor's email app. It does not send email automatically or store enquiries. All content and logos come from the supplied HFS documents. Confirm current contact details, workforce figures and client portfolio permissions with the client before a public launch.

## Content and SEO

See `docs/SEO-CONTENT-NOTES.md` for the search-rater guide mapping, factual source boundaries and launch checklist. `src/lib/seo.ts` owns canonical URLs and structured business data; `src/lib/service-content.ts` owns service-specific planning content and FAQs.

Private previews default to `noindex, nofollow`, disallow crawling and emit an empty sitemap. Configure `SITE_URL` and `SITE_INDEXABLE=true` **at build time only on the confirmed public deployment** (see `.env.example`). Rebuild after changing these values. The owner-private Sites preview cannot be indexed by Google.

Run `npm run check:seo` after a build to validate all page metadata, structured data, local links and indexing rules. When checking a public build, pass the same `SITE_URL` and `SITE_INDEXABLE` values used to build it.
