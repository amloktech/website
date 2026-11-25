# Amlok Trust Center

Local route: `/trust`. The page is a standalone portal, with a compact footer instead of the marketing footer. It is excluded from indexing and has not been added to site navigation or the sitemap.

## Design references

- [Float Financial Trust Centre](https://trust.floatfinancial.com/): Canadian fintech using Vanta. Reference for the intro card, horizontal sections, compliance sidebar, control cards, resource listings, and searchable controls.
- [Brex Trust Center](https://trust-portal.brex.com/): SafeBase by Drata, confirmed in [Drata's customer story](https://drata.com/customers/brex). Reference for the security-review request, content search, documents, AI/governance topics, and updates.
- [Trovata Trust Center](https://trust.trovata.io/): additional classic Drata fintech reference. Its provider was confirmed; detailed private workflows were not inspected.

No Canadian Drata fintech was confirmed during this research. Float supplies the Canadian reference. This implementation is owned by Amlok and is not a hosted Vanta or Drata instance.

## Content and behavior

`src/content/trust-center.ts` holds the controls, resources, frameworks, FAQs, provider scope, and reference links. Published Amlok website policies and documentation supply the content; another institution's control assertions have not been reused as Amlok facts.

- Seven sections: Overview, Resources, Controls, Subprocessors, FAQ, Updates, and Media.
- Global search; resource collection/category/access filtering; grouped control tables with ten-row pagination; provider search and processing-location fields; and FAQ search with topic filters.
- Section hashes support direct linking and browser history. Tabs support arrow keys, Home, and End.
- Native dialogs support keyboard containment, Escape, and focus return.
- Full/limited access, access recovery, update, question, and issue forms validate fields, prepare an editable request, and offer an email draft or copy action. No request is transmitted by the page. No subscription is activated automatically.
- There is no authenticated report store, NDA execution, approval backend, or continuous-control monitoring integration. Restricted resources have no public file URL.
- The owner confirmed for public release on November 24, 2026 that Amlok holds the listed SOC 2/SOC 3 reports, ISO/IEC 27001/42001 certificates, and applicable PCI validation. This supersedes the earlier local-design assumption. Compliance cards retain their badge-and-name presentation. No auditor, certificate number, report date, or document has been invented; the private evidence was not independently inspected. Provider entries distinguish 11 services across infrastructure, platform billing, financial-data connections, verification, identity, development, domains, scheduling, and documentation. Each entry defines its role and data scope.

## Before production publication

Verify applicable frameworks and supporting evidence; populate approved resources and deployment-specific providers. If direct submissions or gated downloads are required, connect an authenticated approval service and mail delivery before changing the current email-request wording. Keep the indexing restriction until the published content and any certification claims are verified and approved.

## Verification

Production static build and TypeScript passed. Browser checks covered desktop, 768px tablet, and 390px/320px mobile layouts; search/filter behavior; request validation and editing; modal dismissal; and framework details. No horizontal page overflow was observed at mobile widths. The build also reports an existing Next.js security advisory; dependencies were not changed by this task.

## Vanta parity pass

Float's public interface was inspected again on November 24, 2026. Added current and archived report collections; full/limited access and reclaim-access flows; grouped control tables and pagination; provider locations; four overview FAQs; two expandable update previews; and a playable, Amlok-authored platform overview. That pass brought the library to 41 resources, including the provider and FDX additions; the comprehensive review below expands it further. Current/archived entries remain access requests, not fabricated downloadable reports.

The SOC 2 badge artwork is the same public asset observed in Float's Vanta portal: https://assets.vanta.com/static/soc2_badge-BN4BrBoS.webp. It is stored at `public/images/trust/soc2-badge.webp`. ISO/PCI artwork is code-rendered framework artwork. Badges are used for the requested local design assumption and do not establish audit status.

## SOC 3, ISO/IEC 42001, and Canadian model risk guidance

The initial framework extension added SOC 3, ISO/IEC 42001, and OSFI E-23. SOC 3 is a general-use assurance report, with an email request for a copy rather than a restricted-access claim. ISO/IEC 42001 concerns the AI management system; its certificate uses the existing access-request workflow. Neither addition supplies an invented report, auditor, or certificate.

The correct OSFI reference is E-23, not E-32. Its revised 2027 guideline was finalized September 11, 2025 and becomes effective May 1, 2027. The card identifies it as Canadian regulatory guidance and links directly to the official guideline. It does not imply OSFI certification or approval. A corresponding resource and FAQ cover model governance and explainability. The earlier 2017 E-23 is separately published for deposit-taking institutions.

Primary references reviewed November 24, 2026:

- [AICPA SOC 3 general-use report](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-3/)
- [ISO/IEC 42001:2023](https://www.iso.org/standard/42001)
- [OSFI E-23 Model Risk Management (2027)](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027)
- [OSFI final publication letter](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027-letter)

SOC 3 and ISO/IEC 42001 use code-rendered framework artwork. E-23 uses a neutral Canadian guideline tile, not an official certification seal. Assurance badges retain the compact mobile grid; Canadian framework groups use two columns and the open-banking card uses the full width.

## Canadian framework categories

The overview now has 17 cards in four groups:

- Compliance: SOC 2 Type II, SOC 3, ISO/IEC 27001, ISO/IEC 42001, AIUC-1, PCI DSS. The five existing assurance cards retain their “Compliant” subtitle under the local certification-complete design assumption. AIUC-1 uses “Controls alignment” and links to the public framework, without asserting a completed audit.
- Canadian privacy: PIPEDA, Québec Law 25, Alberta PIPA, BC PIPA.
- Financial regulatory frameworks: OSFI E-23, B-10, B-13, Canadian sanctions, FINTRAC / PCMLTFA.
- Open banking: Canada's consumer-driven banking framework and Financial Data Exchange (FDX).

Each new framework opens the existing details dialog and links to the applicable government/regulator guidance. The resource catalog includes category filters for Canadian privacy, financial regulatory frameworks, and open banking. The additions do not create certifications, registrations, accreditation, or regulator approval claims. The neutral Canadian tiles are original framework artwork, not official regulator seals.

The open-banking description reflects Finance Canada's November 20, 2026 implementation update and the Bank of Canada's November accreditation consultation. Review this wording when final regulations or accreditation guidance are published. Provincial privacy coverage and financial regulatory responsibilities remain scoped to applicable activities and institutions. The later provider-alignment pass records the user’s explicit contractual Canada-only processing confirmation, including storage, backups, and support access. This applies to Amlok-related processing, not provider headquarters or independent provider-account activity.

Source URLs are held with their entries in `src/content/trust-center.ts`. Public guidance resources are readable directly; existing confidential report request flows are unchanged.

## AIUC-1

Added an AIUC-1 card to Compliance, a searchable public framework resource, and an FAQ distinguishing agent assurance from an AI management system. The card reuses the existing details dialog and mobile grid. Its original framework artwork is not an official certification seal. “Controls alignment” is a local presentation label, not evidence of an audit or completed control mapping.

AIUC-1 addresses safeguards for scoped AI agents across data and privacy, security, safety, reliability, accountability, and societal risk. Certification involves independent assessment, quarterly technical evaluations, and annual re-certification. No Amlok certificate, evaluator, report, or assessed agent scope has been supplied or invented. Sources: [official framework](https://standard.aiuc-1.com/learn/about), [certification process](https://standard.aiuc-1.com/aiuc-1-certification), [scoping](https://standard.aiuc-1.com/scoping).

## U.S. and Canadian compliance coverage review

Reviewed November 24, 2026 against government, regulator, and framework-owner sources. These are candidates for scope assessment, not findings that Amlok violates a requirement or has satisfied one. The website describes a B2B risk-intelligence platform for underwriting, monitoring, and agent workflows. Actual contracts, data flows, customers, employee counts, registrations, and product functions determine applicability. This review covers relevant additional areas; it is not an exhaustive state-by-state or province-by-province legal inventory.

Only AIUC-1 was added to the portal in this review. The following recommendations remain documented here for review before adding further cards or assertions.

### U.S. priorities

| Area | Applicability and work to assess | Suggested presentation |
| --- | --- | --- |
| [GLBA / FTC Safeguards Rule](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know) | Direct requirements depend on whether activities make Amlok a financial institution covered by the FTC rule. Financial customers also oversee service providers. Assess the security program, risk assessment, access control, encryption, MFA, supplier oversight, incident response, and applicable reporting. | Financial-data safeguards, with entity and service-provider scope explained. |
| [ECOA / Regulation B](https://www.consumerfinance.gov/rules-policy/regulations/1002/2026-07-21/9/) | Creditors' consumer and business lending responsibilities include nondiscrimination and applicable adverse-action explanations. Workflows should preserve the principal reasons actually used, decision evidence, notice rules, and records. Model-generated explanations alone do not establish compliance. | Fair lending and explainability; distinguish the lender's duties from the platform's support. |
| [FCRA](https://www.ftc.gov/legal-library/browse/statutes/fair-credit-reporting-act) | Determine whether Amlok is a consumer reporting agency, furnisher, user, or solely a software provider. Furnishing individual eligibility reports or scores can create duties beyond business-only analytics. Assess permissible purpose, accuracy, disputes, and notices for the applicable role. | Consumer reporting requirements, after role review. |
| [CCPA / CPRA and ADMT regulations](https://www.cppa.ca.gov/regulations/ccpa_updates.html) | Evaluate business thresholds, service-provider/contractor roles, personal information, and specific exemptions. Financial data exemptions do not establish a blanket exemption for every website activity. Assess contractual use restrictions, individual rights, retention, and applicable automated-decision notices, access and opt-out rights. The regulations took effect January 1, 2026; ADMT compliance begins January 1, 2027. | U.S. privacy; California privacy and automated decisions. |
| [Colorado automated decision-making law, SB26-189](https://www.leg.colorado.gov/bills/SB26-189) | Replaced the older SB24-205 provisions. Covered financial/lending decision systems may trigger developer/deployer duties from January 1, 2027, subject to scope and exemptions. Assess technical documentation, intended-use limits, human-review instructions, update notices and recordkeeping. | State AI requirements, with applicable dates and product scope. |
| [NYDFS Part 500 third-party guidance](https://www.dfs.ny.gov/industry-guidance/industry-letters/il20251021-guidance-managing-risks-third-party) | Applies directly to covered entities. Amlok's likely role is a provider handling customer nonpublic information. Prepare evidence and contract terms for access, encryption, third parties, and incident notification. | Customer cybersecurity requirements; no regulator certification claim. |
| [OFAC sanctions](https://ofac.treasury.gov/faqs/11) | Assess U.S. persons, activities, transaction nexus, and program-specific foreign-entity restrictions. Review screening, ownership/control, escalation and applicable blocking/reporting workflows. | U.S. sanctions, separate from Canadian sanctions. |
| [Federal Reserve SR 26-2 model-risk guidance](https://www.federalreserve.gov/frrs/guidance/supervisory-guidance-on-model-risk-management.htm) | Current supervisory guidance replaced SR 11-7 in April 2026. Support applicable bank clients with predictive-model documentation, validation, monitoring and limitations. Generative and agentic AI are explicitly outside its scope. It is guidance, not enforceable certification. | Predictive-model guidance, never a blanket agentic-AI compliance claim. |
| [Interagency third-party risk guidance, SR 23-4](https://www.federalreserve.gov/supervisionreg/srletters/sr2304.htm) | Banks assess planning, diligence, contracts, monitoring and termination of supplier relationships. Supply evidence, service dependencies and exit arrangements relevant to their review. | Bank vendor guidance. |

Additional operational checks: other states' privacy, breach and biometric laws depend on affected residents and processing. [Texas HB149](https://capitol.texas.gov/billlookup/BillSummary.aspx?Bill=HB149&LegSess=89R) requires a separate assessment of prohibited AI uses and discrimination; government/healthcare disclosure rules should not be generalized to every fintech. [DOJ web accessibility guidance](https://www.ada.gov/resources/web-guidance/) and [CAN-SPAM](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) belong in accessibility and communications implementation reviews rather than certification badges.

U.S. open banking requires careful status wording: the [CFPB's personal financial data rights page](https://www.consumerfinance.gov/compliance/compliance-resources/other-applicable-requirements/personal-financial-data-rights/) reports that section 1033 compliance dates were stayed by a court on October 29, 2025. Do not present the original dates as active deadlines.

Borrower communications and funds movement need separate activity checks:

- [FDCPA / Regulation F](https://www.consumerfinance.gov/rules-policy/regulations/1006/2/) applies to covered collection of personal, family or household debt. Business debt and original-creditor servicing are not automatically covered. Assess contact limits, disclosure restrictions, electronic opt-outs, validation and disputes for covered collection workflows.
- [FCC AI-voice ruling](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf): AI-generated human voices fall within artificial/prerecorded voice rules. Review the appropriate consent or exemption, identification and opt-outs before outbound calls. The [October 26, 2026 final rule](https://www.govinfo.gov/content/pkg/FR-2026-10-26/html/2026-21821.htm) updates consent-revocation handling effective November 25, 2026; review the current text before implementing communications preferences.
- [FinCEN MSB scope](https://www.fincen.gov/resources/money-services-business-msb-registration): accepting and transmitting funds/value for others can trigger money-transmission obligations, without a minimum activity threshold. Assess federal BSA/MSB responsibilities and state licensing before enabling funds movement. Pure network support and other exceptions are activity-specific; describing a service as software does not resolve its legal role.

### Canadian priorities

| Area | Applicability and work to assess | Suggested presentation |
| --- | --- | --- |
| [OSFI E-21 operational resilience](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/operational-risk-management-resilience-guideline) | Guidance for federally regulated financial institutions. Support customers with critical dependencies, continuity/recovery evidence, disruption testing and incident management. OSFI's [implementation schedule](https://www.osfi-bsif.gc.ca/en/news/backgrounder-guideline-e-21-operational-risk-resilience) expected full adherence by September 1, 2026. | Operational resilience within financial regulatory frameworks. |
| [CASL](https://crtc.gc.ca/eng/com500/guide.htm) | Applicable commercial emails/SMS need a valid consent basis, sender identification and an unsubscribe mechanism. Record consent and exceptions; B2B messages are not universally exempt. | Commercial messaging law/resource and an operational consent control. |
| [AODA website accessibility](https://www.ontario.ca/page/how-make-websites-accessible) | Ontario public-site WCAG 2.0 AA duties generally cover designated public bodies and businesses/nonprofits with 50+ employees. Other accessibility duties can apply at smaller sizes. The [Accessible Canada Act](https://www.canada.ca/en/employment-social-development/programs/accessible-canada/act-summary.html) covers federally regulated organizations, not every bank vendor automatically. | Accessibility requirements and tested conformance scope. |
| [Provincial consumer reporting](https://www.ontario.ca/laws/statute/90c33) | A priority role assessment if Amlok furnishes consumer credit reports or eligibility scores. Ontario requires registration for covered agencies and imposes purpose, accuracy, access and correction duties. Review each relevant province and distinguish business-only data from individuals' consumer eligibility. | Conditional scope resource until registration and activities are established. |
| [OSFI B-20](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/residential-mortgage-underwriting-practices-procedures-guideline-2017) | Applies to federally regulated institutions' residential mortgage underwriting/acquisition. Assess support for verified identity, repayment capacity, collateral and underwriting controls if that product workflow is in scope. | Mortgage underwriting guidance, only for relevant services. |
| [Retail Payment Activities Act](https://www.bankofcanada.ca/2026/06/criteria-for-registering-payment-service-providers/) | Assess registration and related operational-risk/safeguarding duties if Amlok performs covered payment functions as a non-incidental service. Reading transactions and generating risk signals alone does not establish this trigger. | Internal activity review before a registration or compliance claim. |

Strengthen existing coverage instead of adding duplicate badges:

- [Québec private-sector privacy Act, section 12.1](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1): exclusively automated decisions require notice and applicable information/correction/review mechanisms. Also assess privacy impact assessments for systems and transfers outside Québec.
- [PIPEDA breach guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/privacy-breaches-at-your-business/gd_pb_201810/): document breach assessment, reporting/notification and responsibility between Amlok and the institution; retain records of every breach for the required period. [OPC record guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/privacy-breaches-at-your-business/bir_201920_001/) specifies at least 24 months after determining the breach occurred.
- [Canadian privacy regulators' AI principles](https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/) and [human-rights protections](https://www.ohrc.on.ca/en/policy-discrimination-and-language/relevant-code-provisions): evaluate protected-group harms, data/proxies, oversight and review mechanisms for lending workflows. These are not an AI certification.
- [Bill C-36](https://www.parl.ca/LegisInfo/en/bill/45-1/c-36) is proposed legislation, not an enacted replacement for PIPEDA. The [federal automated-decision directive](https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/automated-decision-making/guide-scope-directive-automated-decision-making.html) does not automatically govern private fintech vendors. [PIPEDA cross-border guidance](https://www.priv.gc.ca/en/privacy-topics/airports-and-borders/gl_dab_090127/) does not impose universal Canada-only hosting.

### Voluntary AI framework and next scope decisions

[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework), including its generative-AI profile, is a useful voluntary complement to ISO/IEC 42001 and AIUC-1. Present it as AI risk management guidance, not a government certification.

Before converting this review into additional status cards, identify the contracted role for each workflow: software provider, decision maker, consumer-report provider/furnisher, payment operator or communications provider. Map the individual/customer jurisdictions, relevant thresholds, processing purposes, and responsibility split. Collect evidence for the actual controls and any registration or assurance claim. Priority candidates for additional portal coverage are GLBA, ECOA/Regulation B, FCRA, CCPA/CPRA, NYDFS, OFAC, OSFI E-21, CASL and NIST AI RMF, with the scoped labels above.

## FDX, Azure, Stripe, and documentation coverage

Updated November 24, 2026. The portal now contains 17 framework cards, 41 resources, 18 controls, 19 FAQs, and 11 provider entries. FDX uses an original neutral tile and the existing framework-detail dialog. Azure and Stripe use the existing local provider-logo assets. Provider cards identify the service role, data involved, processing location, and shared responsibilities.

FDX is Canada's designated technical standards body for consumer-driven banking. Its API standard addresses interoperable, permissioned financial-data sharing. The Canadian profile remains in development. Membership, API implementation, product certification, and regulatory accreditation remain separate matters. Sources: [FDX Canada](https://financialdataexchange.org/fdx-canada/), [Finance Canada implementation update](https://www.canada.ca/en/department-finance/news/2026/11/canada-takes-next-steps-in-implementing-the-consumer-driven-banking-framework.html), and [FDX work streams](https://financialdataexchange.org/about-fdx/work-streams/).

The webapp source confirms Azure Container Apps, PostgreSQL, Blob Storage, Key Vault, operational monitoring, and Azure Communication Services email. Deployment records identify Canada Central for core hosting. This is source-level evidence, not a live infrastructure audit or a guarantee that every provider processes data only in Canada. No Azure OpenAI runtime, mandatory organization-wide MFA, universal private endpoints, active-active recovery, or provider-derived Amlok certification is asserted.

The user confirms Stripe as the platform payment provider. The inspected webapp main checkout and three alternate worktrees contain simulated payment-method handling and disabled Live payment setup, but no verified production Stripe adapter. Public guidance therefore describes Stripe's platform-billing role without inventing Checkout, Elements, Connect, webhook, refund, or card-storage implementation details. Institutional borrower payments remain outside this billing scope.

The local documentation project at `/Users/luistelleria/Documents/ChatGPT/amlok-docs` received updates to 12 security pages and navigation. New pages cover `security/payments-and-pci` and `security/open-banking-and-fdx`. The standards register, Canadian and U.S. applicability guides, AI governance, provider register, platform security, privacy, incident response, and due-diligence guidance explain scope, responsibilities, evidence, and relevant official sources. Internal source references and unresolved implementation questions are recorded in `implementation/trust-center-provider-evidence.md`, which is excluded from publishing.

TypeScript and whitespace checks pass. The changed documentation pages pass frontmatter and local-link checks. Full Mintlify validation reports 28 missing pre-existing Console/Sandbox navigation pages; it reports no security-page errors. The documentation connection is unavailable, so these are local source changes, not a publication. Certification-complete badges remain the previously requested local design assumption and do not constitute evidence of certification.


## Provider and legal alignment, November 24, 2026

The user explicitly confirmed that all Amlok-related provider processing is contractually restricted to Canada, including backups and support access. Public content now states this contractual commitment. Private provider agreements were not supplied or independently reviewed; this source of the statement is retained here for the internal evidence trail. The register does not claim suppliers are headquartered in Canada or that unrelated activity in users’ own Google, Microsoft, GitHub, financial-source, or other provider accounts is covered by Amlok’s agreement.

The register includes Microsoft Azure, Stripe, Flinks, Plaid, Baselayer, Google, Microsoft identity, GitHub, Cloudflare, Cal.com, and Mintlify. GitHub’s identity and software-development roles are separate; identity sign-in does not request repository, mailbox, or document access. Financial-data and verification providers are not a grant to use every provider product. Baselayer source-use restrictions remain relevant. Cloudflare domain management is now explicit. Mintlify public documentation hosting is separate from borrower-record processing.

The read-only source review found no additional hosted analytics, advertising, chat, error-tracking, or model API providers. Open-source packages such as Better Auth and locally served font packages are not treated as hosted subprocessors. Remote institution-logo hosts receive browser requests but are not automatically contracted Amlok processors; the privacy and cookie pages disclose this distinction.

The Terms, Privacy Policy, Cookies Policy, Merchant Connection Terms, and Privacy Requests pages share the same provider scope, Canadian contractual processing statement, account/source distinctions, and support contact. Request preparation, connection withdrawal, account cancellation, refunds, and deletion remain distinct. The website does not transmit Trust Center email drafts or activate a subscription when a user prepares a request.

The FAQ tab now fills the same content width as other tabs, including its search field and accordions. The visible search shortcut indicator was removed, and global search now discovers provider entries directly. Provider search includes service category, relationship, scope, and data categories. The tablet provider-location alignment was also corrected.

### Alignment verification

The website production build and TypeScript checks passed. Browser verification covered 1440px desktop and 390px mobile, full-width FAQ search and accordions, expanded residency and sign-in answers, provider search, global search-to-provider navigation, loaded logo assets, and the revised privacy/cookie sections. No horizontal page overflow or browser errors were observed. Data checks confirmed unique IDs, every framework resource reference, and 160 Trust Center/legal documentation links and policy anchors.

The local documentation update comprises 26 MDX pages, two generator narrative corrections, and an internal evidence record. All changed pages pass the official Mintlify build/validation in an isolated fixture containing their exact applied content and required snippet/assets. At that stage, full-project validation reported 28 pre-existing missing Console/Sandbox navigation targets; the subsequent comprehensive review below recovered those guides and resolved the errors. The production website build displayed an existing Next.js security advisory before the successful retry; dependencies were not modified. The Mintlify connection remains unavailable, and no publication, commit, push, or deployment was performed.


## Comprehensive content and provider-logo review, November 24, 2026

The second review expanded the portal from 18 to 40 controls, 19 to 38 FAQs, and 41 to 46 resources. The 17 framework entries and 11-provider register are retained. The public resource collection now includes detailed identity/access, API/integration-security, operations/resilience, incident-response, and due-diligence guidance. FAQs lead with hosting, access, data use and assurance; a horizontal topic filter and result count keep the longer set navigable.

### Provider artwork

All 11 entries use recognizable provider brand artwork instead of letter monograms or generic infrastructure icons. Azure has its product mark, distinct from Microsoft identity. The assets are self-hosted under `public/images/trust/providers/`; `sources.json` records the official source or distribution source and the corresponding provider reference. Existing Stripe, Flinks and Plaid artwork is preserved. Google, GitHub, Baselayer, Cloudflare, Cal.com and Mintlify use provider-hosted marks; Microsoft's mark comes from the Cal.com integration artwork and Azure's vector from the SVGL distribution, checked against Microsoft's published product icon. No AI-generated logos are used. Standalone vector extraction preserves original paths and colors, and the SVG assets contain no executable content or external references.

Provider-card clicks open the selected provider's details. The last item spans the remaining overview row rather than leaving a gray empty cell.

### Coverage and evidence boundaries

| Review area | Expanded coverage | Evidence still required for an assurance claim |
| --- | --- | --- |
| Identity and access | Invitation authority, MFA enforcement, recovery codes, revocable sessions, role permissions and recent confirmation | Deployed organization policy and periodic access-review records |
| API and connections | Key lifecycle, environment scope, consent withdrawal, signed downloads, upload validation, rate/capacity limits, idempotency and webhook verification | Production configuration, activated connection scope and receiver verification |
| Operations | Audit/activity records, delivery checks, scoped deployment identity, recovery dependencies, incident handling and vulnerability review | Current monitoring/alert ownership, response coverage, penetration-test results and remediation evidence |
| Privacy and exit | Instructed-processing roles, authority, explanation/review requests, representatives, complaints, incidents, holds and backups | Approved retention schedule, private processing agreements and completed request/deletion exercises |
| AI governance | Evidence lineage, intended use, reviewable results, restrictions on unrelated use/training and institutional decision ownership | Workflow-specific validation, model inventory and documented oversight |
| Providers and locality | Role-specific register, Canada-only contracted processing, identity versus financial-data scopes, DNS/domain management | Private provider agreements were owner-confirmed but not independently inspected |

The reviewed infrastructure defaults and deployment notes do not establish high availability, geo-redundant backup, a universal recovery objective, or staffed alert response. Public copy requires service-specific review instead of asserting those outcomes. Prior restore evidence is not treated as proof of an ongoing restore-test schedule. Private certificates, audited reports, organizational policy approvals and completed operational exercises have not been fabricated.

All five legal pages were reviewed again. Added incident communication and Console browser-storage inventories, more detailed instruction/authority and withdrawal rules, provider-change procedures, automated-decision explanations, authorized-representative and complaint routes, and backup/legal-hold treatment. Québec processing outside the province is distinguished from processing outside Canada. Exact retention periods, legal deadlines and notice periods are not invented where they depend on law or contract.

### Website verification

TypeScript, whitespace checks and the production build passed. The build displayed the existing Next.js security advisory before a successful retry; dependencies remain unchanged. Browser verification covered the 1440px desktop and 390px mobile layouts, all 11 locally loaded logos, filtered provider navigation, 38-answer FAQ search/topic filtering/reset, the MFA control, and the new privacy-incident and Console-storage sections. There was no horizontal overflow, visible keyboard shortcut badge, or browser error. Temporary viewport overrides were reset. Screenshot evidence: `/tmp/amlok-trust-official-provider-logos.jpg`.


### Documentation restoration and final validation

Applied 14 public security guides (three new and eleven expanded), Security navigation, and an internal source/evidence review record to the local documentation project. Restored 28 existing authored Console/Sandbox guides and 82 referenced images, videos, and caption assets from `amloktech/docs` commit `b379f8db72d17897797d260cfa02d14cb9beb199`. Every recovered original was verified against its Git blob SHA before targeted Amlok/support wording, local-caption links, and the reviewed support-coordinated cancellation/refund correction. No existing documentation files were overwritten by recovery. Expanded-guide overwrites used original-content SHA guards and local backups.

The complete actual documentation project now passes the official Mintlify build and validation, not only an isolated fixture. The prior 28 missing navigation targets are resolved. Static checks also covered 129 internal links in the expanded guides, 163 references in recovered guides, Trust Center IDs/framework references, and 127 Trust/legal documentation or policy links. All 11 local provider logos loaded in browser checks. Final local notes are in `amlok-docs/implementation/trust-center-security-depth-review.md`; this internal directory remains excluded from publication.

The pricing page offers a shared Slack support channel. The source review did not establish whether it is currently used for customer information. An optional clarification was sent to the owner; Slack was not added as a confirmed provider while that answer remains pending.

No commit, push, documentation publication, website deployment, or change to the webapp's production controls was performed. Documentation coverage is distinct from operational assurance; the review record identifies live-provider/payment verification, retention/deletion operation, incident/restore evidence, and monitoring/response ownership that still need service-specific evidence.

## Brex reference section coverage, November 24, 2026

Compared the public https://trust-portal.brex.com/ structure and owner-supplied screenshots against the local portal. Added a Documents panel with six initial entries, 21 total curated entries, Get access, View more/View less, and navigation to all 54 resources. Added a dedicated Amlok trust whitepaper to the local documentation project and its navigation, plus request entries for SOC 1 scope/report availability, CAIQ, SIG Lite, AI risk management, and penetration-test methodology. Secure product lifecycle and FAQ entries point to the applicable guidance.

All 16 reference topic sections now appear in the overview using Amlok's card styling: Risk Profile, Product Security, Reports, Self-Assessments, Data Security, App Security, AI, Legal, Data Privacy, Access Control, Infrastructure, Endpoint Security, Network Security, Corporate Security, Policies, and Security Grades. The 101 detailed items map to 46 distinct supporting resource entries and existing controls. Azure and Amlok's actual provider boundaries replace reference-company infrastructure. No Brex company-specific claims, reports, insurance coverage, or scores were imported.

Each topic opens a full detail view with a stable `#topic-<id>` URL, browser-history support, related controls, supporting documents, and contextual questions. Global search includes topic items. Restricted resource clicks select the corresponding access-request item. Questions are prepared locally in the existing email-draft flow; opening a topic or preparing a request sends nothing.

Endpoint management, personnel programs, insurance, self-assessments, policy approval, and independent reports require actual supporting evidence. Their detail entries describe concrete review questions and requested materials, not a completed assessment. CryptCheck, ImmuniWeb, and Qualys SSL Labs have official service links and report-review requests; no Amlok grade is assigned and no external scan was initiated.

Validation passed for 16 unique topic IDs, 101 unique item IDs, exactly three valid previews per topic, 21 document references, all mapped control/resource IDs, and all topic documentation paths. TypeScript and the production website build passed. The initial build stopped on the existing Next.js dependency advisory; the retry passed without changing dependencies. The complete actual documentation project passed Mintlify build and validation with the new whitepaper and navigation. Browser checks covered document expansion/collapse, risk details, contextual question prefill, browser back, direct-topic reload, topic search, security-grade links, CAIQ selection in the access dialog, all 11 loaded provider logos, and 1440px/390px layouts without page overflow. No publication, commit, push, or deployment was performed.


## Authorized production release, November 24, 2026

The owner explicitly authorized committing, pushing, and deploying the website, legal pages, Trust Center, and documentation. The owner separately confirmed the listed SOC 2/SOC 3 reports, ISO/IEC 27001/42001 certificates, and applicable PCI validation. Public card labels therefore remain; report and certificate requests identify scope and availability without inventing private evidence or automatically granting access. The security-compliance page now uses the same evidence-request wording.

Updated Next.js from 16.4.3 to the compatible 16.4.6 patch, with only matching Next runtime/build packages changed in the lockfile. This resolves the seven applicable advisory ranges ending at 16.4.4 and removes the earlier first-build security interruption without disabling checks. References: https://nextjs.org/blog/november-2026-security-release and https://github.com/vercel/next.js/releases/tag/v16.4.6.

Release target: amloktech/website main, connected to the website Worker in the Amlok Tech Cloudflare account, serving amlok.io and www.amlok.io. The existing noindex metadata and navigation placement are retained. Documentation publication is coordinated separately against amloktech/docs main, preserving newer remote API/SDK/pricing content.

Release checks on the final source passed: Next.js 16.4.6 production build and TypeScript, all seven status tests, Wrangler dry-run packaging of 1,221 exported assets, and whitespace validation. The existing Cloudflare build trigger was verified as amloktech/website main with `pnpm run build` and `npx wrangler deploy`; no account, domain, variable, or binding changes are required.
