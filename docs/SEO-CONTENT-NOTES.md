# Content and SEO implementation

## Reference and scope

The supplied `google search rater.pdf` is **Search Quality Rater Guidelines: An Overview, November 2023**, 36 pages, rather than the full evaluator guidelines. Applied its page-purpose guidance (pages 20–22), main-content and responsibility/trust guidance (page 25), and visitor intent/Needs Met guidance (pages 29–32). Rater scores do not directly determine ranking (page 17).

Current Google guidance consulted:
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/local-business

## Delivered

- Useful, service-specific scope planning and FAQ content on all six service pages.
- Chennai context in relevant titles, headings and descriptions, without duplicate suburb pages.
- Named partners and registered company details from the supplied profile.
- A facility enquiry checklist, linked from home, services and the footer.
- Unique canonical, title, description, Open Graph and Twitter metadata per page.
- LocalBusiness, Service and breadcrumb JSON-LD reflecting visible content.
- Static robots.txt and sitemap.xml routes with an explicit public-launch gate.
- Accessible native details/summary FAQs, rendered in HTML. No promises of FAQ rich results or fabricated reviews, ratings, credentials, case studies, years in business, prices or response times.

## Source boundaries

Company facts, names, contacts, workforce and service offerings come from the supplied HFS company profile and client list. Planning guidance is editorial assistance for prospective customers, not proof of past project outcomes. Client identities indicate the supplied portfolio, not endorsements. Specialized inclusions, equipment, qualifications, response times and availability require confirmation with HFS.

## Before public launch

This is the client's first website. The public domain is not yet confirmed. The current Sites deployment remains owner-private; it is not a Google-indexable production launch.

1. Confirm the owned public HTTPS domain with the client. The profile lists www.homefacilityservices.in, but that does not establish the deployment destination.
2. Obtain client review of company contacts, service scope, partner names, workforce count and permission to display client logos.
3. On the actual public deployment, set `SITE_URL=https://confirmed-domain` and `SITE_INDEXABLE=true` at build time, then rebuild. The default private build emits noindex/nofollow, disallows crawling, and has an empty sitemap. Do not enable indexing on the private preview.
4. Confirm anonymous access to the public pages, production canonical URLs, redirects, robots.txt and populated sitemap.xml.
5. Verify the public domain in Google Search Console and submit its sitemap. Run Google's Rich Results Test on the public URLs. Neither was submitted from this workspace.
6. Add genuine project photographs, authorized case studies and real customer feedback when available; do not invent evidence to simulate E-E-A-T.

No ranking, indexing or rich-result guarantee is implied. Sitemap entries intentionally omit fabricated modification dates.
