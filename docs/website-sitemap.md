# AMLOK website sitemap and implementation

Prepared 31 October 2026 for the local website. The original architecture below is now implemented locally: all 53 planned new pages, three editorial articles, and a human-readable `/site-map`. The current site has 65 pages and 64 indexable sitemap entries, including nine blog articles. The requested removal of the customer-story page is reflected in the navigation and page inventory below. Menus, footer, and search now link to the new destinations. The following audit records the starting state.

The website should explain AMLOK's platform, the problems it addresses, and how to start a relationship. Detailed integration instructions remain in the documentation. Give each subject one canonical destination, even when it appears under Products, Use cases, and Modules.

## Original link audit

The local application has three page routes: `/`, `/about-us`, and `/brand`. The header, desktop menus, mobile menus, and footer reference 29 distinct internal paths with no page route. Of these, 26 need content pages and three are social-profile placeholders that should become external links.

The Solutions menu uses homepage anchors for its four product labels, seven use cases, seven modules, and five industries. These are section links rather than dedicated pages. Pricing and Security & Compliance also lead to homepage sections. Both header actions, Sign up and Talk to us, currently lead to `#platform`.

Documentation and Quickstart use the older Mintlify hostname. Use `https://docs.amlok.io` consistently and point Quickstart to `/api-reference/quickstart` rather than the introduction. Existing homepage section IDs should remain available for saved deep links.

## Proposed navigation

Keep the main header familiar: **Solutions · Developers · Resources · Pricing**, followed by **Sign up** and **Talk to us**.

- **Solutions:** platform overview, paid products, use cases, modules, industries, and integrations. Risk simulation and the risk graph appear as platform capabilities.
- **Developers:** developer overview, documentation, API reference, SDKs and tools, webhooks, MCP, integration prompt, sandbox, agent skills, changelog, and service status.
- **Resources:** research, blog, help center, demo center, and company pages.
- **Pricing:** a dedicated page linked to the detailed pricing documentation.
- **Sign up:** `/get-started`, explaining onboarding and offering an access request or a verified portal destination.
- **Talk to us:** `/contact`, with clear sales, demo, support, and partnership routes.

The footer uses the same canonical destinations, adds comparisons and legal pages, and links social icons directly to verified company profiles. Desktop, mobile, footer, and site search should consume one shared navigation registry.

## Page inventory

This proposal contains **56 canonical website pages: three existing and 53 new**. Repeated navigation labels share pages instead of creating near-duplicate content. Research publications, blog articles, and industry subpages are future children, counted separately.

### Core pages

| Page | Canonical route | Status and purpose |
| --- | --- | --- |
| Home | `/` | Existing. Introduce AMLOK and guide visitors to the relevant product, use case, or industry. |
| Platform overview | `/platform` | New. Explain connected evidence, entities, workflows, risk signals, and institution-owned decisions. |
| Integrations | `/integrations` | New. Searchable provider and category overview with availability sourced from the documentation catalogue. |
| Pricing | `/pricing` | New. Explain Insights, Signal, the shared wallet, workload tiers, and agreement terms. |
| Contact | `/contact` | New. Sales, demos, support, and partnership enquiries with working destinations. |
| Get started | `/get-started` | New. Explain onboarding, access requests, environment setup, and the next step for an institution. |

### Products and platform capabilities

| Page | Canonical route | Content focus |
| --- | --- | --- |
| Products overview | `/products` | How Insights and Signal work together across underwriting and monitoring. |
| AMLOK Insights — Deal underwriting | `/products/underwriting` | Evidence intake, readiness, analysis, policy fit, explainable outputs, and human review. |
| AMLOK Signal — Portfolio monitoring | `/products/portfolio-monitoring` | Approved baselines, changing borrower conditions, ongoing reassessment, alerts, and evidence. |
| Risk simulation | `/platform/risk-simulation` | Policy and portfolio scenario exploration; distinguish the described capability from confirmed API availability. |
| Foundational risk graph | `/platform/risk-graph` | Entity resolution, financial relationships, evidence lineage, and the research direction. |

The technical documentation names Insights and Signal as the two paid products. The other capabilities should not imply additional standalone product charges. [Product scope](https://docs.amlok.io/api-reference/products-and-endpoints)

### Solutions and modules

| Page | Canonical route | Content focus |
| --- | --- | --- |
| All use cases | `/solutions` | Directory organized around the work credit, risk, and operations teams need to complete. |
| Entity and fraud resolution | `/solutions/entity-fraud-resolution` | Identity, ownership, account relationships, inconsistent evidence, and investigation support. Preserve the route used on the current AMLOK website. |
| Cash-flow intelligence | `/solutions/cash-flow-intelligence` | Revenue, obligations, transfers, liquidity, and evidence reconciliation. |
| Decision automation | `/solutions/decision-automation` | Institution-owned policies, workflow conditions, review gates, and system handoffs. |
| Borrower servicing and collections | `/solutions/borrower-servicing-collections` | How current risk context supports actions performed by the institution in its own systems. |
| All modules | `/modules` | Lifecycle capability map with links to canonical product and solution pages. |
| Verification and onboarding | `/modules/verification-onboarding` | Applicant, business, ownership, authorization, and evidence-readiness workflows. |
| White-label experiences | `/modules/white-label-experiences` | Branded connection and intake experiences, embedding patterns, and implementation boundaries. |

### Industries

| Page | Canonical route | Content focus |
| --- | --- | --- |
| Industry directory | `/industries` | Guide visitors to their lending or financial-services context. |
| Consumer lending | `/industries/consumer-lending` | Affordability, obligations, changing income, and monitoring across consumer credit. |
| Business lending | `/industries/business-lending` | Business cash flow, ownership, working capital, borrowing, and repayment risk. |
| Financial institutions | `/industries/financial-institutions` | Banks, credit unions, and alternative lenders; governance, integration, and operating workflows. |
| Fintech | `/industries/fintech` | Digital lending, embedded finance, API integration, and evidence-based product workflows. |
| Insurtech | `/industries/insurtech` | Financial evidence and counterparty context for trade credit, surety, and premium finance; state actual supported scope. |

Future industry children can cover merchant cash advance, mortgages, auto finance, student lending, and rent payments. Create these when there is enough distinct AMLOK content to justify a useful page. Keep links to these topics on their parent industry pages until then.

### Developers

| Page | Canonical route | Content focus and detailed destination |
| --- | --- | --- |
| Developer overview | `/developers` | Integration journey, tools, authentication, environments, and links to the technical documentation. |
| API reference | `/developers/api-reference` | API introduction, capabilities, contract downloads, and [full reference](https://docs.amlok.io/api-reference/overview). |
| MCP Server | `/developers/mcp` | Explain the intended agent integration and verified availability. No install command or live-server claim without a working implementation. |
| SDKs and developer tools | `/developers/sdks` | Available OpenAPI, Postman, Node.js, and Python resources, linked to [downloads](https://docs.amlok.io/api-reference/downloads). |
| Webhooks | `/developers/webhooks` | Event-driven integration overview and [signature and delivery guidance](https://docs.amlok.io/api-reference/webhooks). |
| Integration prompt | `/developers/integration-prompt` | A copyable integration brief grounded in the current docs and OpenAPI contract. |
| Sandbox | `/developers/sandbox` | Access, synthetic data, test journeys, and [sandbox walkthroughs](https://docs.amlok.io/api-reference/sandbox-journeys). |
| Agent Skills | `/developers/agent-skills` | Verified reusable integration instructions and downloadable skill files when created and tested. |
| Changelog | `/changelog` | Dated, verified product and API changes; add entries from actual releases. |
| Service status | `/status` | Service observations, timestamps, and incident information from an actual status source. |

Documentation links directly to [docs.amlok.io](https://docs.amlok.io/). Quickstart links directly to the [API quickstart](https://docs.amlok.io/api-reference/quickstart). These are existing external destinations, not additional website pages.

### Resources

| Page | Canonical route | Content focus |
| --- | --- | --- |
| Research library | `/research` | The featured foundational-risk-graph project and industry research collection, with clear publication states. |
| Blog | `/blog` | Original articles on risk intelligence, connected data, lending workflows, and model evaluation. |
| Help Center | `/help-center` | Searchable starting points for onboarding, integrations, billing, troubleshooting, and [support](https://docs.amlok.io/support/overview). |
| Demo Center | `/demo-center` | Guided product walkthroughs, existing illustrations, and demo booking. Label sample data as illustrative. |

Future article routes are `/research/[slug]` and `/blog/[slug]`. Publish individual routes only with substantive content. The eight existing book covers are research previews, not completed reports.

The featured research title remains **Building a foundational risk graph: Retrospective validation across 275,019 closed deals.** Keep its coming-soon state until the actual methodology and report are ready. Industry previews cover merchant cash advance, insurtech, mortgage lending, auto finance, fintech, business lending, and consumer credit.

### Company and trust

| Page | Canonical route | Status and purpose |
| --- | --- | --- |
| About us | `/about-us` | Existing. Team, mission, vision, and company journey. |
| Manifesto | `/manifesto` | New. Connected evidence, continuously changing risk, explainability, and institutional control. |
| Partners | `/partners` | New. Verified relationships with LvlUp Ventures, the Canadian Lenders Association, NVIDIA, and other confirmed partners; describe each relationship accurately. |
| Careers | `/careers` | New. Company mission, working environment, and genuine openings or expressions of interest. |
| Security and compliance | `/security-compliance` | New. Controls, data handling, governance, deployment scope, and a due-diligence contact, backed by the [security documentation](https://docs.amlok.io/security/overview). |
| Brand guidelines | `/brand` | Existing. Retain the design system and its current noindex setting. |

### Comparisons

| Page | Canonical route |
| --- | --- |
| Comparison directory | `/compare` |
| AMLOK vs Prism Data | `/compare/prism-data` |
| AMLOK vs Flinks | `/compare/flinks` |
| AMLOK vs Judi AI | `/compare/judi-ai` |
| AMLOK vs Covaleyo | `/compare/covaleyo` |
| AMLOK vs Intellifi | `/compare/intellifi` |
| AMLOK vs Inverité Insights | `/compare/inverite-insights` |

Each comparison should explain the respective product category, documented capabilities, integration approach, and fit for the buyer. Use dated primary vendor sources and distinguish complementary providers from direct substitutes.

### Legal

| Page | Canonical route | Content focus |
| --- | --- | --- |
| Privacy | `/privacy` | AMLOK's actual website and product data practices, grounded in existing company policies and the [privacy documentation](https://docs.amlok.io/security/privacy). |
| Cookies | `/cookies` | The website's actual cookies, browser storage, analytics, and visitor controls. |
| Terms of business | `/terms` | Applicable company terms and relevant agreement links, grounded in the company's actual agreements. |

## Mapping every existing menu label

### Solutions menu and matching footer columns

| Navigation group | Existing label | Current destination | Proposed destination |
| --- | --- | --- | --- |
| Products | Deal Underwriting | `#product-underwriting` | `/products/underwriting` |
| Products | Portfolio monitoring | `#product-monitoring` | `/products/portfolio-monitoring` |
| Products | Risk Simulation | `#loan-scale-slide-1` | `/platform/risk-simulation` |
| Products | Foundational risk graph | `#risk-operations` | `/platform/risk-graph` |
| Use cases | Entity & fraud resolution | `#product-investigation` | `/solutions/entity-fraud-resolution` |
| Use cases | Cash-flow intelligence | `#platform` | `/solutions/cash-flow-intelligence` |
| Use cases | Underwriting intelligence | `#product-underwriting` | `/products/underwriting` |
| Use cases | Decision automation | `#platform` | `/solutions/decision-automation` |
| Use cases | Portfolio monitoring | `#product-monitoring` | `/products/portfolio-monitoring` |
| Use cases | Portfolio simulation | `#loan-scale-slide-1` | `/platform/risk-simulation` |
| Use cases | Borrower servicing & collections | `#product-servicing` | `/solutions/borrower-servicing-collections` |
| Use cases | All use cases | `#use-cases` | `/solutions` |
| Modules | Verification & onboarding | `#product-verification` | `/modules/verification-onboarding` |
| Modules | Credit underwriting | `#product-underwriting` | `/products/underwriting` |
| Modules | Monitoring & early warning | `#product-monitoring` | `/products/portfolio-monitoring` |
| Modules | Servicing & collections | `#product-servicing` | `/solutions/borrower-servicing-collections` |
| Modules | Fraud & compliance operations | `#product-investigation` | `/solutions/entity-fraud-resolution` |
| Modules | Risk simulation | `#loan-scale-slide-1` | `/platform/risk-simulation` |
| Modules | White-label experiences | `#loan-scale-slide-2` | `/modules/white-label-experiences` |
| Modules | All modules | `#products` | `/modules` |
| Industries | Consumer Lending | `#consumer-risk-gaps` | `/industries/consumer-lending` |
| Industries | Business Lending | `#risk-gaps` | `/industries/business-lending` |
| Industries | Financial Institutions | `#platform` | `/industries/financial-institutions` |
| Industries | Fintech | `#loan-scale-slide-4` | `/industries/fintech` |
| Industries | Insurtech | `#platform` | `/industries/insurtech` |
| Industries | Explore industries | `#risk-gaps` | `/industries` |
| Mobile | All solutions | `#platform` | `/solutions` |

### Developer links

Every currently reserved developer route remains its proposed canonical route: `/developers/api-reference`, `/developers/mcp`, `/developers/sdks`, `/developers/webhooks`, `/developers/integration-prompt`, `/developers/sandbox`, `/developers/agent-skills`, `/changelog`, and `/status`. Their page purposes and documentation destinations are listed above.

The quickstart feature card and footer Quickstart link both move to `https://docs.amlok.io/api-reference/quickstart`. Documentation moves to `https://docs.amlok.io/`.

### Resources and company links

Research, Blog, Help Center, Demo Center, About us, Manifesto, Partners, and Careers keep their existing paths, with the missing pages created. The Meet the team feature continues to `/about-us`. Security & Compliance moves from `/#security-compliance` to `/security-compliance`. Contact moves from the email action to `/contact`; the visible support email remains a working mailto link. Brand guidelines remains `/brand`.

### Header actions and remaining footer links

| Link or control | Proposed behavior |
| --- | --- |
| Header and footer logo | `/` |
| Pricing | `/pricing` |
| Sign up | `/get-started`; connect to a verified registration or portal flow when available. |
| Talk to us | `/contact` |
| Six comparison links | Retain the six `/compare/...` routes listed above. |
| Privacy, Cookies, Terms of business | Create `/privacy`, `/cookies`, and `/terms`. |
| Footer email | Retain `mailto:support@amlok.tech`. |
| LinkedIn | Replace `/links/linkedin` with the company profile verified from an official company source. |
| GitHub | Replace `/links/github` with `https://github.com/amloktech`. |
| X | Replace `/links/x` with the company profile verified from an official company source. |
| AI summary links | Keep external provider actions; construct the summarized URL using the site's configured canonical domain. |
| Search | Index all completed pages and useful section anchors from the shared registry. |
| Language selection | Currently stores a preference only. Add `/fr/...` routes when translated content exists, with matching language links and metadata. |

The social placeholders should not become empty local content pages. All existing navigational destinations are covered above, including repeated links on mobile and in the footer.

## Content decisions before page writing

1. **Product naming:** use Insights for underwriting and Signal for monitoring. Place risk simulation and the foundational risk graph under platform capabilities. [Product scope](https://docs.amlok.io/api-reference/products-and-endpoints)
2. **Servicing scope:** the homepage currently describes borrower-facing execution. The API documentation says the institution performs outreach, collections, and interventions in its own systems, and lists no servicing-case or borrower-message endpoints. Align the new servicing and decision-automation pages with the supported product scope. [Product scope](https://docs.amlok.io/api-reference/products-and-endpoints)
3. **Pricing:** the homepage presents pay-as-you-go and Enterprise plans, while the current pricing documentation states a minimum monthly commitment paid annually. Resolve the commercial wording before completing `/pricing` or copying pricing into product pages. [Pricing](https://docs.amlok.io/pricing/overview)
4. **Developer availability:** the docs provide OpenAPI, Postman, and language examples and explicitly say these are not official SDK packages. MCP and Agent Skills appear in the website menu but are not verified in the retrieved documentation index. Their pages should describe availability accurately and only offer working assets. [Developer downloads](https://docs.amlok.io/api-reference/downloads)
5. **Status:** the documented contract describes a status endpoint, but its examples use a placeholder environment URL and synthetic observations. Connect `/status` to a verified source; use an explicit unavailable or unknown state if live status cannot be retrieved. [Service status contract](https://docs.amlok.io/api-reference/endpoints/platform/service-status)
6. **Research and customer stories:** retain the research previews until the reports exist. Retrospective analysis of institutions is not a customer testimonial or proof of a customer relationship.
7. **Company-specific statements:** use confirmed AMLOK facts for partners, security posture, legal terms, job openings, pricing, availability, and results. External research can explain industries and compare documented products, but cannot establish AMLOK's capabilities or outcomes.

These are content reconciliation items for page production; they do not prevent creating the proposed page structure locally.

## Implementation order

1. Build reusable page layouts and one navigation registry; establish the canonical domain and page metadata.
2. Create Platform, Products, Integrations, Pricing, Contact, Get started, and Security & Compliance.
3. Create the solution, module, and industry pages; connect every Solutions menu and footer destination.
4. Create developer pages and connect existing documentation resources; implement the supported actions on Sandbox, Integration prompt, and developer-tool pages.
5. Create resource and company hubs, legal pages, verified comparisons, Changelog, and Service status.
6. Replace social placeholders, update mobile navigation and site search, validate all links, and generate the published XML sitemap from completed indexable routes only.

Use the current AMLOK typography, blue gradients, section labels, spacing, illustrations, header, and footer. Every new page needs a distinct purpose, useful content, related destinations, and a functional next action.

## Routing and launch checks

- Preserve existing homepage anchors while navigation moves to dedicated pages.
- Check current public AMLOK routes during migration and add redirects where the canonical path changes, including `/about/` to `/about-us`. Reconcile `/continuous-intelligence` with the new platform structure after reviewing its current content.
- Fix the desktop Solutions menu's unconditional `homeHref + href` composition before switching its entries to root-relative paths; otherwise inner pages could produce `//products/...` destinations.
- Generate static pages for every planned published route, consistent with the project's Next.js static export.
- Create unique titles, descriptions, social previews, breadcrumbs, and canonical URLs. Keep `/brand` out of the public XML sitemap while it remains noindex.
- Do not include planned, missing, external, redirect, or unpublished article URLs in `sitemap.xml`. Add `robots.txt` pointing to the generated sitemap on the production domain.
- Verify header, footer, mobile, search, and in-page calls to action at desktop and mobile sizes. Check keyboard navigation and route-specific 404 behavior.
- A status code of 200 on the old AMLOK site is not enough to prove a route exists: its `/sitemap.xml` currently returns the application's HTML shell rather than an XML sitemap.

## Audit sources

- Local page routes under `src/app` and navigation in `site-header.tsx`, `solutions-menu.tsx`, `developers-menu.tsx`, `resources-menu.tsx`, `mobile-navigation.tsx`, and `site-footer.tsx`.
- [AMLOK documentation index](https://docs.amlok.io/llms.txt), retrieved 31 October 2026.
- [AMLOK introduction](https://docs.amlok.io/overview/introduction).
- [Products and endpoint scope](https://docs.amlok.io/api-reference/products-and-endpoints).
- [Integration onboarding](https://docs.amlok.io/api-reference/onboarding).
- [Developer tools and downloads](https://docs.amlok.io/api-reference/downloads).
- [Pricing](https://docs.amlok.io/pricing/overview).
- [Existing entity and fraud resolution route](https://www.amlok.io/solutions/entity-fraud-resolution).

This sitemap is a local planning artifact. No application links or deployed pages were changed as part of the audit.
