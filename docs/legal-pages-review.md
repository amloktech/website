# Legal and provider alignment

Reviewed and updated locally on November 24, 2026. This record describes the current local policies, the Trust Center alignment, and the evidence limits. It does not publish the changes or amend a signed agreement. The existing website policies were authorized for direct publication on November 15, 2026; that historical release is distinct from this local revision.

## Current policy scope

All five pages use `src/content/legal.ts`, the confirmed company details, and `support@amlok.tech`. Existing routes and section anchors are preserved. The displayed revision is “Updated November 24, 2026.”

| Page | Current coverage |
| --- | --- |
| `/terms` | Website/service responsibilities, institution-owned decisions, provider roles, Stripe platform billing, permitted-use restrictions, agreement precedence, and links to the Trust Center. |
| `/privacy` | Website, account, institutional, and Hub processing; named providers and their roles; identity-provider scopes; financial connections and business verification; Canadian contracted processing; source records, retention, requests, and institutional decisions. |
| `/cookies` | Implemented website storage, interaction-gated scheduling, domain/DNS services, remote image requests, separate Console identity/connection/payment flows, and Mintlify documentation. |
| `/connection-terms` | Authority, recipient and purpose, supported business-account connections, Flinks/Plaid/Baselayer scope where applicable, optional monitoring, withdrawal, and source-specific restrictions. |
| `/privacy-requests` | Support-operated requests, provider and residency enquiries, source-record coordination, and the distinction between disconnecting, deleting Amlok records, and deleting a provider account. |

Public provider links point to `/trust#subprocessors` and the documentation at `https://docs.amlok.io/security/hosting-and-subprocessors`. The standards register remains scope-based; a listed law, framework, or provider certificate does not itself establish Amlok or institutional compliance.

## Confirmed company and operating information

- Amlok Tech Inc.; corporation number 1461755-0; business number 783288210.
- Registered business address: 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.
- Registration date provided by the business owner: December 20, 2022.
- Confirmed single contact: support@amlok.tech. Editing the website does not provision or test this mailbox.
- Amlok provides financial health intelligence and financial risk assessment technology. Institutions own their policies and consequential decisions; Amlok retains responsibility for its own processing.
- The owner confirmed Azure for the institutional platform, Stripe for payments, Cloudflare for domain management, Flinks/Plaid/Baselayer services, GitHub for versioning, and Google/Microsoft/GitHub for user access.
- On November 24 the owner expressly confirmed that **all provider processing is contractually restricted to Canada**, including the clarification question’s storage, backup, and support-access scope. The policies report this as the scope of processing performed under Amlok provider arrangements. This is an owner-supplied contractual fact, not verification of private agreements, current runtime settings, or vendor headquarters.

## Provider roles and boundaries

| Provider | Disclosed role | Boundary |
| --- | --- | --- |
| Microsoft Azure | Institutional platform, database/artifacts, secrets, monitoring, transactional account email | Canada Central for core hosting; shared application/configuration responsibilities. |
| Stripe | Amlok platform billing and service-credit funding | Separate from borrower disbursements/repayments and from a financial-data integration. No unverified Checkout, Elements, Connect, webhook, or card-storage claims. |
| Flinks | Authorized financial-data connections | Connection-specific permissions and data; provider-owned services have their own notice. |
| Plaid | Authorized financial-data connections | Product and connection scope determines data and roles; not every Plaid capability is claimed. |
| Baselayer | Business verification and risk information | Public/licensed source-data role can be independent of Amlok. Its business information cannot be repurposed for prohibited FCRA consumer eligibility decisions. |
| Google | Optional user identity | Basic profile/email; no Gmail or Drive scope. |
| Microsoft identity | Optional user identity | Basic profile/email; separate from Azure hosting; no mailbox or directory scope. |
| GitHub | Optional user identity, and separately source versioning/development | Basic identity/email sign-in has no repository scope. Source control is not the designated store for customer financial records. |
| Cloudflare | Website delivery, domain management and DNS | Does not host the institutional application database merely because it manages the domain. |
| Cal.com | Requested scheduling | Loaded on interaction, not automatically on page load. |
| Mintlify | Public documentation hosting | Reader and documentation interactions are distinct from institutional account processing. |

The list is not a claim that every provider receives all customer data or acts exclusively as an Amlok subprocessor. Independent identity accounts, source datasets, public websites, and provider-operated services retain their applicable terms. Amlok’s contracted Canadian-processing restriction is not a claim that those companies are headquartered in Canada or that every independent service operates only in Canada.

Institution logos loaded from institution websites, Contentful, or Webflow are disclosed separately as browser asset requests. A recipient of an image request is not automatically an Amlok-contracted subprocessor. External links and AI-summary destinations likewise do not acquire account or financial-data access merely because the user opens a link.

## Source review

Local website sources:

- `src/components/booking-embed.tsx`: the local queue is initialized without contacting Cal.com; the remote script is requested after `amlok:request-booking`; `forwardQueryParams` is false. Historical notes describing automatic remote script loading or URL forwarding are superseded.
- `src/components/research-institution-logos.tsx`: some institution images use external URLs and disclose request metadata to the host.
- `src/lib/use-site-language.ts` and related language controls: `amlok-language` local storage.
- Website contact/journal and Trust Center request features prepare editable email drafts or copyable requests; they do not submit an authenticated access request, execute an NDA, or activate a subscription by themselves.
- `src/app/layout.tsx`: self-hosted font assets; no configured first-party advertising/Google Analytics tag found in the reviewed website source.

Webapp evidence:

- `amlok-webapp/docs/social-authentication.md` and associated authentication implementation: Google, Microsoft, GitHub basic identity/email permissions; GitHub `read:user user:email`; no repository scope. Provider tokens are discarded after identity resolution. Amlok association/session records remain separate.
- Azure deployment and application sources establish the platform-service scope. The prior source review identifies Canada Central core hosting. It is not a live infrastructure audit.
- Stripe use is owner-confirmed. Inspected source contains simulated billing/payment methods and disabled Live payment setup; no production payment adapter was verified. The legal copy describes the provider role without asserting a specific unverified payment integration.
- Supported integration catalog entries are not evidence that each provider has received data or that every feature is deployed. Flinks, Plaid, and Baselayer use is owner-confirmed; exact activated products and contracts remain service-specific.

Official references reviewed:

- [Flinks privacy statements](https://www.flinks.com/privacy-policy) and [data-safety guidance](https://www.flinks.com/data-safety). Public generic guidance permits Canada or U.S. storage by residence; Amlok-specific contractual scope is separately owner-confirmed.
- [Plaid privacy and service terms](https://plaid.com/legal/). Distinguishes end-user, developer, and independent processing; describes international operations.
- [Baselayer Privacy Policy](https://baselayer.com/privacy-policy/) and [Terms of Service](https://baselayer.com/terms-of-service/). Correct company domain is `baselayer.com`, not unrelated companies using a similar name.
- [Google Privacy Policy](https://policies.google.com/privacy), [Microsoft Privacy Statement](https://www.microsoft.com/en-us/privacy/privacystatement), and [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). These do not establish that every provider account or independent processing activity is Canada-only.
- [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) and [Cal.com privacy information](https://cal.com/privacy).
- [Stripe security and PCI responsibilities](https://docs.stripe.com/security/guide) and [Azure shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility).
- [Shopify protected customer data](https://shopify.dev/docs/apps/launch/protected-customer-data), [API terms](https://www.shopify.com/legal/api-terms), and [required privacy events](https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance).
- [OPC meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/).

## Agreements and implementation evidence

Public descriptions do not create a new DPA, demonstrate that an audit is complete, or verify a legal entity’s signed provider terms. The deployment-specific record should retain the actual contracting entities, covered services, data categories, Canada restrictions, onward providers, permitted uses, incident assistance, change notices, and retention/return/deletion obligations.

Retention and privacy requests remain support-coordinated. There is no invented self-service retention setting or automatic deletion/refund implementation. Commercial cancellation, source disconnection, privacy deletion, and revoking a provider’s independent authorization remain distinct. Signed commercial terms retain their role; this alignment does not introduce new fees or reduce established refund entitlements.

Shopify-specific obligations and data restrictions remain intact, including the original minimum financial-order scope, no automatic monitoring consent, required privacy-event handling, applicable deletion triggers/deadlines, no unrelated advertising/data resale or unrestricted training permission, and separate institution/source responsibilities.

This update changes public content only. It does not modify cloud regions, provider contracts, identity permissions, consent controls, application data flows, cookies, retention jobs, or production settings. The repository’s validation and browser review record determines release readiness separately.

## Second substantive review

A second review expanded the five policies beyond the provider inventory:

- **Responsibilities and instructions:** distinguishes Amlok’s own account/site purposes from institution-instructed processing; requires lawful scope, authority, purposes, recipients, and restrictions without presenting a public policy as a signed DPA.
- **Collection and permission:** optional information and connections, effects of withholding/withdrawing necessary information, changes in authority, and material changes in purpose, recipient, or requested data.
- **Automated decisions:** explanation of data, reasons and principal factors where applicable; correction and meaningful review by someone able to reconsider the decision; institution/Amlok request routing without claiming a universal right or a universal automated-decision workflow.
- **Privacy requests:** no new account required; written requests and authorized representatives; proportionate verification; reasons for limitations, applicable appeals and regulator complaints; no penalty for exercising lawful rights. These statements do not create an automated request portal or invent a fixed legal deadline.
- **Security incidents:** reporting channel, assessment and harm limitation, provider/institution coordination, evidence, applicable notification thresholds and timelines, required incident records, and supplementary notices as facts become available. No universal 24/72-hour commitment is invented.
- **Provider oversight:** contract/law-based notice, authorization and objection where applicable; no fabricated universal advance-notice period.
- **Retention:** purpose-limited schedules, legal-hold basis and scope, restricted access, review when the hold ends, recovery copies, backup expiry, and separate billing/security records. Source-specific deletion obligations remain preserved.
- **Geography:** the owner-confirmed Canadian contractual restriction remains intact. The policies now also explain that outside-Québec handling can occur within Canada and requires the applicable assessment and written safeguards.
- **Cookies and authenticated storage:** added a separate Console inventory with implemented session, OAuth/MFA, invitation continuation, sidebar preference, setup/Sandbox, and email-preference state. These are distinct from website language preferences, third-party provider storage, and consent to financial collection.

Additional source evidence:

- `amlok-webapp/packages/auth/src/index.ts`: seven-day session lifetime with renewal, production HttpOnly/Secure/SameSite=Lax session-cookie configuration, no session-token local storage, and ten-minute multi-factor state.
- `amlok-webapp/apps/api/src/routes/workspace-invitations.ts`: scoped HttpOnly invitation-continuation cookie; expiry tied to the invitation and removal on acceptance.
- `amlok-webapp/apps/web/src/components/auth/workspace-invitation-form.tsx`: tab session storage for invitation continuation.
- `amlok-webapp/apps/web/src/components/ui/sidebar.tsx`: `sidebar_state` preference cookie with a seven-day configured lifetime.
- `amlok-webapp/apps/web/src/components/auth/email-preferences-form.tsx` and workspace setup/Sandbox components: temporary tab state and local interface preferences.
- `amlok-webapp/docs/live-operations.md`: support-coordinated requests; missing universal deletion/retention tooling; distinct source/derived/financial/audit/backup records. The public policy states obligations and request routes rather than certifying implementation completion.

Additional primary references reviewed:

- [OPC mandatory breach reporting guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/privacy-breaches-at-your-business/gd_pb_201810/).
- [OPC retention and disposal guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/gd_rd_201406/).
- [Québec private-sector use and disclosure guidance, including automated decisions](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/utilisation-communication-renseignements-personnels).
- [Québec privacy rights](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/citoyens-protection-renseignements-personnels/acces-et-protection-renseignements-personnels).
- [Québec privacy-impact assessment guidance](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_GU_EFVP.pdf).
- [California Attorney General CCPA guidance](https://www.oag.ca.gov/privacy/ccpa).

Remaining evidence limits are specific: private DPAs/provider restrictions were not inspected; the approved retention schedule and deletion exercises were not supplied; no real incident or request-handling exercise was performed; deployed third-party cookies were not exhaustively network-audited; an active production Stripe adapter was not verified. The policies do not turn these limits into a claim of completed testing or certification. The named privacy contact is a functional route through the confirmed mailbox, not an invented employee or officer identity.
