# Content and SEO implementation

## Reference and scope

The current reference is [Search Quality Evaluator Guidelines](../SEO/searchqualityevaluatorguidelines.pdf), **September 11, 2025**, 182 pages. The full-document review and implementation backlog are recorded in [the website improvement plan](../SEO/WEBSITE-IMPROVEMENT-PLAN.md). Earlier work used a November 2023 overview; it is superseded as this project's primary reference. Rater scores do not directly determine ranking (§0.1, p. 6).

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
- Static robots.txt and sitemap.xml routes. The sitemap contains all 13 pages; public indexing remains explicitly gated by build-time configuration.
- Accessible native details/summary FAQs, rendered in HTML. No promises of FAQ rich results or fabricated reviews, ratings, credentials, case studies, years in business, prices or response times.
- Direct customer-facing service FAQs, a service comparison table, and a downloadable blank facility brief. These clarify enquiry preparation without introducing unverified inclusions or qualifications.
- Shared company address/contact data used by visible company information, contact FAQs and business schema.
- Enquiry privacy link, direct JSON submission, server-side field validation, explicit non-delivery test mode, failure recovery, and disabled form fields until client initialization. Email is required so HFS can respond. Copy and delivery selectors have been removed from the form. Without JavaScript, direct phone/email links remain available.
- Mobile navigation remains visible before client initialization; 404 content links directly to Services, Contact and Home.

## Source boundaries

Company facts, names, contacts, workforce and service offerings come from the supplied HFS company profile and client list. Planning guidance is editorial assistance for prospective customers, not proof of past project outcomes. Client identities indicate the supplied portfolio, not endorsements. Specialized inclusions, equipment, qualifications, response times and availability require confirmation with HFS.

## Before public launch

This is the client's first website. The public domain and current hosted audience have not been verified in this local implementation pass. The repository defaults to preview indexing settings; local edits do not establish that a public deployment has occurred.

1. Confirm the owned public HTTPS domain with the client. The profile lists www.homefacilityservices.in, but that does not establish the deployment destination.
2. Obtain client review of company contacts, service scope, partner names, workforce count and permission to display client logos.
3. On the actual public deployment, set `SITE_URL=https://confirmed-domain` and `SITE_INDEXABLE=true` at build time, then rebuild. The default private build emits noindex/nofollow, disallows crawling, and includes all 13 pages in the sitemap. Do not enable indexing on the private preview.
4. Confirm anonymous access to the public pages, production canonical URLs, redirects, robots.txt and populated sitemap.xml.
5. Verify the public domain in Google Search Console and submit its sitemap. Run Google's Rich Results Test on the public URLs. Neither was submitted from this workspace.
6. Add genuine project photographs, authorized case studies and real customer feedback when available; do not invent evidence to simulate E-E-A-T.

For preview privacy, use host authentication/access controls. `Disallow` blocks crawling but is not a privacy mechanism, and a blocked crawler cannot read a page's `noindex` directive. Keep preview URLs out of public launch submissions.

No ranking, indexing or rich-result guarantee is implied. Sitemap entries intentionally omit fabricated modification dates.
