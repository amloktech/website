# Website legal pages — 2 November 2026

Local drafts implemented at /terms, /privacy and /cookies. No deployment or modification to documentation or the authenticated application.

## Evidence reviewed
- Prism Data privacy and terms pages: https://www.prismdata.com/privacy-policy/ and https://www.prismdata.com/terms-of-use/ — structural reference only. Original prose, no adoption of Prism's US entity, arbitration, liability caps, analytics, ad-network practices or regulatory representations.
- OPC meaningful-consent guidance: https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/
- Cal.com privacy: https://cal.com/privacy
- Read-only AMLOK documentation: security/privacy.mdx, security/hosting-and-subprocessors.mdx, pricing/contract-terms.mdx.
- Website implementation: booking-embed.tsx loads afterInteractive and forwards query parameters; use-site-language.ts uses amlok-language localStorage; page-tools.tsx and blog-tools.tsx create mailto drafts; layout uses self-hosted font assets; wrangler.jsonc deploys static assets via Cloudflare. No analytics or advertising tag found in src.

## Scope and review items
These are website policy drafts, not a substitute for legal review or the signed enterprise agreement. Before publication, the business/legal owner should confirm the contracting entity and contact details, current provider and infrastructure configuration, retention practices for enquiry records, applicable jurisdictions and notice obligations, and alignment with the application policy and signed terms.

No fabricated fixed cookie lifetimes, unconditional Canada-only processing, universal deletion rights, no-training promise, sale/sharing representation, arbitration requirement or monetary liability cap were added. The pages disclose that Cal loads before a visitor opens booking and that query forwarding is enabled. No consent manager or tracking behavior was changed as part of writing these pages.

Existing footer and sitemap routes were preserved. Policy text uses a dedicated long-form layout, dated updates, quick summaries, anchored contents, cross-links and contact destinations.
