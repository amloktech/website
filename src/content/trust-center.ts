export type TrustCategoryId = 'data-protection' | 'access-identity' | 'governance-privacy' | 'operations-resilience';

export type TrustCategory = {
  id: TrustCategoryId;
  name: string;
  description: string;
};

export type TrustControl = {
  id: string;
  name: string;
  description: string;
  category: TrustCategoryId;
  status: 'Documented' | 'Deployment-specific';
  href: string;
};

export type TrustResource = {
  id: string;
  name: string;
  description: string;
  category: 'Security' | 'Privacy' | 'Legal' | 'Assurance' | 'Self-assessments' | 'Canadian privacy' | 'Financial regulatory frameworks' | 'Open banking';
  collection: 'Security reports' | 'Policies & agreements' | 'Documentation' | 'Archived reports';
  status: 'Public' | 'Restricted';
  access: 'public' | 'restricted';
  href?: string;
  actionLabel?: string;
  format: 'Documentation' | 'Policy' | 'Report' | 'Certificate';
};

export type TrustFrameworkGroupId = 'assurance' | 'canadian-privacy' | 'financial-regulatory' | 'open-banking';

export type TrustFramework = {
  id: string;
  name: string;
  description: string;
  group: TrustFrameworkGroupId;
  category: 'Independent assurance' | 'Information security' | 'Payment security' | 'AI management' | 'Voluntary AI assurance' | 'Canadian regulatory guidance' | 'Canadian privacy law' | 'Canadian sanctions' | 'Canadian AML/ATF framework' | 'Open banking';
  badge: 'soc2' | 'soc3' | 'iso27001' | 'iso42001' | 'aiuc-1' | 'pci-dss' | 'osfi-e23' | 'pipeda' | 'quebec-law25' | 'alberta-pipa' | 'bc-pipa' | 'osfi-b10' | 'osfi-b13' | 'canadian-sanctions' | 'fintrac' | 'consumer-driven-banking' | 'fdx';
  subtitle?: string;
  resourceId: string;
  href: string;
  hrefLabel?: string;
};

export type TrustFaq = {
  id: string;
  name: string;
  description: string;
  category: 'Assurance' | 'Data' | 'Privacy' | 'Operations';
  href?: string;
};

export type TrustSubprocessor = {
  id: string;
  name: string;
  description: string;
  category: 'Infrastructure' | 'Payments' | 'Financial data' | 'Verification' | 'Identity' | 'Identity & development' | 'Website & DNS' | 'Scheduling' | 'Documentation';
  scope: string;
  relationship: string;
  dataCategories: string;
  responsibilities: string;
  location: string;
  status: 'Documented';
  href: string;
  providerHref?: string;
};

export type TrustReference = {
  id: string;
  name: string;
  description: string;
  category: 'Vanta' | 'Drata';
  href: string;
};

const securityDocs = 'https://docs.amlok.io/security';
const aiucStandard = 'https://standard.aiuc-1.com/learn/about';
const aiucCertification = 'https://standard.aiuc-1.com/aiuc-1-certification';
const osfiModelRiskGuideline = 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027';
const pipedaGuidance = 'https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/02_05_d_15/';
const quebecPrivacyGuidance = 'https://www.cai.gouv.qc.ca/protection-renseignements-personnels/sujets-et-domaines-dinteret/principaux-changements-loi-25';
const albertaPrivacyGuidance = 'https://www.alberta.ca/organization-responsibilities-for-protecting-personal-information';
const bcPrivacyGuidance = 'https://oipc.bc.ca/for-private-organizations';
const osfiThirdPartyGuideline = 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/third-party-risk-management-guideline';
const osfiCyberRiskGuideline = 'https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/technology-cyber-risk-management';
const canadianSanctionsGuidance = 'https://www.international.gc.ca/world-monde/international_relations-relations_internationales/sanctions/compliance-program-conformite.aspx?lang=eng';
const fintracGuidance = 'https://fintrac-canafe.canada.ca/re-ed/fin-eng';
const fintracScope = 'https://fintrac-canafe.canada.ca/reporting-declaration/Info/re-ed-eng';
const consumerDrivenBankingFramework = 'https://www.canada.ca/en/department-finance/news/2026/11/canada-takes-next-steps-in-implementing-the-consumer-driven-banking-framework.html';
const consumerDrivenBankingAccreditation = 'https://www.bankofcanada.ca/2026/11/bank-of-canada-launches-consultation-on-draft-supervisory-guidelines-related-to-accreditation/';
const fdxCanada = 'https://financialdataexchange.org/fdx-canada/';

export const trustFrameworkGroups: { id: TrustFrameworkGroupId; name: string }[] = [
  { id: 'assurance', name: 'Compliance' },
  { id: 'canadian-privacy', name: 'Canadian privacy' },
  { id: 'financial-regulatory', name: 'Financial regulatory frameworks' },
  { id: 'open-banking', name: 'Open banking' },
];

export const trustContact = {
  name: 'Amlok Tech Inc.',
  email: 'support@amlok.tech',
  href: 'mailto:support@amlok.tech',
  location: 'Toronto, Canada',
};

export const trustStatusDescription = 'Documented means a topic is addressed in published Amlok policies or documentation. Deployment-specific controls and assurance evidence must be reviewed for the service you intend to use.';

export const trustCategories: TrustCategory[] = [
  { id: 'data-protection', name: 'Data protection', description: 'Processing boundaries, encryption, data location, and retention.' },
  { id: 'access-identity', name: 'Access & identity', description: 'Permissions, tenant boundaries, credentials, and authorized connections.' },
  { id: 'governance-privacy', name: 'Governance & privacy', description: 'Accountable decisions, permitted use, privacy rights, and provider oversight.' },
  { id: 'operations-resilience', name: 'Operations & resilience', description: 'Availability reporting, incident handling, due diligence, and service responsibilities.' },
];

export const trustControls: TrustControl[] = [
  {
    id: 'encryption', name: 'Encryption', category: 'data-protection', status: 'Deployment-specific',
    description: 'The Azure platform configuration requires HTTPS, encrypted managed storage, and verified TLS for production database connections. Review the service configuration, key access, and external-provider boundaries for your deployment.',
    href: `${securityDocs}/platform-security`,
  },
  {
    id: 'data-location', name: 'Processing locations', category: 'data-protection', status: 'Deployment-specific',
    description: 'Amlok-related service processing is contractually restricted to Canada, including storage, backups, and support access. The core platform runs in Azure Canada Central. Provider locations describe Amlok’s contracted arrangements, not provider headquarters or unrelated provider-account activity.',
    href: `${securityDocs}/hosting-and-subprocessors`,
  },
  {
    id: 'retention', name: 'Retention & deletion', category: 'data-protection', status: 'Deployment-specific',
    description: 'Retention schedules depend on record type, authorized purpose, legal obligations, and source-provider requirements. Request the schedule for your service.',
    href: '/privacy',
  },
  {
    id: 'data-minimization', name: 'Purpose-limited collection', category: 'data-protection', status: 'Documented',
    description: 'Connected data is limited to the authorized workflow and permitted source access. Connection authorization does not grant unrestricted rights to reuse data.',
    href: '/connection-terms',
  },
  {
    id: 'scoped-access', name: 'Scoped access', category: 'access-identity', status: 'Deployment-specific',
    description: 'Access is checked against current organization and workspace membership on each protected request. Account, administrative, and integration permissions are scoped separately; the institution controls which authorized users should receive access.',
    href: `${securityDocs}/platform-security`,
  },
  {
    id: 'tenant-separation', name: 'Tenant boundaries', category: 'access-identity', status: 'Deployment-specific',
    description: 'Authorization is scoped to the organization, workspace, and environment. Azure application services use separate runtime database roles, and Sandbox and Live credentials remain separately scoped.',
    href: `${securityDocs}/platform-security`,
  },
  {
    id: 'credential-handling', name: 'Credential handling', category: 'access-identity', status: 'Documented',
    description: 'Use approved secure channels for credentials and sensitive records. Passwords, tokens, and complete financial files should not be sent through ordinary support email.',
    href: '/privacy',
  },
  {
    id: 'connection-authorization', name: 'Connection authorization', category: 'access-identity', status: 'Documented',
    description: 'Connections identify the requested data, receiving institution, and permitted purpose. Withdrawing a connection is distinct from cancellation or deletion.',
    href: '/connection-terms',
  },
  {
    id: 'decision-ownership', name: 'Institution-owned decisions', category: 'governance-privacy', status: 'Documented',
    description: 'Institutions set lending policy, review exceptions, and own consequential decisions. Outputs require appropriate validation and review of evidence gaps.',
    href: '/terms',
  },
  {
    id: 'model-governance', name: 'AI & model governance', category: 'governance-privacy', status: 'Deployment-specific',
    description: 'Define intended use, validate results against representative data, and retain supporting evidence. Review workflow-specific model and processing responsibilities.',
    href: `${securityDocs}/ai-governance`,
  },
  {
    id: 'privacy-rights', name: 'Privacy requests', category: 'governance-privacy', status: 'Documented',
    description: 'Amlok provides a route for access, correction, deletion, and connection-withdrawal requests, with identity and authority checks appropriate to the request.',
    href: '/privacy-requests',
  },
  {
    id: 'provider-oversight', name: 'Service-provider scope', category: 'governance-privacy', status: 'Deployment-specific',
    description: 'Provider oversight covers Azure hosting, Stripe billing, Flinks and Plaid data connections, Baselayer verification, identity services, GitHub delivery, and website services. Review the purpose, data, Canadian processing commitment, and contractual role of each arrangement.',
    href: `${securityDocs}/hosting-and-subprocessors`,
  },
  {
    id: 'payment-data-boundary', name: 'Payment processing scope', category: 'data-protection', status: 'Documented',
    description: 'Stripe is the payment provider for Amlok platform billing. Billing information and service credits are separate from borrower loan funding and repayments. Review the activated payment flow and applicable PCI responsibilities.',
    href: `${securityDocs}/payments-and-pci`,
  },
  {
    id: 'azure-service-identities', name: 'Azure service identities', category: 'access-identity', status: 'Deployment-specific',
    description: 'Managed service identities and Azure Key Vault provide scoped access to runtime secrets. Private Blob containers use identity-based access; the production database has public network access disabled.',
    href: `${securityDocs}/platform-security`,
  },
  {
    id: 'availability', name: 'Public service availability', category: 'operations-resilience', status: 'Documented',
    description: 'The status page checks the public website and documentation. Product APIs, assessments, data connections, and webhooks require environment-specific status information.',
    href: '/status',
  },
  {
    id: 'incident-response', name: 'Incident reporting & escalation', category: 'operations-resilience', status: 'Documented',
    description: 'Report the affected service, impact, time window, and redacted request references through support or the agreed incident channel. Investigation, containment, evidence preservation, and required notices are coordinated with the institution and relevant providers.',
    href: `${securityDocs}/incident-response`,
  },
  {
    id: 'due-diligence', name: 'Security due diligence', category: 'operations-resilience', status: 'Documented',
    description: 'Review scoped assurance, security-testing and remediation evidence, privacy terms, provider arrangements, and recovery responsibilities. Confidential evidence is coordinated under appropriate access terms; requested materials are not automatically downloadable.',
    href: `${securityDocs}/due-diligence`,
  },
  {
    id: 'service-responsibilities', name: 'Service responsibilities', category: 'operations-resilience', status: 'Deployment-specific',
    description: 'The institutional agreement records the contracted service, service levels, escalation contacts, permitted processing, and allocation of responsibilities.',
    href: '/terms',
  },
  {"id": "secure-document-access", "name": "Protected document access", "category": "data-protection", "status": "Deployment-specific", "description": "Documents are stored in private Azure Blob containers. Downloads use expiring signed links and recheck the current API key, permissions, environment, and document authorization before returning a file.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "upload-validation", "name": "Document intake validation", "category": "data-protection", "status": "Documented", "description": "File intake enforces configured size, count, document-type and MIME-type limits, normalizes filenames, and records a content hash. File validation is separate from any service-specific malware-scanning or content-review evidence.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "historical-records", "name": "Evidence and record history", "category": "data-protection", "status": "Documented", "description": "Product results, financial records, and audit events preserve history. Expiry of a temporary download, export, or response cache does not automatically delete the underlying evidence or satisfy a privacy-erasure request.", "href": "https://docs.amlok.io/security/privacy"},
  {"id": "consent-withdrawal", "name": "Connection withdrawal", "category": "data-protection", "status": "Documented", "description": "Withdrawing source consent stops further authorized access and places affected active workflows into a state requiring review or fresh authorization. Previously collected records follow the applicable retention and deletion process.", "href": "https://docs.amlok.io/security/open-banking-and-fdx"},
  {"id": "invitation-access", "name": "Invitation-based onboarding", "category": "access-identity", "status": "Documented", "description": "New Console accounts require an authorized invitation. Acceptance checks the intended email, current invitation status, expiry, and inviter authority before granting the selected workspace access.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "social-authentication", "name": "Identity-provider sign-in", "category": "access-identity", "status": "Documented", "description": "Google, Microsoft, and GitHub sign-in use basic identity and email information. Provider tokens are discarded after identity resolution; sign-in does not grant access to mailboxes, repositories, or connected financial accounts.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "multi-factor-authentication", "name": "Multi-factor authentication", "category": "access-identity", "status": "Deployment-specific", "description": "Authenticator-based MFA and single-use recovery codes protect enrolled accounts. An organization can require MFA for workspace access. MFA is not mandatory for every organization by default.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "session-security", "name": "Session protection and revocation", "category": "access-identity", "status": "Documented", "description": "Console sessions are server-side and revocable. Production cookies use Secure, HttpOnly, and SameSite protections. Password reset revokes sessions; sensitive account actions require recent identity confirmation.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "role-based-access", "name": "Role-based permissions", "category": "access-identity", "status": "Documented", "description": "Owner, Dev, and Analyst permissions are evaluated server-side against current membership. Administration, billing, developer tools, and product-data access have different permissions; choosing a workspace in the browser does not grant access.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "api-key-lifecycle", "name": "API key lifecycle", "category": "access-identity", "status": "Documented", "description": "API keys are generated randomly, displayed once, and stored as hashes. Requests check expiry, revocation, scopes, current authority, workspace environment, and product access. Rotation uses a replacement key followed by revocation of the old key.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "environment-isolation", "name": "Sandbox and Live separation", "category": "access-identity", "status": "Documented", "description": "Sandbox and Live use separately scoped credentials, records, webhooks, product access, and credit ledgers. Sandbox examples do not establish live provider connectivity, and Live access requires activation for the workspace.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "request-origin", "name": "Browser request boundaries", "category": "access-identity", "status": "Documented", "description": "Protected Console mutations require the configured origin and a valid session. Authentication callbacks and redirects are constrained; browser-supplied scopes or destinations cannot expand the server-authorized sign-in flow.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "evidence-lineage", "name": "Source and result traceability", "category": "governance-privacy", "status": "Documented", "description": "Risk outputs distinguish source evidence, observations, calculations, and interpretations. Versioned records, source references, missing-data explanations, and workflow context support institutional review of the result.", "href": "https://docs.amlok.io/security/ai-governance"},
  {"id": "ai-use-boundaries", "name": "AI use and human oversight", "category": "governance-privacy", "status": "Documented", "description": "Institutions define the authorized use and decision process. Connection consent is not permission for unrestricted model training or unrelated use. Model limitations, output quality, tool permissions, and review requirements belong to the assessed workflow.", "href": "https://docs.amlok.io/security/ai-governance"},
  {"id": "assurance-evidence", "name": "Assurance scope and evidence", "category": "governance-privacy", "status": "Documented", "description": "Framework coverage, provider reports, Amlok-specific assurance, and customer obligations are reviewed separately. Confidential materials require appropriate access terms, and each report applies only to its stated service and period.", "href": "https://docs.amlok.io/security/due-diligence"},
  {"id": "audit-activity", "name": "Audit and activity records", "category": "operations-resilience", "status": "Documented", "description": "Account and administrative changes record the actor, action, target, time, and request reference. API activity records technical outcomes without logging raw request bodies or credentials. Review retention and authorized access for the applicable records.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  {"id": "api-capacity", "name": "API validation and capacity limits", "category": "operations-resilience", "status": "Documented", "description": "APIs validate inputs and enforce configured request, upload, concurrency, and queue limits. Rate-limit and capacity responses identify retry conditions so integrations can back off rather than repeat requests without limits.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "command-recovery", "name": "Idempotency and request recovery", "category": "operations-resilience", "status": "Documented", "description": "Supported commands use environment-scoped idempotency keys and durable receipts. A repeated key with a different request is rejected; retrieval and replay remain subject to current permissions and the documented recovery window.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "webhook-security", "name": "Webhook delivery protections", "category": "operations-resilience", "status": "Documented", "description": "Webhook events are timestamped and signed. Delivery restricts HTTPS destinations and resolved network addresses, rejects redirects, and uses bounded retries. Receiving institutions verify signatures, prevent replay, and process duplicate events safely.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "software-delivery", "name": "Controlled software delivery", "category": "operations-resilience", "status": "Documented", "description": "GitHub tracks source changes and runs application, database, API, and browser checks. Release workflows use scoped deployment identity to publish to Azure. Staging and production configuration and credentials are kept separate.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  {"id": "backup-recovery", "name": "Backup and recovery", "category": "operations-resilience", "status": "Deployment-specific", "description": "Azure database backup and storage-recovery settings support the documented recovery process within Canada. Review the current backup coverage, restore evidence, dependencies, and agreed recovery objectives for your service.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  {"id": "monitoring-escalation", "name": "Operational monitoring", "category": "operations-resilience", "status": "Deployment-specific", "description": "Readiness checks, worker heartbeats, delivery results, queue age, and Azure operational logs support investigation. Alert routing, response coverage, escalation contacts, and service objectives are reviewed for the contracted deployment.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
];

// The owner confirmed these assurance reports, certifications, and PCI validation for publication on November 24, 2026.
// Restricted entries intentionally have no file URLs, audit dates, issuers, or invented reports.
export const trustResources: TrustResource[] = [
  { id: 'trust-whitepaper', name: 'Amlok Trust Whitepaper', description: 'A comprehensive guide to service boundaries, Canadian processing, provider roles, access controls, AI governance, privacy, and institutional responsibilities.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/trust-whitepaper` },
  { id: 'security-faqs', name: 'Security FAQs', description: 'Answers covering hosting, identity, data use, privacy, operational responsibilities, and assurance reviews.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: '/trust#faq' },
  { id: 'soc1-review', name: 'SOC 1 scope & report availability', description: 'Ask whether a SOC 1 report is available for the entity and services relevant to your financial-reporting review. This entry does not represent an issued audit opinion.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'caiq', name: 'CAIQ', description: 'Request the availability and scope of a Consensus Assessments Initiative Questionnaire response, including version, service boundary, and supporting evidence.', category: 'Self-assessments', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'sig-lite', name: 'SIG Lite', description: 'Coordinate a SIG Lite questionnaire review for your intended service. Confirm questionnaire version, response ownership, evidence, and exceptions.', category: 'Self-assessments', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'ai-risk-assessment', name: 'AI risk management review', description: 'Request workflow-specific risk assessment, model inventory, validation, explanation, oversight, and change-control evidence.', category: 'Security', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'penetration-test-methodology', name: 'Penetration test methodology', description: 'Request authorized testing boundaries, assessment approach, coverage, severity criteria, remediation, and retest procedures for the applicable service.', category: 'Security', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Documentation' },
  { id: 'secure-product-lifecycle', name: 'Secure product lifecycle', description: 'Software review, release checks, deployment identity, vulnerability management, and evidence to assess the delivery lifecycle.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/operations-and-resilience` },
  {"id": "identity-and-access", "name": "Identity and access controls", "description": "Console sign-in, MFA, sessions, invitations, roles, and sensitive-action protections.", "category": "Security", "collection": "Documentation", "status": "Public", "access": "public", "format": "Documentation", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "api-integration-security", "name": "API and integration security", "description": "Key lifecycle, environment boundaries, protected files, request validation, idempotency, and webhook delivery.", "category": "Security", "collection": "Documentation", "status": "Public", "access": "public", "format": "Documentation", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "operations-resilience", "name": "Operations and resilience", "description": "Audit records, software delivery, backups, recovery, monitoring, and operational responsibilities.", "category": "Security", "collection": "Documentation", "status": "Public", "access": "public", "format": "Documentation", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  {"id": "incident-response-guide", "name": "Incident response guidance", "description": "Reporting, investigation, containment, provider coordination, evidence, and notification responsibilities.", "category": "Security", "collection": "Documentation", "status": "Public", "access": "public", "format": "Documentation", "href": "https://docs.amlok.io/security/incident-response"},
  {"id": "security-review-guide", "name": "Security due-diligence guide", "description": "How to assess control evidence, security testing, provider scope, assurance materials, and deployment responsibilities.", "category": "Security", "collection": "Documentation", "status": "Public", "access": "public", "format": "Documentation", "href": "https://docs.amlok.io/security/due-diligence"},
  { id: 'security-overview', name: 'Security overview', description: 'An introduction to Amlok’s security approach and deployment review.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/overview` },
  { id: 'platform-security', name: 'Platform security', description: 'Review security boundaries and the controls relevant to your service.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/platform-security` },
  { id: 'privacy-policy', name: 'Privacy Policy', description: 'Information handling, service providers, processing locations, retention, and your rights.', category: 'Privacy', collection: 'Policies & agreements', status: 'Public', access: 'public', format: 'Policy', href: '/privacy' },
  { id: 'cookie-policy', name: 'Cookies Policy', description: 'How the website uses browser storage and optional third-party features.', category: 'Privacy', collection: 'Policies & agreements', status: 'Public', access: 'public', format: 'Policy', href: '/cookies' },
  { id: 'terms', name: 'Terms and Conditions', description: 'Website use, institutional responsibilities, and the role of service agreements.', category: 'Legal', collection: 'Policies & agreements', status: 'Public', access: 'public', format: 'Policy', href: '/terms' },
  { id: 'connection-terms', name: 'Merchant Connection Terms', description: 'Source permissions, receiving institutions, permitted use, and connection responsibilities.', category: 'Legal', collection: 'Policies & agreements', status: 'Public', access: 'public', format: 'Policy', href: '/connection-terms' },
  { id: 'privacy-requests', name: 'Privacy requests', description: 'How to request access, correction, deletion, or withdrawal of a connection.', category: 'Privacy', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: '/privacy-requests' },
  { id: 'ai-governance', name: 'AI & model governance', description: 'Intended use, validation, supporting evidence, and accountable decisions.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/ai-governance` },
  { id: 'aiuc-1-standard', name: 'AIUC-1: AI agent assurance framework', description: 'The official standard covers data and privacy, security, safety, reliability, accountability, and societal risk for AI agents. Explore the controls and system-specific assessment scope.', category: 'Assurance', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: aiucStandard, actionLabel: 'Explore AIUC-1' },
  { id: 'standards-register', name: 'Standards and framework guide', description: 'Assurance, AI governance, privacy, financial-sector guidance, and open-banking standards with their scope and supporting evidence.', category: 'Assurance', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/standards` },
  { id: 'hosting-and-providers', name: 'Azure hosting and service providers', description: 'Microsoft Azure platform services, Canada Central hosting, Stripe billing, website providers, and shared responsibilities.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/hosting-and-subprocessors` },
  { id: 'stripe-payment-scope', name: 'Stripe payments and PCI scope', description: 'Platform billing, payment-data boundaries, institutional responsibilities, and payment security review.', category: 'Security', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/payments-and-pci` },
  { id: 'fdx-standard', name: 'Financial Data Exchange (FDX)', description: 'Permissioned financial data sharing, the Canadian technical standard, consent, and connection responsibilities.', category: 'Open banking', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: fdxCanada, actionLabel: 'Explore FDX Canada' },
  { id: 'open-banking-fdx-guide', name: 'Open banking and FDX guide', description: 'How to review data-sharing standards, consent and revocation, supported connections, and Canadian participation requirements.', category: 'Open banking', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/open-banking-and-fdx` },
  { id: 'pipeda-guidance', name: 'PIPEDA: federal privacy framework', description: 'The federal privacy regulator explains Canada’s private-sector privacy laws, provincial coverage, and cross-border commercial processing.', category: 'Canadian privacy', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: pipedaGuidance, actionLabel: 'Read privacy guidance' },
  { id: 'quebec-law25-guidance', name: 'Québec Law 25: privacy requirements', description: 'Québec’s privacy regulator explains governance, privacy impact assessments, transfers outside Québec, and automated-decision requirements.', category: 'Canadian privacy', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: quebecPrivacyGuidance, actionLabel: 'Read Québec guidance' },
  { id: 'alberta-pipa-guidance', name: 'Alberta PIPA: organization responsibilities', description: 'Alberta’s guidance on safeguards, retention, privacy practices, and service providers outside Canada.', category: 'Canadian privacy', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: albertaPrivacyGuidance, actionLabel: 'Read Alberta guidance' },
  { id: 'bc-pipa-guidance', name: 'BC PIPA: private-sector privacy', description: 'The British Columbia privacy regulator’s resources for private organizations, including privacy management and cloud processing.', category: 'Canadian privacy', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: bcPrivacyGuidance, actionLabel: 'Read BC guidance' },
  { id: 'osfi-e23-guideline', name: 'OSFI E-23: Model Risk Management', description: 'Canadian supervisory guidance covering model governance, validation, monitoring, and explainability. The revised guideline takes effect May 1, 2027.', category: 'Financial regulatory frameworks', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: osfiModelRiskGuideline, actionLabel: 'Read OSFI guideline' },
  { id: 'osfi-b10-guideline', name: 'OSFI B-10: Third-Party Risk Management', description: 'OSFI’s expectations for regulated institutions’ third-party arrangements, due diligence, subcontractors, data protection, continuity, and exit planning.', category: 'Financial regulatory frameworks', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: osfiThirdPartyGuideline, actionLabel: 'Read OSFI guideline' },
  { id: 'osfi-b13-guideline', name: 'OSFI B-13: Technology and Cyber Risk Management', description: 'OSFI’s supervisory expectations for technology governance, operations, resilience, and cyber security at federally regulated financial institutions.', category: 'Financial regulatory frameworks', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: osfiCyberRiskGuideline, actionLabel: 'Read OSFI guideline' },
  { id: 'canadian-sanctions-guidance', name: 'Canadian sanctions: compliance programs', description: 'Global Affairs Canada’s guidance on risk assessment, screening, ownership checks, monitoring, and sanctions compliance programs.', category: 'Financial regulatory frameworks', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: canadianSanctionsGuidance, actionLabel: 'Read sanctions guidance' },
  { id: 'fintrac-guidance', name: 'FINTRAC: financial-entity requirements', description: 'FINTRAC’s guidance for financial entities on applicable anti-money laundering and anti-terrorist financing obligations.', category: 'Financial regulatory frameworks', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: fintracGuidance, actionLabel: 'Read FINTRAC guidance' },
  { id: 'consumer-driven-banking-framework', name: 'Canada’s consumer-driven banking framework', description: 'Finance Canada’s implementation update covering proposed regulations, Bank of Canada oversight, and technical standards.', category: 'Open banking', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: consumerDrivenBankingFramework, actionLabel: 'Read framework update' },
  { id: 'consumer-driven-banking-accreditation', name: 'Consumer-driven banking: draft accreditation guidance', description: 'Bank of Canada consultation on draft supervisory guidelines for accreditation under the developing framework.', category: 'Open banking', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: consumerDrivenBankingAccreditation, actionLabel: 'View draft accreditation guidance' },
  { id: 'provider-information', name: 'Hosting & subprocessors', description: 'Review provider information and request the register for your deployment.', category: 'Privacy', collection: 'Documentation', status: 'Public', access: 'public', format: 'Documentation', href: `${securityDocs}/hosting-and-subprocessors` },
  { id: 'soc2-report', name: 'SOC 2 Type II report', description: 'Request available SOC 2 materials and confirm the assessed entity, covered services, reporting period, and distribution terms.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'soc3-report', name: 'SOC 3 report', description: 'Ask about the availability and scope of a SOC 3 general-use report, including its entity, covered system, criteria, and reporting period.', category: 'Assurance', collection: 'Security reports', status: 'Public', access: 'public', format: 'Report', href: 'mailto:support@amlok.tech?subject=SOC%203%20report%20request&body=Please%20confirm%20the%20availability%20and%20scope%20of%20an%20Amlok%20SOC%203%20general-use%20report.', actionLabel: 'Ask about availability' },
  { id: 'iso-certificate', name: 'ISO/IEC 27001 certificate', description: 'Request available certification evidence and confirm the holder, information security management scope, issuer, and validity period.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Certificate' },
  { id: 'iso42001-certificate', name: 'ISO/IEC 42001 certificate', description: 'Request available AI management system certification evidence and confirm the holder, covered AI systems, issuer, and validity period.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Certificate' },
  { id: 'penetration-test', name: 'Penetration test summary', description: 'Request available assessment summaries and confirm the tested surfaces, date, findings, remediation, and retest evidence.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'pci-aoc', name: 'PCI DSS Attestation of Compliance', description: 'Request applicable attestation materials and confirm the covered entity, payment-data scope, and validation responsibilities.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'pci-saq-d', name: 'PCI DSS SAQ D', description: 'Ask which payment-security self-assessment applies to the activated service and request available responses and supporting evidence.', category: 'Self-assessments', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Documentation' },
  { id: 'soc2-bridge-letter', name: 'SOC 2 bridge letter', description: 'Request available subsequent-change information for the interval after an applicable assurance reporting period.', category: 'Assurance', collection: 'Security reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'prior-period-assurance', name: 'Prior-period assurance materials', description: 'Ask which earlier assurance materials are available for comparative and historical due diligence.', category: 'Assurance', collection: 'Archived reports', status: 'Restricted', access: 'restricted', format: 'Report' },
  { id: 'security-questionnaire', name: 'Security questionnaire', description: 'A structured overview of security controls and service responsibilities.', category: 'Self-assessments', collection: 'Documentation', status: 'Restricted', access: 'restricted', format: 'Documentation' },
  { id: 'platform-architecture', name: 'Platform architecture', description: 'Service components, data flows, and trust boundaries.', category: 'Security', collection: 'Documentation', status: 'Restricted', access: 'restricted', format: 'Documentation' },
  { id: 'business-continuity', name: 'Business continuity & disaster recovery', description: 'Continuity planning, recovery responsibilities, and critical service dependencies.', category: 'Security', collection: 'Policies & agreements', status: 'Restricted', access: 'restricted', format: 'Policy' },
  { id: 'incident-response-plan', name: 'Incident response plan', description: 'Incident classification, response responsibilities, communications, and escalation.', category: 'Security', collection: 'Policies & agreements', status: 'Restricted', access: 'restricted', format: 'Policy' },
  { id: 'data-processing-agreement', name: 'Data Processing Agreement', description: 'Processing instructions, responsibilities, safeguards, and contractual commitments.', category: 'Legal', collection: 'Policies & agreements', status: 'Restricted', access: 'restricted', format: 'Policy' },
  { id: 'institutional-subprocessor-register', name: 'Institutional subprocessor register', description: 'Service providers, processing purposes, and locations for your deployment.', category: 'Privacy', collection: 'Documentation', status: 'Restricted', access: 'restricted', format: 'Documentation' },
];

export const trustFrameworks: TrustFramework[] = [
  { id: 'soc2', name: 'SOC 2 Type II', subtitle: 'Compliant', group: 'assurance', category: 'Independent assurance', badge: 'soc2', resourceId: 'soc2-report', description: 'Review audit scope, control coverage, and the reporting period relevant to your assessment.', href: `${securityDocs}/standards` },
  { id: 'soc3', name: 'SOC 3', subtitle: 'Compliant', group: 'assurance', category: 'Independent assurance', badge: 'soc3', resourceId: 'soc3-report', description: 'A general-use assurance report covering the applicable Trust Services Criteria. SOC 3 provides less detail than SOC 2 and is designed for public distribution.', href: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-3/' },
  { id: 'iso27001', name: 'ISO/IEC 27001', subtitle: 'Compliant', group: 'assurance', category: 'Information security', badge: 'iso27001', resourceId: 'iso-certificate', description: 'Review the information security management scope and supporting certification materials.', href: `${securityDocs}/standards` },
  { id: 'iso42001', name: 'ISO/IEC 42001', subtitle: 'Compliant', group: 'assurance', category: 'AI management', badge: 'iso42001', resourceId: 'iso42001-certificate', description: 'ISO/IEC 42001:2023 defines requirements for an AI management system, including governance, accountability, risk management, and continual improvement. Review the certification scope and supporting materials.', href: 'https://www.iso.org/standard/42001' },
  { id: 'aiuc-1', name: 'AIUC-1', subtitle: 'Controls alignment', group: 'assurance', category: 'Voluntary AI assurance', badge: 'aiuc-1', resourceId: 'aiuc-1-standard', description: 'AIUC-1 is a voluntary standard for AI agent security, safety, and reliability. Its six domains cover data and privacy, security, safety, reliability, accountability, and societal risk. Relevant controls address prompt injection, sensitive-data exposure, unsafe tool use, output reliability, human oversight, and incident handling. Certification is scoped to specific agents and requires independent assessment, quarterly technical evaluations, and annual re-certification.', href: aiucCertification, hrefLabel: 'How AIUC-1 certification works' },
  { id: 'pci-dss', name: 'PCI DSS', subtitle: 'Compliant', group: 'assurance', category: 'Payment security', badge: 'pci-dss', resourceId: 'pci-aoc', description: 'Stripe is the payment provider for Amlok platform billing. PCI DSS scope depends on the actual collection, transmission, storage, and administration of payment data. Review the applicable integration, Amlok responsibilities, and supporting validation materials separately from Stripe’s own assurance.', href: `${securityDocs}/payments-and-pci`, hrefLabel: 'Payment processing and PCI scope' },
  { id: 'pipeda', name: 'PIPEDA', subtitle: 'Federal privacy law', group: 'canadian-privacy', category: 'Canadian privacy law', badge: 'pipeda', resourceId: 'pipeda-guidance', description: 'The Personal Information Protection and Electronic Documents Act governs personal information handled in commercial activities within its scope, including interprovincial and international processing. Provincial privacy laws may govern activities within certain provinces. Review the applicable processing roles, purposes, safeguards, and individual rights for your Amlok service.', href: '/privacy', hrefLabel: 'Amlok Privacy Policy' },
  { id: 'quebec-law25', name: 'Québec Law 25', subtitle: 'Québec privacy law', group: 'canadian-privacy', category: 'Canadian privacy law', badge: 'quebec-law25', resourceId: 'quebec-law25-guidance', description: 'Law 25 modernized Québec’s privacy laws, including the Act respecting the protection of personal information in the private sector. Where applicable, requirements cover privacy governance, impact assessments, transfers outside Québec, and transparency and review for exclusively automated decisions. Review these requirements against the processing and decision-making roles in your deployment.', href: '/privacy', hrefLabel: 'Amlok Privacy Policy' },
  { id: 'alberta-pipa', name: 'Alberta PIPA', subtitle: 'Alberta privacy law', group: 'canadian-privacy', category: 'Canadian privacy law', badge: 'alberta-pipa', resourceId: 'alberta-pipa-guidance', description: 'Alberta’s Personal Information Protection Act regulates private-sector personal information within its scope. Relevant obligations include reasonable safeguards, retention, privacy practices, and transparency about service providers outside Canada. Applicability depends on the organization and processing activities; cross-border commercial processing may also engage PIPEDA.', href: '/privacy', hrefLabel: 'Amlok Privacy Policy' },
  { id: 'bc-pipa', name: 'BC PIPA', subtitle: 'BC privacy law', group: 'canadian-privacy', category: 'Canadian privacy law', badge: 'bc-pipa', resourceId: 'bc-pipa-guidance', description: 'British Columbia’s Personal Information Protection Act governs private organizations, including credit unions, within its scope. Review accountability, appropriate collection and use, safeguards, and individual rights for the relevant processing. It is distinct from BC’s public-sector privacy law, and PIPEDA may also apply to cross-border commercial processing.', href: '/privacy', hrefLabel: 'Amlok Privacy Policy' },
  { id: 'osfi-e23', name: 'OSFI E-23', subtitle: 'Model risk guidance', group: 'financial-regulatory', category: 'Canadian regulatory guidance', badge: 'osfi-e23', resourceId: 'osfi-e23-guideline', description: 'OSFI’s revised Model Risk Management guideline addresses model governance, independent review, monitoring, and explainability, including AI and machine learning. It applies to federally regulated financial institutions from May 1, 2027. Review the model documentation, validation evidence, and responsibilities applicable to your institution.', href: `${securityDocs}/ai-governance`, hrefLabel: 'Amlok AI & model governance' },
  { id: 'osfi-b10', name: 'OSFI B-10', subtitle: 'Third-party risk guidance', group: 'financial-regulatory', category: 'Canadian regulatory guidance', badge: 'osfi-b10', resourceId: 'osfi-b10-guideline', description: 'OSFI’s Third-Party Risk Management guideline sets expectations for federally regulated financial institutions and their third-party arrangements. It addresses due diligence, subcontractors, information rights, data security, continuity, and exit planning. Amlok’s deployment documentation supports customer reviews; the institution remains accountable for its obligations. Review the controls and contractual commitments relevant to your arrangement.', href: `${securityDocs}/hosting-and-subprocessors`, hrefLabel: 'Amlok hosting & subprocessors' },
  { id: 'osfi-b13', name: 'OSFI B-13', subtitle: 'Technology & cyber risk', group: 'financial-regulatory', category: 'Canadian regulatory guidance', badge: 'osfi-b13', resourceId: 'osfi-b13-guideline', description: 'OSFI’s Technology and Cyber Risk Management guideline addresses governance, technology operations, resilience, and cyber security for federally regulated financial institutions. Customer reviews can use Amlok’s security documentation to assess relevant service responsibilities and controls. Applicability depends on the institution and arrangement.', href: `${securityDocs}/platform-security`, hrefLabel: 'Amlok platform security' },
  { id: 'canadian-sanctions', name: 'Canadian sanctions', subtitle: 'Sanctions requirements', group: 'financial-regulatory', category: 'Canadian sanctions', badge: 'canadian-sanctions', resourceId: 'canadian-sanctions-guidance', description: 'Canadian sanctions obligations depend on the applicable laws, regulations, parties, and activities. Global Affairs Canada’s guidance addresses risk assessment, screening, ownership and control, and ongoing monitoring. Screening results support review but do not establish that a transaction is permitted. Review applicable restrictions and supporting evidence before deciding how to proceed.', href: 'https://www.international.gc.ca/world-monde/international_relations-relations_internationales/sanctions/faq.aspx?lang=eng', hrefLabel: 'View Canadian sanctions FAQs' },
  { id: 'fintrac', name: 'FINTRAC', subtitle: 'AML/ATF framework', group: 'financial-regulatory', category: 'Canadian AML/ATF framework', badge: 'fintrac', resourceId: 'fintrac-guidance', description: 'The Proceeds of Crime (Money Laundering) and Terrorist Financing Act and its regulations establish obligations for covered reporting entities. FINTRAC guidance helps those entities assess requirements such as identification, records, monitoring, and reporting. Review the entity type, activities, and responsibilities associated with your Amlok workflow.', href: fintracScope, hrefLabel: 'Who must report to FINTRAC' },
  { id: 'consumer-driven-banking', name: 'Consumer-driven banking', subtitle: 'Canadian open banking', group: 'open-banking', category: 'Open banking', badge: 'consumer-driven-banking', resourceId: 'consumer-driven-banking-framework', description: 'Canada’s consumer-driven banking framework is being implemented under Bank of Canada oversight. Regulations remain proposed, and accreditation guidance is in draft consultation. Participation, permissions, and technical requirements depend on the final framework and each participant’s status. Confirm provider participation, available connections, and consent requirements for your intended workflow.', href: consumerDrivenBankingAccreditation, hrefLabel: 'View draft accreditation guidance' },
  { id: 'fdx', name: 'Financial Data Exchange', subtitle: 'FDX data-sharing standard', group: 'open-banking', category: 'Open banking', badge: 'fdx', resourceId: 'fdx-standard', description: 'Financial Data Exchange maintains an interoperable API standard for user-permissioned financial data sharing. It covers common data formats, secure communication, authorization, and consent management. FDX, through its Canada Council, is Canada’s designated technical standards body; the Canadian profile is still being finalized. Review the API version, security profile, permissions, and provider responsibilities for each connection. Technical alignment, membership, product certification, and regulatory accreditation are distinct.', href: `${securityDocs}/open-banking-and-fdx`, hrefLabel: 'Amlok open-banking guide' },
];

export const trustFaqs: TrustFaq[] = [
  { id: 'data-residency', name: 'Where is the Amlok platform hosted?', category: 'Data', description: 'Amlok’s institutional platform runs on Microsoft Azure in Canada Central. Amlok-related provider processing is contractually restricted to Canada, including storage, backups, and support access. This describes the contracted service arrangement, not provider headquarters or unrelated activity in a user’s own provider account. Customer-directed exports and destinations are reviewed separately.', href: `${securityDocs}/hosting-and-subprocessors` },
  { id: 'providers', name: 'Which service providers handle information?', category: 'Data', description: 'Microsoft Azure hosts the platform; Stripe supports billing; Flinks and Plaid support authorized financial-data connections; Baselayer supports business verification. Google, Microsoft, and GitHub support sign-in, with GitHub also used for source versioning and software delivery. Cloudflare supports the website, domain management, and DNS; Cal.com supports booking; Mintlify hosts public documentation. Each provider receives information for its defined purpose, not every customer record.', href: `${securityDocs}/hosting-and-subprocessors` },
  { id: 'provider-roles', name: 'Does every listed provider process borrower information?', category: 'Data', description: 'No. Azure supports the institutional platform; authorized data and verification providers handle their selected workflows. Billing, sign-in, source versioning, domain management, documentation, and scheduling have separate purposes. Some providers also act independently under their own terms. Review each entry’s service relationship and data involved for the relevant processing.', href: `${securityDocs}/hosting-and-subprocessors` },
  {"id": "document-protection", "name": "Are uploaded documents and exports public?", "category": "Data", "description": "No. Artifacts are held in private Azure storage. Authorized downloads use expiring links and recheck the current credential, permissions, environment, and source authorization before returning content. Institutions must protect files after downloading them and manage onward sharing under their own responsibilities.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "mfa-policy", "name": "Can my organization require multi-factor authentication?", "category": "Operations", "description": "Yes. Organizations can require authenticator-based MFA before a member accesses a workspace. Enrolled accounts complete MFA on password and social sign-in, using an authenticator or an unused recovery code. MFA is optional by default unless the organization requires it.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "session-management", "name": "How are sessions and sensitive actions protected?", "category": "Operations", "description": "Production sessions use Secure, HttpOnly, SameSite cookies and server-side records that can be revoked. The configured rolling session lifetime is seven days; sensitive actions require identity confirmation within five minutes. Password reset invalidates existing sessions. Account security lets you review and revoke sessions.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "workspace-roles", "name": "How do Owner, Dev, and Analyst permissions differ?", "category": "Operations", "description": "Roles separate administration, billing, developer tools, and review of product information. Owner manages permitted organization and billing functions; Dev has authorized integration tools; Analyst focuses on permitted product evidence and reporting. The server checks current membership and the requested action, including workspace-specific restrictions.", "href": "https://docs.amlok.io/security/identity-and-access"},
  { id: 'model-training', name: 'Does connecting data authorize model training or unrelated use?', category: 'Privacy', description: 'No. Connection authorization does not grant unrestricted rights to train models, sell data, use it for unrelated advertising, or create unrelated products. Any separate use must satisfy applicable law, source-provider conditions, and required authorization.', href: '/terms' },
  {"id": "ai-decision-accountability", "name": "Does Amlok make the institution’s lending decision?", "category": "Data", "description": "The institution owns credit policy, consequential decisions, and borrower communications. Amlok supplies the authorized assessment, evidence, and monitoring outputs. Review source coverage, calculation definitions, model limitations, and exceptions before relying on an output; an alert or recommendation is not itself approval or a regulatory determination.", "href": "https://docs.amlok.io/security/ai-governance"},
  { id: 'assurance-status', name: 'How can I review assurance materials?', category: 'Assurance', description: 'Select the documents your team needs and tell us about your security review. Our team will coordinate the review and applicable confidentiality terms.', href: `${securityDocs}/standards` },
  { id: 'request-evidence', name: 'How do document requests work?', category: 'Assurance', description: 'Select the materials and enter your review details. The Trust Center prepares an editable request that you can send through your email app or copy into an approved channel. Preparing or copying a request does not send it; after you submit it, our team coordinates access and any confidentiality requirements.', href: `${securityDocs}/due-diligence` },
  {"id": "security-testing", "name": "Can we review penetration testing and remediation evidence?", "category": "Assurance", "description": "Request the testing scope, assessment period, findings summary, remediation status, and relevant follow-up evidence through the security-review process. Confidential materials are shared under appropriate access terms. A resource listing alone does not identify a testing date, promise a test frequency, or establish that every finding is resolved.", "href": "https://docs.amlok.io/security/due-diligence"},
  { id: 'provider-assurance', name: 'How do Azure and Stripe assurance reports apply?', category: 'Assurance', description: 'Provider reports cover the named provider services, controls, and reporting period. Microsoft and Stripe assurance supports a dependency review; Amlok remains responsible for its application, configurations, access, data handling, and applicable payment obligations. Review Amlok-specific evidence and customer responsibilities alongside provider materials.', href: `${securityDocs}/standards` },
  { id: 'sign-in-scope', name: 'What information is shared when I sign in with Google, Microsoft, or GitHub?', category: 'Privacy', description: 'The sign-in flow uses account identity, basic profile and email information, and authentication metadata. It does not authorize access to your email, files, GitHub repositories, or financial accounts. Source connections require their own authorization. The provider separately manages your account under its own terms.', href: `${securityDocs}/identity-and-access` },
  {"id": "account-invitations", "name": "Who can create an account or join a workspace?", "category": "Operations", "description": "Console onboarding is invitation-based. The service checks the invited email, invitation expiry and status, and the inviter’s current authority before granting the selected access. A successful Google, Microsoft, or GitHub sign-in alone does not grant workspace membership.", "href": "https://docs.amlok.io/security/identity-and-access"},
  {"id": "api-key-protection", "name": "How are API keys protected and rotated?", "category": "Operations", "description": "Keys are random secrets displayed once and stored as hashes. They have an environment, explicit scopes, and an expiry of no more than 365 days. Requests also check revocation and current authority. Create a replacement, update your integration, verify it works, and revoke the previous key. Do not place keys in browsers, public repositories, URLs, or support messages.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "sandbox-live", "name": "Can Sandbox credentials access Live data?", "category": "Data", "description": "No. Credentials and records are scoped to their workspace environment, with separate product access, webhook configuration, and credit ledgers. Live access requires activation. Sandbox examples and catalog entries demonstrate supported workflows; they do not establish that a particular live provider connection is enabled.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  { id: 'connected-data-providers', name: 'How do Flinks, Plaid, and Baselayer support Amlok?', category: 'Data', description: 'Flinks and Plaid support permitted financial-data connections. Baselayer supports contracted business-verification and risk checks. Only the relevant authorized information is shared for the selected workflow. Provider restrictions, consent, retention, and permissible uses remain applicable, and an integration listing does not authorize every available provider product.', href: '/connection-terms' },
  {"id": "withdraw-connection", "name": "What happens when a connected source is withdrawn?", "category": "Privacy", "description": "Further access under that authorization stops, and affected active workflows require review or fresh authorization. Existing evidence and completed results follow the applicable retention, legal, and deletion requirements. Withdrawing a connection is distinct from deleting records, closing an account, or cancelling the institutional service.", "href": "https://docs.amlok.io/security/open-banking-and-fdx"},
  {"id": "file-validation", "name": "What checks apply to uploaded files?", "category": "Data", "description": "The configured workflow restricts file size, count, MIME type, and document type, normalizes filenames, and records a content hash. A file must also belong to the permitted borrower and workflow. These input checks do not by themselves establish a malware-scan result; review additional scanning and content controls for your service.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  { id: 'retention-deletion', name: 'How are retention and deletion handled?', category: 'Data', description: 'Retention schedules distinguish active records, financial and audit history, temporary files, backups, and legal holds. Contact support@amlok.tech for your service’s schedule or an authorized deletion request. Removing a connection or closing access does not erase every retained record, and acknowledging a request is not confirmation of completed deletion.', href: '/privacy-requests' },
  {"id": "exit-processing", "name": "How do account closure, deletion, and data export differ?", "category": "Privacy", "description": "Ending access or cancelling a service does not automatically erase every record. Deletion requests require identity and authority checks, and schedules distinguish active records, backups, legal holds, and permitted evidence retention. Authorized exports are a separate transfer that the institution must secure. Contact support to coordinate the applicable request and confirmation.", "href": "/privacy-requests"},
  { id: 'stripe-payments', name: 'How does Amlok use Stripe?', category: 'Data', description: 'Stripe is Amlok’s payment provider for platform billing. This concerns payment for Amlok services and workspace credits, rather than borrower loan disbursements or repayments. Payment availability depends on the activated facility. Review payment-data collection, retained billing records, and PCI responsibilities for the applicable integration.', href: `${securityDocs}/payments-and-pci` },
  {"id": "webhook-verification", "name": "How should an institution verify Amlok webhooks?", "category": "Operations", "description": "Verify the signature against the unmodified request body and timestamp using the signing secret, enforce an acceptable timestamp window, and deduplicate by event ID. Delivery can retry, so receivers must handle duplicates safely. Use the documented secret-rotation procedure and confirm that the endpoint is authorized to receive the event data.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "request-retries", "name": "How does Amlok handle request retries and traffic limits?", "category": "Operations", "description": "Supported commands use idempotency keys to recognize repeats and reject a reused key with different input. Request-rate, concurrency, upload, and queue limits depend on the environment’s operational profile. Respect Retry-After and recovery guidance; a timeout should not cause a blind new command or duplicate downstream action.", "href": "https://docs.amlok.io/security/api-and-integration-security"},
  {"id": "audit-visibility", "name": "What audit and activity records are available?", "category": "Operations", "description": "Account and administrative events record identifiers, actions, timestamps, and request references. API request logs record technical outcomes such as route, status, and duration without raw request bodies or credentials. Access varies by role. Review the retention schedule, export scope, and evidence required for your security review.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  {"id": "backup-recovery-scope", "name": "How are backups and disaster recovery handled?", "category": "Operations", "description": "Azure database backups and storage-recovery settings support the recovery process. Amlok-related backup processing remains in Canada. Your review should cover the current configuration, restore-test evidence, dependencies, and agreed recovery objectives. A platform configuration or provider commitment alone is not a universal recovery-time or zero-data-loss guarantee.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  {"id": "software-release", "name": "How are software changes tested and released?", "category": "Operations", "description": "GitHub tracks changes and runs application, database, API, and browser checks. Deployment workflows use scoped identity to release versioned services to Azure. Staging and production configurations and credentials remain separate. Request the release and testing evidence relevant to the service and review period.", "href": "https://docs.amlok.io/security/operations-and-resilience"},
  { id: 'service-health', name: 'What does the public status page monitor?', category: 'Operations', description: 'It checks the public website and documentation and refreshes every minute. It does not establish product API availability, assessment completion, data freshness, or webhook delivery. Check the institution-specific service report and affected workflow as well.', href: '/status' },
  { id: 'report-issue', name: 'How do I report a security or privacy concern?', category: 'Operations', description: 'Contact support@amlok.tech or your agreed incident channel. Include the affected service, time window, impact, and redacted diagnostics. Do not include passwords, access tokens, identity documents, or complete financial records in an ordinary email. Amlok will identify a secure channel if needed.', href: 'mailto:support@amlok.tech' },
  {"id": "incident-notification", "name": "How are security incidents and privacy notifications coordinated?", "category": "Privacy", "description": "Use the agreed incident channel or support@amlok.tech with redacted details. Amlok coordinates investigation, containment, evidence preservation, and provider involvement with the institution. Notification duties depend on the affected data, processing roles, law, and contract; the applicable terms determine timing and responsible recipients.", "href": "https://docs.amlok.io/security/incident-response"},
  {"id": "website-cookies", "name": "Does the website load tracking or scheduling automatically?", "category": "Privacy", "description": "The website stores its language preference locally and does not include a configured advertising or analytics tag. Cal.com loads when you select a scheduling link, and automatic page-query forwarding is disabled. Console, provider sign-in, documentation, and connection pages have their own necessary storage and processing described in the Cookies Policy.", "href": "/cookies"},
  { id: 'canadian-privacy-frameworks', name: 'Which Canadian privacy laws apply to my deployment?', category: 'Privacy', description: 'PIPEDA and provincial privacy laws apply according to the organization, activity, jurisdiction, and movement of personal information. Québec, Alberta, and British Columbia have separate private-sector laws. Review the data flows, contractual roles, and affected individuals for your service.', href: pipedaGuidance },
  { id: 'osfi-model-risk', name: 'Which Canadian guideline covers AI model risk and explainability?', category: 'Assurance', description: 'OSFI E-23 covers model risk management, including explainability for AI and machine learning models. The revised guideline takes effect May 1, 2027. Amlok’s model-governance documentation supports institutional due diligence; the regulated institution remains responsible for its compliance assessment.', href: osfiModelRiskGuideline },
  { id: 'aiuc-1-scope', name: 'How does AIUC-1 complement ISO/IEC 42001?', category: 'Assurance', description: 'ISO/IEC 42001 addresses the AI management system. AIUC-1 focuses on technical and operational safeguards for specific AI agents, including protection against data exposure, adversarial inputs, unreliable outputs, and unsafe tool calls. An AIUC-1 assessment defines the agents and controls in scope, with independent testing and ongoing evaluation. Review the applicable system boundary and supporting evidence for your deployment.', href: aiucStandard },
  { id: 'sanctions-aml-responsibilities', name: 'How are sanctions and AML responsibilities handled?', category: 'Assurance', description: 'Sanctions review depends on applicable regulations, ownership and control, and the activity involved. FINTRAC obligations depend on whether an organization is a covered reporting entity. Institutions must assess their own responsibilities and review supporting evidence; an automated result does not establish compliance or replace required decisions and reporting.', href: canadianSanctionsGuidance },
  { id: 'open-banking-status', name: 'What is the status of Canadian open banking?', category: 'Assurance', description: 'Canada’s consumer-driven banking regulations remain proposed, and accreditation guidance is under consultation. The Bank of Canada will oversee participating entities. Confirm provider participation, permitted services, institution coverage, and consent requirements when reviewing a connection.', href: consumerDrivenBankingFramework },
  { id: 'fdx-scope', name: 'What does FDX cover?', category: 'Assurance', description: 'FDX provides technical standards for permissioned financial data sharing, including data formats, secure access, and consent. It is separate from privacy-law obligations for later processing. Each connection has its own supported version, data permissions, provider roles, and revocation behavior. Standards alignment does not establish membership, product certification, or Canadian regulatory accreditation.', href: `${securityDocs}/open-banking-and-fdx` },
];

export const trustSubprocessors: TrustSubprocessor[] = [
  {
    "id": "azure",
    "name": "Microsoft Azure",
    "category": "Infrastructure",
    "scope": "Institutional platform",
    "location": "Canada Central, Canada",
    "status": "Documented",
    "description": "Hosts the Console, account and product APIs, background processing, PostgreSQL data, Blob artifacts, Key Vault secrets, operational monitoring, and account email through Azure Communication Services.",
    "dataCategories": "Account and workspace records, authorized product data and artifacts, operational metadata, and account-email recipients and content.",
    "relationship": "Cloud infrastructure supporting Amlok’s processing of institutional and account data.",
    "responsibilities": "Amlok manages application controls, access, configuration, retention, and recovery. Canadian processing commitments apply to the contracted services, including backups and support access.",
    "href": "https://docs.amlok.io/security/hosting-and-subprocessors",
    "providerHref": "https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility"
  },
  {
    "id": "stripe",
    "name": "Stripe",
    "category": "Payments",
    "scope": "Platform billing",
    "location": "Canada",
    "status": "Documented",
    "description": "Payment provider for Amlok platform billing and service-credit funding. This billing relationship is separate from an institution’s borrower disbursements and repayments.",
    "dataCategories": "Billing identity, payment information, transaction references, and payment status required by the activated payment integration.",
    "relationship": "Payment service provider. Processing and independent payment-provider responsibilities follow the applicable service agreement and payment flow.",
    "responsibilities": "Amlok-related processing is contractually restricted to Canada. Review payment-data handling, retained records, refunds, and PCI responsibilities for the activated facility; provider assurance does not transfer to Amlok.",
    "href": "https://docs.amlok.io/security/payments-and-pci",
    "providerHref": "https://stripe.com/privacy"
  },
  {
    "id": "flinks",
    "name": "Flinks",
    "category": "Financial data",
    "scope": "Authorized financial-data connections",
    "location": "Canada",
    "status": "Documented",
    "description": "Connects permitted financial accounts and supplies authorized account and transaction information for Amlok’s risk-intelligence workflows.",
    "dataCategories": "Authorized account identifiers, account-holder information, balances, transactions, connection status, and associated consent or permission records, as required by the selected service.",
    "relationship": "Financial-data connection provider. The contracted service, source permissions, and applicable notices define its processing role.",
    "responsibilities": "Canadian processing applies to the Amlok arrangement. Share only the data authorized for the selected workflow; connection withdrawal, provider retention, and deletion are separate actions.",
    "href": "/connection-terms",
    "providerHref": "https://www.flinks.com/data-safety"
  },
  {
    "id": "plaid",
    "name": "Plaid",
    "category": "Financial data",
    "scope": "Authorized financial-data connections",
    "location": "Canada",
    "status": "Documented",
    "description": "Supports user-permissioned financial-data connections used in Amlok’s assessment and monitoring workflows.",
    "dataCategories": "Permitted account and account-holder information, balances, transactions, connection metadata, and authorization records for the enabled connection.",
    "relationship": "Financial-data connection provider. Plaid may have responsibilities under its own end-user terms in addition to the contracted service.",
    "responsibilities": "Amlok-related processing is contractually restricted to Canada. The selected connection and permissions determine the records shared; linking an account does not authorize unrestricted access or a payment.",
    "href": "/connection-terms",
    "providerHref": "https://plaid.com/legal/"
  },
  {
    "id": "baselayer",
    "name": "Baselayer",
    "category": "Verification",
    "scope": "Business verification and risk checks",
    "location": "Canada",
    "status": "Documented",
    "description": "Provides business-identity and risk-verification information for the contracted, authorized verification workflow.",
    "dataCategories": "Business identifiers, relevant associated-person information, submitted verification queries, and returned business-verification and risk information within the authorized scope.",
    "relationship": "Business-data and verification provider. Its independently maintained data sources and the processing performed for Amlok have distinct contractual roles.",
    "responsibilities": "Amlok-related processing is contractually restricted to Canada. Apply source-specific permitted-use restrictions; Baselayer data must not be used for FCRA-regulated consumer eligibility decisions.",
    "href": "/connection-terms",
    "providerHref": "https://baselayer.com/privacy-policy/"
  },
  {
    "id": "google",
    "name": "Google",
    "category": "Identity",
    "scope": "User and employee sign-in",
    "location": "Canada",
    "status": "Documented",
    "description": "Authenticates users who select Google sign-in and authorized employees using the configured Google access flow.",
    "dataCategories": "Provider account identifier, basic profile and email, authentication responses, and security metadata for the sign-in interaction.",
    "relationship": "Identity provider selected for account access. Google also operates the user’s separate Google account under its own terms.",
    "responsibilities": "Canadian processing commitments cover Amlok-related service data. Sign-in does not authorize access to Gmail, Drive, or connected financial records; separate provider-account activity remains governed by that provider’s terms.",
    "href": "https://docs.amlok.io/security/platform-security",
    "providerHref": "https://policies.google.com/privacy"
  },
  {
    "id": "microsoft",
    "name": "Microsoft",
    "category": "Identity",
    "scope": "User sign-in",
    "location": "Canada",
    "status": "Documented",
    "description": "Authenticates users who choose Microsoft sign-in. This identity role is separate from Azure platform hosting.",
    "dataCategories": "Provider account identifier, basic profile and email, authentication responses, and sign-in security metadata.",
    "relationship": "Identity provider selected for account access, separate from the user’s Microsoft account and Amlok’s Azure infrastructure.",
    "responsibilities": "Canadian processing commitments cover Amlok-related service data. The sign-in flow does not request access to email, files, or the organization’s directory; independent provider-account activity follows Microsoft’s terms.",
    "href": "https://docs.amlok.io/security/platform-security",
    "providerHref": "https://www.microsoft.com/en-us/privacy/privacystatement"
  },
  {
    "id": "github",
    "name": "GitHub",
    "category": "Identity & development",
    "scope": "User sign-in, source versioning, and software delivery",
    "location": "Canada",
    "status": "Documented",
    "description": "Supports optional GitHub sign-in and Amlok’s source repositories, version history, code review, and software-delivery workflows.",
    "dataCategories": "For sign-in: account identity, basic profile and email. For development: source code, contributor identities, repository activity, and build or test artifacts and metadata.",
    "relationship": "Identity provider and development service, with separate purposes and access permissions. A GitHub login does not grant access to a user’s repositories.",
    "responsibilities": "Amlok-related processing is contractually restricted to Canada. Development services are not the institutional financial-record store; financial records and secrets are not required for user sign-in or ordinary versioning.",
    "href": "https://docs.amlok.io/security/hosting-and-subprocessors",
    "providerHref": "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
  },
  {
    "id": "cloudflare",
    "name": "Cloudflare",
    "category": "Website & DNS",
    "scope": "Public website, domain management, and platform DNS",
    "location": "Canada",
    "status": "Documented",
    "description": "Provides website delivery, domain management, and authoritative DNS. Platform DNS routes users to the Azure-hosted services; it is separate from application hosting and storage.",
    "dataCategories": "Domain configuration and registration contact information where required, DNS information, and website request or security metadata for the relevant service.",
    "relationship": "Website and domain service provider. Domain-registration and DNS functions are distinct from institutional product-data processing.",
    "responsibilities": "Amlok-related service processing is contractually restricted to Canada. Review the applicable domain, DNS, website, and security services without treating global DNS availability as a platform data-residency guarantee.",
    "href": "/privacy",
    "providerHref": "https://www.cloudflare.com/privacypolicy/"
  },
  {
    "id": "cal-com",
    "name": "Cal.com",
    "category": "Scheduling",
    "scope": "Optional website scheduling",
    "location": "Canada",
    "status": "Documented",
    "description": "Loads scheduling when a visitor selects a booking link and processes the information submitted for the meeting.",
    "dataCategories": "Booking contact details, scheduling information, and technical request metadata from the booking interaction.",
    "relationship": "Scheduling service. Visiting an Amlok page does not automatically open the booking service.",
    "responsibilities": "Amlok-related processing is contractually restricted to Canada. Automatic page-query forwarding is disabled; submit only meeting information and use an agreed secure channel for financial or identity records.",
    "href": "/cookies",
    "providerHref": "https://cal.com/privacy"
  },
  {
    "id": "mintlify",
    "name": "Mintlify",
    "category": "Documentation",
    "scope": "Public documentation hosting",
    "location": "Canada",
    "status": "Documented",
    "description": "Hosts Amlok’s public documentation and supports visitors navigating or interacting with that documentation.",
    "dataCategories": "Public documentation content, visitor request metadata, and information visitors choose to submit through available documentation interactions.",
    "relationship": "Documentation hosting service, separate from the institutional platform and financial-record storage.",
    "responsibilities": "Amlok-related processing is contractually restricted to Canada. Public documentation does not require private borrower records, credentials, or complete financial files.",
    "href": "/privacy",
    "providerHref": "https://www.mintlify.com/legal/privacy"
  }
];

export const trustProviderRegister = {
  id: 'institutional-provider-register',
  name: 'Institutional service providers',
  description: 'Review platform, payment, financial-data, verification, identity, development, domain, scheduling, and documentation providers, including their defined roles and contractual Canadian processing scope.',
  status: 'Deployment-specific' as const,
  href: `${securityDocs}/hosting-and-subprocessors`,
};

// Design research references only. These organizations do not certify or endorse Amlok.
export const trustReferences: TrustReference[] = [
  { id: 'float-vanta', name: 'Float Trust Center', category: 'Vanta', description: 'Canadian fintech reference for trust-center navigation, security topics, and document discovery.', href: 'https://trust.floatfinancial.com/' },
  { id: 'brex-drata', name: 'Brex Trust Portal', category: 'Drata', description: 'Fintech reference for assurance resources, control categories, and access-request patterns.', href: 'https://trust-portal.brex.com/' },
  { id: 'trovata-drata', name: 'Trovata Trust Center', category: 'Drata', description: 'Fintech reference for a public security overview and controlled access to confidential evidence.', href: 'https://trust.trovata.io/' },
];
