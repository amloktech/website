# Direct website publication — 15 November 2026

After reviewing the draft scope, the business owner instructed: “do not create a staging version of the website. publish directly to the live website.” This supersedes the earlier draft/staging release instruction for this website change. No staging branch or staging website was created. The release removes visible draft status and sets the effective date to 15 November 2026. The previously listed operational decisions remain outstanding; publication is not a certification of application compliance.

The local package build and validation are followed by verification on the existing live Cloudflare website. The review below is preserved as the implementation and legal-readiness record. Its draft-only publication gates describe the earlier plan, not the current authorization.

---

# Legal and connection policies — review draft, 15 November 2026

The website previously described marketing-site processing and deferred institutional use to signed contracts. This revision adds the merchant connection relationship, corrects inaccurate retention/self-service claims, and separates optional monitoring, withdrawal, deletion, and institutional decisions. All five rendered policies display **Review draft — not yet effective**. This branch is not a compliance attestation or a production release.

## Confirmed by the business owner

- Legal entity: Amlok Tech Inc.
- Corporation number: 1461755-0; business number: 783288210.
- Registration date provided: 20 December 2022. Ontario, Canada registration information is supplied by the owner; no inference is made about the specific incorporation statute.
- Confirmed mailing address: 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.
- Single contact for privacy, legal, support, and business: support@amlok.tech. This edit changes website destinations; it does not provision, test, or configure a mailbox.
- Positioning: financial health intelligence and financial risk assessment. Institutions are responsible for their decisions.

## Draft routes and scope

- `/privacy`: website, institutional, and Hub processing with a Shopify-specific section.
- `/terms`: website/service framework; existing signed commercial agreements retain their role.
- `/cookies`: preserve verified website storage disclosures; distinguish authenticated/embedded flows and source-provider pages.
- `/connection-terms`: merchant-facing authorization, institution sharing, withdrawal, and Shopify responsibilities.
- `/privacy-requests`: instructions for a support-operated process, with no fictional automated portal.

Existing URLs and section anchors used by the site remain available. Search/sitemap entries include both new pages. Obsolete duplicate legal descriptions in `site-pages.json` are removed; `legal.ts` supplies the displayed policy body. Shared website support links use the confirmed mailbox. No provider app, backend, consent flow, retention job, cookie behavior, source permission, company profile, or production setting is changed.

## Source review

- Shopify protected customer data: https://shopify.dev/docs/apps/launch/protected-customer-data
- Shopify API terms, especially sections 2.3 and 6: https://www.shopify.com/legal/api-terms
- Shopify privacy-event requirements: https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance
- Plaid legal center: https://plaid.com/legal/ — audience separation and notice structure only; no adoption of Plaid's data permissions, licensed activities, or retention claims.
- OPC meaningful consent: https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/
- Live Amlok privacy, terms, and cookies pages reviewed 15 November 2026.
- Amlok retention documentation: https://docs.amlok.io/security/privacy
- Provider documentation: https://docs.amlok.io/security/hosting-and-subprocessors
- Website implementation: Cal.com loads afterInteractive and forwards URL parameters; language uses `amlok-language` localStorage; enquiry features prepare mailto drafts. No cookie behavior was changed.
- Shopify financial query in `amloktech/webapp`, feature branch `codex/hub-foundation`, `apps/product-api/src/providers/shopify.mjs`: amounts/statuses/history, no buyer contact/address fields. Required privacy-event payloads are separately minimized. Real Shopify end-to-end acceptance remains pending.

## Publication decisions and evidence still needed

1. **Contracts and legal roles:** legal review for actual operating markets and data subjects; match institution and merchant roles to real flows. Complete an institutional DPA/processing schedule, including instructions, confidentiality, approved providers, security, rights assistance, breach assistance, transfers, deletion/return, and assurance/audit rights. Do not assume the website notice alone establishes those contractual arrangements.
2. **Retention:** approve category-specific periods, purpose-end triggers, one-time completion handling, authorization/audit evidence, backup expiry/restore restrictions, exports, and legal holds. Shopify contractual deletion triggers include uninstall and data no longer needed; a month-end billing process cannot extend them. Verify fulfillment, not merely webhook acknowledgment.
3. **Providers and transfers:** verify legal entities, services, data access, locations, onward providers, retention/training terms, and notice/change process. Existing category-level documentation is not evidence of a completed register. Do not promise a public provider list, Canada-only handling, or certifications without evidence.
4. **Requests and consent:** confirm support mailbox ownership/monitoring, secure identity verification and delivery, jurisdictional/provider deadlines, escalation, and completion records. Finish in-product recipient/data/purpose/mode notices, versioned acceptance and withdrawal controls. Do not present these draft connection terms as already accepted by existing users.
5. **Secondary use and decisions:** confirm the draft's restrictions against unrelated advertising/data sales and unauthorized training with all actual data flows and supplier terms. Review profiling/consequential-decision applicability by workflow, including individuals represented in business records, without assuming that institution ownership of final decisions removes Amlok obligations.
6. **Cookies and consistency:** inspect actual deployed storage/network requests for website, Hub, Console, and docs. Assess Cal.com pre-interaction loading, query forwarding, and any required consent or privacy-signal behavior. Coordinate the canonical notice and contact email with application routes, documentation, provider listing URLs, and signed agreements. Broader marketing copy remains a separate review.
7. **Release:** keep visible draft status until factual/legal review and operational readiness are resolved. Validate the approved copy in staging before a separately authorized production release. Do not merge or push to main or deploy the existing production Cloudflare Worker through this draft task. The user's direct-Azure deployment instruction for integration work remains in force; no hosting migration is implied here.

## Shopify questionnaire evidence map

Screenshots showing “Yes” are unverified declarations, not test results. Complete this evidence review before submitting answers.

| Question | Evidence required |
| --- | --- |
| Minimum data | Field-to-purpose inventory; API query/webhook/log minimization. |
| Tell merchants data and purposes | Accurate published policy plus contextual connection notice. |
| Limit use to purpose | Scoped processing, permissions, recipient restrictions, supplier terms. |
| Privacy/data agreements | Applicable merchant agreement and institutional DPA/processing schedule. |
| Respect consent | Versioned notice, scoped consent, monitoring choice, enforceable withdrawal; applicable shopper rights. |
| Sale/sharing opt-outs | Actual-flow legal classification and any required opt-out enforcement. |
| Automated consequential decisions | Workflow assessment, notice, review/opt-out process as applicable. |
| Retention periods | Approved schedules, deletion jobs, backup treatment, fulfillment evidence. |
| Encryption in transit/at rest | Configuration evidence for all relevant storage and transfers. |
| Encrypted backups | Backup configuration and recovery evidence. |
| Test/production separation | Separate data, secrets, access, and deployment settings. |
| DLP | Export/log/secret controls, monitoring, escalation, and documented handling. |
| Limit staff access | Least privilege, onboarding/offboarding, regular access reviews. |
| Strong passwords | Enforced staff authentication requirements and appropriate MFA. |
| Log personal-data access | Relevant read/export/admin access events, protection and review of logs. |
| Incident response | Owned response procedure, severity, escalation, evidence and notifications. |

## Validation

- TypeScript check and Next.js 16.4.3 static export passed.
- Existing site verification passed: 107 pages, 106 sitemap URLs, links, assets, canonicals, headings, branding, and redirects. Updated only the old-domain check to allow the explicitly approved `support@amlok.tech` mailbox; website canonical remains amlok.io.
- All five draft routes returned HTTP 200 at 1440px and 390px widths. No horizontal overflow, old email addresses, or browser runtime errors were found. Desktop/mobile screenshots were inspected; policy navigation and draft notices are readable. External requests were blocked during layout verification, so this is not a live cookie/network audit.
- No new implementation-mirroring unit tests; these changes are policy content and presentation.

---

## Prior review (2 November 2026)

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
