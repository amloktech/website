export type TrustTopicId =
  | 'risk-profile'
  | 'product-security'
  | 'reports'
  | 'self-assessments'
  | 'data-security'
  | 'app-security'
  | 'ai'
  | 'legal'
  | 'data-privacy'
  | 'access-control'
  | 'infrastructure'
  | 'endpoint-security'
  | 'network-security'
  | 'corporate-security'
  | 'policies'
  | 'security-grades';

export type TrustTopicItem = {
  id: string;
  name: string;
  description: string;
  status: 'Documented' | 'Deployment-specific' | 'Review required';
  controlIds?: readonly string[];
  resourceIds?: readonly string[];
  href?: string;
  requestLabel?: string;
};

export type TrustTopic = {
  id: TrustTopicId;
  name: string;
  description: string;
  previewItemIds: readonly [string, string, string];
  items: readonly TrustTopicItem[];
};

const securityDocs = 'https://docs.amlok.io/security';

// Items describe documented controls or a concrete evidence request. A review request
// does not imply that an assessment, employee program, policy, or rating is complete.
export const trustTopics: TrustTopic[] = [
  {
    id: 'risk-profile',
    name: 'Risk Profile',
    description: 'Understand the information, decisions, and dependencies in your Amlok service.',
    previewItemIds: ['risk-data-access', 'risk-workflow-impact', 'risk-critical-dependencies'],
    items: [
      {
        id: 'risk-data-access', name: 'Data access and sensitivity', status: 'Deployment-specific',
        description: 'Authorized workflows can involve business and individual identity, financial transactions, verification information, supporting documents, and assessment results. Scope the actual sources, users, recipients, and sensitivity for your institution.',
        controlIds: ['data-minimization', 'connection-authorization'], resourceIds: ['trust-whitepaper', 'platform-architecture', 'connection-terms'],
        href: `${securityDocs}/privacy`,
      },
      {
        id: 'risk-workflow-impact', name: 'Workflow and decision impact', status: 'Documented',
        description: 'Amlok supports underwriting, monitoring, and related risk workflows. Institutions own lending policy and consequential decisions. Identify which activities require human review, which depend on fresh evidence, and what happens when a source or service is unavailable.',
        controlIds: ['decision-ownership', 'ai-use-boundaries', 'service-responsibilities'],
        resourceIds: ['ai-governance', 'operations-resilience'], href: `${securityDocs}/due-diligence`,
      },
      {
        id: 'risk-critical-dependencies', name: 'Critical service dependencies', status: 'Deployment-specific',
        description: 'Microsoft Azure hosts the institutional platform. Authorized Flinks, Plaid, and Baselayer workflows, identity services, and Stripe billing have separate dependencies and data scopes. Assess service materiality and continuity for the providers your workflow actually uses.',
        controlIds: ['provider-oversight', 'backup-recovery'], resourceIds: ['hosting-and-providers', 'institutional-subprocessor-register'],
        href: `${securityDocs}/hosting-and-subprocessors`,
      },
      {
        id: 'risk-processing-boundary', name: 'Processing and environment boundaries', status: 'Deployment-specific',
        description: 'Amlok-related provider processing is contractually restricted to Canada, including storage, backups, and support access. Sandbox and Live remain separately scoped. Customer-selected export destinations and independent provider-account activities require their own review.',
        controlIds: ['data-location', 'environment-isolation'], resourceIds: ['hosting-and-providers'],
        href: `${securityDocs}/platform-security`,
      },
      {
        id: 'risk-institutional-assessment', name: 'Institutional risk assessment', status: 'Review required',
        description: 'Review intended use, access privileges, information sensitivity, disruption impact, contractual duties, and unresolved exceptions together. Request the service-specific evidence and responsibility mapping needed for your own risk classification.',
        resourceIds: ['security-review-guide', 'security-questionnaire'], requestLabel: 'Service risk profile and responsibility mapping',
        href: `${securityDocs}/due-diligence`,
      },
    ],
  },
  {
    id: 'product-security',
    name: 'Product Security',
    description: 'Account, workspace, and integration safeguards built into the product.',
    previewItemIds: ['product-mfa', 'product-roles', 'product-audit'],
    items: [
      {
        id: 'product-mfa', name: 'Multi-factor authentication', status: 'Deployment-specific',
        description: 'Authenticator-based MFA and single-use recovery codes protect enrolled accounts. An organization can require MFA for workspace access; the requirement is not enabled for every organization by default.',
        controlIds: ['multi-factor-authentication'], resourceIds: ['identity-and-access'], href: `${securityDocs}/identity-and-access`,
      },
      {
        id: 'product-roles', name: 'Role-based access', status: 'Documented',
        description: 'Owner, Dev, and Analyst permissions are checked server-side against current organization and workspace membership. Product data, billing, administration, and developer tools have different permissions.',
        controlIds: ['role-based-access', 'scoped-access'], resourceIds: ['identity-and-access'], href: `${securityDocs}/identity-and-access`,
      },
      {
        id: 'product-audit', name: 'Audit and activity records', status: 'Documented',
        description: 'Material account and administrative actions record actor, action, target, time, and request references. Technical API records omit credentials and raw request bodies; authorized access and retention depend on the record type.',
        controlIds: ['audit-activity'], resourceIds: ['operations-resilience'], href: `${securityDocs}/operations-and-resilience`,
      },
      {
        id: 'product-sessions', name: 'Session controls', status: 'Documented',
        description: 'Console sessions are server-side and revocable. Production session cookies use Secure, HttpOnly, and SameSite protections, and sensitive account actions require recent identity confirmation.',
        controlIds: ['session-security'], resourceIds: ['identity-and-access'], href: `${securityDocs}/identity-and-access`,
      },
      {
        id: 'product-environments', name: 'Sandbox and Live separation', status: 'Documented',
        description: 'Credentials, records, events, product access, and credit ledgers are scoped to the workspace environment. Sandbox demonstrations use simulated activity; Live access requires the relevant activation and permissions.',
        controlIds: ['environment-isolation', 'tenant-separation'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'product-keys', name: 'API key lifecycle', status: 'Documented',
        description: 'API keys are shown once and stored as hashes. Requests check expiry, revocation, scopes, current authority, environment, and product permissions. Rotate by creating a replacement and revoking the old key.',
        controlIds: ['api-key-lifecycle'], resourceIds: ['api-integration-security'], href: 'https://docs.amlok.io/console/api-keys',
      },
      {
        id: 'product-browser-security', name: 'Browser security', status: 'Documented',
        description: 'Production sessions use protected cookies, sensitive changes require fresh identity confirmation, and protected mutations check the configured origin. Review permitted browsers, session behavior, and any institution-managed device requirements separately.',
        controlIds: ['session-security', 'request-origin'], resourceIds: ['identity-and-access', 'security-faqs'], href: `${securityDocs}/identity-and-access`,
      },
      {
        id: 'product-integrations', name: 'Integration security', status: 'Documented',
        description: 'Financial-data and verification connections require the relevant authorization, provider permissions, and workflow scope. API access and webhook delivery have separate credentials and protections; a catalog listing does not authorize every provider product.',
        controlIds: ['connection-authorization', 'api-key-lifecycle', 'webhook-security'], resourceIds: ['api-integration-security', 'open-banking-fdx-guide'], href: `${securityDocs}/api-and-integration-security`,
      },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    description: 'Assurance materials, assessment scope, and supporting evidence for your review.',
    previewItemIds: ['report-soc2', 'report-penetration', 'report-iso27001'],
    items: [
      {
        id: 'report-soc2', name: 'SOC 2 Type II report', status: 'Review required',
        description: 'Request the report and review the assessed entity, covered services, observation period, exceptions, and complementary customer controls. Distinguish Amlok-specific assurance from reports covering an infrastructure or other service provider.',
        controlIds: ['assurance-evidence'], resourceIds: ['soc2-report'], requestLabel: 'SOC 2 Type II report and scope',
      },
      {
        id: 'report-penetration', name: 'Penetration test summary', status: 'Review required',
        description: 'Request the available authorized summary with tested surfaces, date, approach, material findings, remediation status, and retest evidence. The assessment must cover the service and version relevant to your review.',
        resourceIds: ['penetration-test', 'penetration-test-methodology'], requestLabel: 'Penetration test scope, summary, and remediation evidence',
      },
      {
        id: 'report-iso27001', name: 'ISO/IEC 27001 certificate', status: 'Review required',
        description: 'Review the certificate holder, management-system scope, covered locations and services, issuing body, and validity period. Request supporting scope information when the institution needs to map specific controls.',
        resourceIds: ['iso-certificate'], requestLabel: 'ISO/IEC 27001 certificate and scope',
      },
      {
        id: 'report-soc3', name: 'SOC 3 report', status: 'Review required',
        description: 'Request the general-use report and confirm the named entity, covered system, criteria, and reporting period. A general-use report provides a different level of detail from the restricted SOC 2 report.',
        resourceIds: ['soc3-report'], requestLabel: 'SOC 3 general-use report',
      },
      {
        id: 'report-iso42001', name: 'ISO/IEC 42001 certificate', status: 'Review required',
        description: 'Review the AI management-system scope, organizational boundary, applicable services, issuing body, and validity period. Relate the scope to the AI-enabled workflow your institution intends to use.',
        resourceIds: ['iso42001-certificate'], requestLabel: 'ISO/IEC 42001 certificate and AI system scope',
      },
      {
        id: 'report-pci', name: 'PCI DSS attestation', status: 'Review required',
        description: 'Review the attestation for the actual payment-data boundary and covered entity. Stripe provider assurance and Amlok responsibilities should be assessed separately for the activated billing flow.',
        resourceIds: ['pci-aoc', 'stripe-payment-scope'], requestLabel: 'PCI DSS attestation and payment scope',
      },
      {
        id: 'report-bridge', name: 'SOC 2 bridge letter', status: 'Review required',
        description: 'Request available subsequent-change information for the interval after the report period. Check the author, period, material changes, and relationship to the underlying assurance report.',
        resourceIds: ['soc2-bridge-letter'], requestLabel: 'SOC 2 bridge letter and subsequent changes',
      },
      {
        id: 'report-soc1', name: 'SOC 1 report availability', status: 'Review required',
        description: 'If your review concerns controls relevant to financial reporting, ask whether a scoped SOC 1 report is available and which entity and services it covers. No Amlok SOC 1 report or opinion is represented by this listing.',
        resourceIds: ['soc1-review'], requestLabel: 'SOC 1 report availability and financial-reporting scope',
      },
      {
        id: 'report-prior-period', name: 'Prior-period assurance', status: 'Review required',
        description: 'Request available earlier reports for the permitted review purpose. Compare system scope, findings, and changes across periods instead of assuming an older report covers the current service.',
        resourceIds: ['prior-period-assurance'], requestLabel: 'Prior-period assurance materials',
      },
      {
        id: 'report-network-diagram', name: 'Network and data-flow diagram', status: 'Review required',
        description: 'Request the current Azure service topology, public and private ingress, database and storage boundaries, provider connections, and authorized data flows. Review the diagram version and deployment scope alongside the actual configuration.',
        resourceIds: ['platform-architecture'], requestLabel: 'Current Azure network and data-flow diagram',
      },
    ],
  },
  {
    id: 'self-assessments',
    name: 'Self-Assessments',
    description: 'Structured questionnaires and control mappings for institutional due diligence.',
    previewItemIds: ['assessment-caiq', 'assessment-sig-lite', 'assessment-questionnaire'],
    items: [
      {
        id: 'assessment-caiq', name: 'CAIQ', status: 'Review required',
        description: 'Request the applicable Cloud Security Alliance questionnaire response, version, service boundary, control explanations, and supporting evidence. A questionnaire response should not be treated as independent certification or a confirmed STAR Registry entry.',
        resourceIds: ['caiq'], requestLabel: 'CAIQ response and supporting cloud-control evidence',
      },
      {
        id: 'assessment-sig-lite', name: 'SIG Lite', status: 'Review required',
        description: 'Request an available Standardized Information Gathering Lite response for the service under review. Confirm the questionnaire version, assessment scope, response owner, exceptions, and evidence supporting the answers.',
        resourceIds: ['sig-lite'], requestLabel: 'SIG Lite questionnaire and supporting evidence',
      },
      {
        id: 'assessment-pci', name: 'PCI DSS SAQ D', status: 'Review required',
        description: 'Review the applicable payment-security assessment with the actual collection flow, entity, validation responsibility, and supporting evidence. Confirm the appropriate assessment route for the service before relying on a form title.',
        resourceIds: ['pci-saq-d', 'stripe-payment-scope'], requestLabel: 'Applicable PCI self-assessment and payment boundary',
      },
      {
        id: 'assessment-controls', name: 'Control alignment matrix', status: 'Review required',
        description: 'Request a mapping of the controls relevant to your institution, their evidence, service boundary, owner, and unresolved exceptions. Regulatory guidance, technical standards, and independent assurance should remain distinct in the mapping.',
        resourceIds: ['standards-register', 'security-review-guide'], requestLabel: 'Institutional control alignment and evidence matrix',
      },
      {
        id: 'assessment-questionnaire', name: 'Security questionnaire', status: 'Review required',
        description: 'Share your questionnaire and intended service scope. Responses should identify the relevant deployment, supporting documentation, provider responsibilities, and any information requiring confidential review.',
        resourceIds: ['security-questionnaire'], requestLabel: 'Security questionnaire for institutional review',
      },
      {
        id: 'assessment-ai', name: 'AI and model assessment', status: 'Review required',
        description: 'Review intended use, representative validation, source lineage, output limitations, human oversight, tool permissions, and change controls. Request workflow-specific evidence for OSFI E-23, ISO/IEC 42001, or AIUC-1 requirements relevant to your assessment.',
        controlIds: ['model-governance', 'ai-use-boundaries'], resourceIds: ['ai-risk-assessment', 'ai-governance', 'aiuc-1-standard'],
        requestLabel: 'AI and model-governance assessment', href: `${securityDocs}/ai-governance`,
      },
      {
        id: 'assessment-privacy', name: 'Privacy and data-flow assessment', status: 'Review required',
        description: 'Identify the information, purposes, receiving parties, contractual roles, Canadian processing arrangements, retention, and individual-rights responsibilities. Request the data-flow detail needed for your privacy review.',
        resourceIds: ['platform-architecture', 'data-processing-agreement'], requestLabel: 'Privacy assessment and service data flows',
        href: `${securityDocs}/privacy`,
      },
    ],
  },
  {
    id: 'data-security',
    name: 'Data Security',
    description: 'Protect information through authorized collection, storage, use, and retention.',
    previewItemIds: ['data-encryption', 'data-documents', 'data-retention'],
    items: [
      {
        id: 'data-encryption', name: 'Encryption in transit and at rest', status: 'Deployment-specific',
        description: 'Azure platform configuration requires HTTPS, managed storage encryption, and verified production database TLS. Review service coverage, key permissions, and external-provider boundaries for your deployment.',
        controlIds: ['encryption'], resourceIds: ['platform-security'], href: `${securityDocs}/platform-security`,
      },
      {
        id: 'data-documents', name: 'Protected files and exports', status: 'Deployment-specific',
        description: 'Documents and exports use private Azure Blob containers. Signed, expiring downloads recheck current permissions, environment, and document authorization. Copies downloaded by your institution enter its own protection and retention boundary.',
        controlIds: ['secure-document-access'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'data-retention', name: 'Retention and deletion', status: 'Deployment-specific',
        description: 'Source records, financial history, audit events, temporary files, and backups have different lifecycles. Request your service schedule, legal-hold treatment, provider coordination, and completion evidence for authorized deletion.',
        controlIds: ['retention', 'historical-records'], resourceIds: ['privacy-policy', 'privacy-requests'], href: `${securityDocs}/privacy`,
      },
      {
        id: 'data-minimization', name: 'Purpose-limited collection', status: 'Documented',
        description: 'Collect and share information for the authorized source, recipient, and workflow. Connection authorization does not grant unrestricted rights for unrelated advertising, model training, or secondary products.',
        controlIds: ['data-minimization', 'ai-use-boundaries'], resourceIds: ['connection-terms'], href: '/connection-terms',
      },
      {
        id: 'data-intake', name: 'Document intake validation', status: 'Documented',
        description: 'Intake enforces configured file size, count, document type, and MIME limits, normalizes filenames, and records content hashes. Malware-scanning coverage requires separate deployment-specific evidence.',
        controlIds: ['upload-validation'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'data-payment-boundary', name: 'Payment information boundary', status: 'Documented',
        description: 'Stripe supports payment for Amlok services and workspace credits. Platform billing is separate from borrower loan funding and repayments. Review the activated payment facility and retained billing information.',
        controlIds: ['payment-data-boundary'], resourceIds: ['stripe-payment-scope'], href: `${securityDocs}/payments-and-pci`,
      },
    ],
  },
  {
    id: 'app-security',
    name: 'App Security',
    description: 'Application boundaries, software changes, and security-testing evidence.',
    previewItemIds: ['app-development', 'app-request-validation', 'app-testing'],
    items: [
      {
        id: 'app-development', name: 'Software delivery controls', status: 'Documented',
        description: 'GitHub tracks source changes and runs application, database, API, and browser checks. Release workflows use scoped identities to deploy to Azure, with separate staging and production configuration and credentials.',
        controlIds: ['software-delivery'], resourceIds: ['secure-product-lifecycle', 'operations-resilience'], href: `${securityDocs}/operations-and-resilience`,
      },
      {
        id: 'app-request-validation', name: 'Input and request protections', status: 'Documented',
        description: 'APIs validate schemas and enforce configured request, upload, concurrency, and queue limits. Protected Console mutations require the expected browser origin and a valid session.',
        controlIds: ['api-capacity', 'request-origin', 'upload-validation'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'app-testing', name: 'Security testing and remediation', status: 'Review required',
        description: 'Review actual independent testing, dependency and code-scanning coverage, findings, remediation ownership, and retest results. Automated functional checks do not establish penetration-testing completion or a fixed remediation schedule.',
        resourceIds: ['penetration-test', 'penetration-test-methodology', 'security-review-guide'], requestLabel: 'Application security testing and remediation evidence',
      },
      {
        id: 'app-webhooks', name: 'Signed webhook delivery', status: 'Documented',
        description: 'Events use timestamped signatures, restricted HTTPS destinations, network-address checks, and bounded retries. Receivers verify signatures, reject replay, and handle duplicate notifications without repeating business effects.',
        controlIds: ['webhook-security'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'app-idempotency', name: 'Safe retries and request recovery', status: 'Documented',
        description: 'Supported commands use environment-scoped idempotency keys and durable receipts. Reusing a key with different input is rejected; recovery and replay remain subject to current authority and the documented window.',
        controlIds: ['command-recovery'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'app-vulnerability-reporting', name: 'Vulnerability reporting', status: 'Documented',
        description: 'Report the affected service, impact, safe reproduction steps, and redacted request references through support. Coordinate sensitive evidence securely and stay within authorized testing scope.',
        controlIds: ['incident-response'], resourceIds: ['operations-resilience', 'incident-response-guide'], href: `${securityDocs}/operations-and-resilience`,
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    description: 'Intended use, traceable evidence, model review, and accountable decisions.',
    previewItemIds: ['ai-governance', 'ai-explainability', 'ai-human-oversight'],
    items: [
      {
        id: 'ai-governance', name: 'AI and model governance', status: 'Deployment-specific',
        description: 'Define the intended task, affected population, validation criteria, operating limits, and responsible reviewers. Match governance evidence to the model and workflow used by your institution.',
        controlIds: ['model-governance'], resourceIds: ['ai-governance', 'osfi-e23-guideline'], href: `${securityDocs}/ai-governance`,
      },
      {
        id: 'ai-explainability', name: 'Evidence and explainability', status: 'Documented',
        description: 'Outputs distinguish observations, calculations, interpretations, and missing evidence. Source references, versioned results, and workflow context support review of how an assessment was produced and where it is limited.',
        controlIds: ['evidence-lineage'], resourceIds: ['ai-governance'], href: `${securityDocs}/ai-governance`,
      },
      {
        id: 'ai-human-oversight', name: 'Human oversight and decision ownership', status: 'Documented',
        description: 'Institutions set lending policy, approve consequential uses, review exceptions, and own decisions. Validation and review requirements should reflect the workflow rather than treating an AI output as an automatic approval.',
        controlIds: ['decision-ownership', 'ai-use-boundaries'], resourceIds: ['ai-governance', 'terms'], href: `${securityDocs}/ai-governance`,
      },
      {
        id: 'ai-data-use', name: 'Data use and model training', status: 'Documented',
        description: 'Source connection authorization does not grant unrestricted permission to train models or reuse information for unrelated purposes. Any separate use must satisfy the agreement, applicable law, source restrictions, and required authorization.',
        controlIds: ['ai-use-boundaries', 'data-minimization'], resourceIds: ['connection-terms', 'privacy-policy'], href: `${securityDocs}/ai-governance`,
      },
      {
        id: 'ai-assurance', name: 'AIUC-1 and ISO/IEC 42001', status: 'Review required',
        description: 'Review the AI management system and the specific agents, controls, and evaluations in scope. Request relevant evidence for data exposure, adversarial inputs, unreliable outputs, tool permissions, and change handling.',
        resourceIds: ['aiuc-1-standard', 'iso42001-certificate'], requestLabel: 'AIUC-1 control evidence and ISO/IEC 42001 scope',
        href: `${securityDocs}/standards`,
      },
      {
        id: 'ai-validation', name: 'Validation and model changes', status: 'Review required',
        description: 'Request representative evaluation results, data cutoffs, limitations, explanation review, model and policy versions, and approval of material changes. Retrospective analysis must be distinguished from proven outcomes in the institution’s live workflow.',
        controlIds: ['model-governance', 'evidence-lineage'], resourceIds: ['ai-risk-assessment', 'ai-governance'], requestLabel: 'Workflow-specific model validation and change evidence',
      },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Contractual terms, confidentiality, processing instructions, and responsibilities.',
    previewItemIds: ['legal-terms', 'legal-dpa', 'legal-nda'],
    items: [
      {
        id: 'legal-terms', name: 'Terms and Conditions', status: 'Documented',
        description: 'Review website use, service scope, institution responsibilities, permitted use, and the role of the institutional agreement. Commercial and service-specific obligations are established in the applicable agreement.',
        controlIds: ['service-responsibilities'], resourceIds: ['terms'], href: '/terms',
      },
      {
        id: 'legal-dpa', name: 'Data Processing Agreement', status: 'Review required',
        description: 'Review documented instructions, processing roles, permitted providers, safeguards, Canadian processing, rights assistance, incident coordination, retention, return or deletion, and review rights for your service.',
        resourceIds: ['data-processing-agreement'], requestLabel: 'Data Processing Agreement and processing schedule',
      },
      {
        id: 'legal-nda', name: 'Nondisclosure agreement', status: 'Review required',
        description: 'Confidential architecture, security reports, and operating evidence are shared under appropriate access terms and the document owner’s distribution permissions. Coordinate an NDA and a secure review channel with Amlok.',
        controlIds: ['due-diligence'], resourceIds: ['security-review-guide'], requestLabel: 'NDA for confidential security materials',
        href: `${securityDocs}/due-diligence`,
      },
      {
        id: 'legal-connections', name: 'Merchant Connection Terms', status: 'Documented',
        description: 'Review source authorization, receiving institution, permitted data and purposes, provider restrictions, and connection withdrawal. Withdrawal does not automatically cancel a commercial agreement or erase historical records.',
        controlIds: ['connection-authorization', 'consent-withdrawal'], resourceIds: ['connection-terms'], href: '/connection-terms',
      },
      {
        id: 'legal-commercial-terms', name: 'Service and commercial terms', status: 'Deployment-specific',
        description: 'Confirm activated products, funding facilities, support scope, service levels, notification duties, recovery objectives, and exit responsibilities. Support coordinates cancellation, refunds, or unavailable billing controls under the agreement.',
        controlIds: ['service-responsibilities'], resourceIds: ['terms'], href: 'https://docs.amlok.io/pricing/contract-terms',
      },
      {
        id: 'legal-insurance', name: 'Insurance evidence', status: 'Review required',
        description: 'If your procurement process requires insurance, request the available certificate, insured entity, coverage types, limits, exclusions, and policy period. No insurer, coverage amount, or active policy is asserted here.',
        requestLabel: 'Insurance certificate and relevant coverage',
      },
    ],
  },
  {
    id: 'data-privacy',
    name: 'Data Privacy',
    description: 'Processing transparency, Canadian privacy requirements, and individual rights.',
    previewItemIds: ['privacy-policy', 'privacy-residency', 'privacy-rights'],
    items: [
      {
        id: 'privacy-policy', name: 'Privacy Policy', status: 'Documented',
        description: 'Review information categories, purposes, service providers, processing roles, retention, safeguards, and contact routes. Institutional processing and Amlok’s own website and business activities have different responsibilities.',
        resourceIds: ['privacy-policy'], href: '/privacy',
      },
      {
        id: 'privacy-residency', name: 'Canadian processing', status: 'Deployment-specific',
        description: 'Amlok-related provider processing is contractually restricted to Canada, including storage, backups, and support access. Core platform hosting is in Azure Canada Central. This commitment concerns the Amlok service arrangement, not a provider’s headquarters.',
        controlIds: ['data-location'], resourceIds: ['hosting-and-providers', 'institutional-subprocessor-register'], href: `${securityDocs}/hosting-and-subprocessors`,
      },
      {
        id: 'privacy-rights', name: 'Privacy rights and requests', status: 'Documented',
        description: 'Request access, correction, deletion, or connection withdrawal through the published process. Identity, authority, institution responsibilities, legal obligations, and retained-record exceptions are evaluated for the request.',
        controlIds: ['privacy-rights', 'retention'], resourceIds: ['privacy-requests'], href: '/privacy-requests',
      },
      {
        id: 'privacy-providers', name: 'Provider transparency', status: 'Documented',
        description: 'Provider disclosures separate platform hosting, financial connections, verification, billing, sign-in, software delivery, website, scheduling, and documentation. Each provider receives information for its defined role rather than every customer record.',
        controlIds: ['provider-oversight'], resourceIds: ['provider-information', 'institutional-subprocessor-register'], href: `${securityDocs}/hosting-and-subprocessors`,
      },
      {
        id: 'privacy-cookies', name: 'Cookies and browser storage', status: 'Documented',
        description: 'Review essential authentication and interface storage, invitation context, and optional booking or external features. Product session controls and public website features have different storage and provider boundaries.',
        resourceIds: ['cookie-policy'], href: '/cookies',
      },
      {
        id: 'privacy-laws', name: 'Canadian privacy frameworks', status: 'Deployment-specific',
        description: 'PIPEDA and the applicable Québec, Alberta, and British Columbia privacy requirements depend on the organization, processing activity, jurisdiction, and affected individuals. Align the institution’s privacy assessment with the actual service and roles.',
        resourceIds: ['pipeda-guidance', 'quebec-law25-guidance', 'alberta-pipa-guidance', 'bc-pipa-guidance'], href: `${securityDocs}/canada`,
      },
    ],
  },
  {
    id: 'access-control',
    name: 'Access Control',
    description: 'Authorize people and services for the workspace and actions they need.',
    previewItemIds: ['access-least-privilege', 'access-authentication', 'access-revocation'],
    items: [
      {
        id: 'access-least-privilege', name: 'Scoped permissions', status: 'Documented',
        description: 'Protected requests evaluate the current organization, workspace, environment, role, and resource permissions. Billing, administration, developer access, and product records have separate permission requirements.',
        controlIds: ['scoped-access', 'role-based-access', 'tenant-separation'], resourceIds: ['identity-and-access'], href: `${securityDocs}/identity-and-access`,
      },
      {
        id: 'access-authentication', name: 'Authentication and MFA', status: 'Deployment-specific',
        description: 'Console supports password and configured Microsoft, Google, and GitHub sign-in. Authenticator MFA can be required by organization policy, and sensitive actions require fresh identity confirmation.',
        controlIds: ['social-authentication', 'multi-factor-authentication', 'session-security'], resourceIds: ['identity-and-access'], href: `${securityDocs}/identity-and-access`,
      },
      {
        id: 'access-revocation', name: 'Access removal and revocation', status: 'Documented',
        description: 'Session revocation, membership removal, and API key revocation affect their respective access boundaries. Review other workspace memberships and service credentials separately; removing one membership does not delete the account or all independent access.',
        controlIds: ['session-security', 'api-key-lifecycle', 'scoped-access'], resourceIds: ['identity-and-access'], href: 'https://docs.amlok.io/console/team',
      },
      {
        id: 'access-invitations', name: 'Invitation-based onboarding', status: 'Documented',
        description: 'Onboarding checks the intended email, invitation status and expiry, and current inviter authority before granting the selected workspace membership. Identity-provider authentication alone does not authorize workspace access.',
        controlIds: ['invitation-access'], resourceIds: ['identity-and-access'], href: 'https://docs.amlok.io/console/account-access',
      },
      {
        id: 'access-services', name: 'Service identities and secrets', status: 'Deployment-specific',
        description: 'Azure managed identities and Key Vault support scoped runtime secret access. API keys are hashed; webhook signing secrets are encrypted for authorized use. Review identity assignment, secret ownership, access, and rotation for the deployment.',
        controlIds: ['azure-service-identities', 'api-key-lifecycle'], resourceIds: ['platform-security'], href: `${securityDocs}/platform-security`,
      },
      {
        id: 'access-reviews', name: 'Access review evidence', status: 'Review required',
        description: 'Request evidence of review ownership, privileged access, service credentials, joiner and leaver handling, exceptions, and the review period. Product permission enforcement does not establish a particular employee access-review cadence.',
        resourceIds: ['security-review-guide'], requestLabel: 'Privileged access and access-review evidence',
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Azure platform services, protected recovery, and operational dependencies.',
    previewItemIds: ['infrastructure-azure', 'infrastructure-recovery', 'infrastructure-monitoring'],
    items: [
      {
        id: 'infrastructure-azure', name: 'Microsoft Azure hosting', status: 'Deployment-specific',
        description: 'The institutional platform uses Azure Container Apps, PostgreSQL, private Blob containers, Key Vault, and operational monitoring in Canada Central. Review the application and managed-service responsibilities for your service.',
        controlIds: ['azure-service-identities', 'data-location'], resourceIds: ['hosting-and-providers', 'platform-architecture'], href: `${securityDocs}/platform-security`,
      },
      {
        id: 'infrastructure-recovery', name: 'Backup and disaster recovery', status: 'Deployment-specific',
        description: 'Database, document, configuration, and credential recovery require distinct coverage and checks. Review Canadian recovery locations, backup settings, actual restoration exercises, and agreed recovery objectives.',
        controlIds: ['backup-recovery'], resourceIds: ['business-continuity', 'operations-resilience'], href: `${securityDocs}/operations-and-resilience`,
      },
      {
        id: 'infrastructure-monitoring', name: 'Monitoring and response scope', status: 'Deployment-specific',
        description: 'Azure operational logs, request outcomes, queues, worker activity, and delivery results support investigation. Confirm alert recipients, notification tests, response coverage, and escalation responsibilities for the contracted service.',
        controlIds: ['monitoring-escalation', 'availability'], resourceIds: ['operations-resilience'], href: `${securityDocs}/operations-and-resilience`,
      },
      {
        id: 'infrastructure-isolation', name: 'Environment separation', status: 'Documented',
        description: 'Staging, production, and demo configuration and secrets remain separate. Sandbox and Live credentials and records are separately authorized within the product’s workspace boundaries.',
        controlIds: ['environment-isolation', 'tenant-separation', 'software-delivery'], resourceIds: ['platform-security'], href: `${securityDocs}/platform-security`,
      },
      {
        id: 'infrastructure-cloudflare', name: 'Website and domain services', status: 'Documented',
        description: 'Cloudflare supports the public website, domain management, and DNS. Mintlify hosts public documentation. These services have a separate role from Azure’s institutional platform and authorized borrower-data processing.',
        controlIds: ['provider-oversight'], resourceIds: ['hosting-and-providers'], href: `${securityDocs}/hosting-and-subprocessors`,
      },
      {
        id: 'infrastructure-provider-assurance', name: 'Provider assurance and shared responsibility', status: 'Review required',
        description: 'Request relevant Microsoft service assurance and the configuration evidence for the Amlok services in scope. Provider certifications do not independently attest to Amlok’s application, identity configuration, or institution-operated integrations.',
        controlIds: ['assurance-evidence'], resourceIds: ['security-review-guide', 'platform-architecture'], requestLabel: 'Azure assurance and shared-responsibility evidence',
      },
    ],
  },
  {
    id: 'endpoint-security',
    name: 'Endpoint Security',
    description: 'Review the device safeguards applicable to personnel with service access.',
    previewItemIds: ['endpoint-management', 'endpoint-protection', 'endpoint-encryption'],
    items: [
      {
        id: 'endpoint-management', name: 'Device management', status: 'Review required',
        description: 'Request the device inventory, management coverage, supported platforms, enrollment requirements, and treatment of personal devices for personnel with production or customer-data access.',
        requestLabel: 'Endpoint inventory and device-management coverage',
      },
      {
        id: 'endpoint-protection', name: 'Endpoint detection and response', status: 'Review required',
        description: 'Request the applicable endpoint protection or EDR coverage, monitoring owner, alert response process, and exception handling. The platform’s Azure configuration does not establish employee-device protection coverage.',
        requestLabel: 'Endpoint protection, EDR coverage, and response evidence',
      },
      {
        id: 'endpoint-encryption', name: 'Device encryption and locking', status: 'Review required',
        description: 'Review full-disk encryption, screen-lock requirements, recovery-key access, and enforcement evidence for devices that can access confidential information. No universal employee-device configuration is asserted here.',
        requestLabel: 'Device encryption and screen-lock requirements',
      },
      {
        id: 'endpoint-updates', name: 'Operating-system and application updates', status: 'Review required',
        description: 'Request supported-version requirements, patch ownership, remediation targets, deployment coverage, and exceptions. Review actual device evidence separately from application release checks.',
        requestLabel: 'Endpoint patching and supported-version evidence',
      },
      {
        id: 'endpoint-offboarding', name: 'Lost devices and offboarding', status: 'Review required',
        description: 'Review how lost devices are reported, credentials are revoked, equipment is returned or erased, and confidential copies are handled. Distinguish device actions from the Console’s session and API-key revocation controls.',
        requestLabel: 'Lost-device response and employee-device offboarding',
      },
    ],
  },
  {
    id: 'network-security',
    name: 'Network Security',
    description: 'Transport protections, exposed services, and permitted network destinations.',
    previewItemIds: ['network-transport', 'network-boundaries', 'network-outbound'],
    items: [
      {
        id: 'network-transport', name: 'Encrypted transport', status: 'Deployment-specific',
        description: 'Customer-facing platform services require HTTPS, and production database connections verify TLS. Review each external connection and managed-service route for the actual transport and trust boundary.',
        controlIds: ['encryption'], resourceIds: ['platform-security'], href: `${securityDocs}/platform-security`,
      },
      {
        id: 'network-boundaries', name: 'Private service boundaries', status: 'Deployment-specific',
        description: 'The production database disables public network access, and the account API uses private ingress. Private Blob containers protect object access; this does not mean that every Azure service has a private network endpoint.',
        controlIds: ['azure-service-identities', 'tenant-separation'], resourceIds: ['platform-security', 'platform-architecture'], href: `${securityDocs}/platform-security`,
      },
      {
        id: 'network-outbound', name: 'Outbound webhook restrictions', status: 'Documented',
        description: 'Webhook destinations require public HTTPS addresses, checked DNS resolution, and constrained network targets. Delivery rejects redirects and uses timeouts and bounded retries; customer receivers remain responsible for verification.',
        controlIds: ['webhook-security'], resourceIds: ['api-integration-security'], href: `${securityDocs}/api-and-integration-security`,
      },
      {
        id: 'network-dns-email', name: 'DNS and email authentication', status: 'Review required',
        description: 'Cloudflare manages domain and DNS services, while Azure delivers platform account email. Request the current domain configuration and SPF, DKIM, and DMARC evidence for the sending domains in scope; no enforcement policy or external grade is inferred.',
        resourceIds: ['hosting-and-providers'], requestLabel: 'DNS, SPF, DKIM, and DMARC configuration review',
      },
      {
        id: 'network-perimeter', name: 'Perimeter and traffic protections', status: 'Review required',
        description: 'Review the deployed firewall, ingress, WAF, DDoS, and traffic-monitoring scope for each hostname and service. Azure or Cloudflare product availability alone does not establish which protections or plans are enabled.',
        resourceIds: ['platform-architecture', 'security-review-guide'], requestLabel: 'Network perimeter and traffic-protection evidence',
      },
    ],
  },
  {
    id: 'corporate-security',
    name: 'Corporate Security',
    description: 'Personnel, workplace, and organizational practices supporting service security.',
    previewItemIds: ['corporate-screening', 'corporate-training', 'corporate-onboarding'],
    items: [
      {
        id: 'corporate-screening', name: 'Personnel screening', status: 'Review required',
        description: 'Request the applicable employee and contractor screening process, legal and role-based limits, responsible owner, and evidence of completion appropriate for the review. No universal background-check program is asserted here.',
        requestLabel: 'Personnel screening scope and evidence',
      },
      {
        id: 'corporate-training', name: 'Security and privacy awareness', status: 'Review required',
        description: 'Review training content, covered personnel, completion evidence, refresh frequency, and follow-up for missed training. Confirm whether role-specific secure-development, privacy, and incident responsibilities are included.',
        requestLabel: 'Security and privacy awareness training evidence',
      },
      {
        id: 'corporate-onboarding', name: 'Confidentiality and onboarding', status: 'Review required',
        description: 'Request the personnel confidentiality, acceptable-use, access-approval, and policy-acknowledgment requirements applicable to employees and contractors handling service information.',
        requestLabel: 'Personnel confidentiality, onboarding, and policy acknowledgment',
      },
      {
        id: 'corporate-offboarding', name: 'Joiner, mover, and leaver process', status: 'Review required',
        description: 'Review ownership and evidence for access approval, role changes, removal, service-credential reassignment, equipment return, and retained information. An application permission feature does not prove completion of personnel procedures.',
        requestLabel: 'Personnel access changes and offboarding process',
      },
      {
        id: 'corporate-physical', name: 'Physical and workplace security', status: 'Review required',
        description: 'Azure provides the underlying data-center environment. Review applicable provider assurance separately from Amlok workplace access, remote-working, visitor, and confidential-information handling practices.',
        resourceIds: ['hosting-and-providers'], requestLabel: 'Physical, workplace, and remote-working security evidence',
      },
      {
        id: 'corporate-incident', name: 'Incident responsibilities', status: 'Documented',
        description: 'Incident coordination covers reporting, triage, containment, evidence, provider coordination, and required communication. Review the approved contacts, notification terms, and response coverage for the contracted service.',
        controlIds: ['incident-response', 'service-responsibilities'], resourceIds: ['incident-response-guide', 'incident-response-plan'], href: `${securityDocs}/incident-response`,
      },
    ],
  },
  {
    id: 'policies',
    name: 'Policies',
    description: 'Public policies and confidential operating documents for an agreed review.',
    previewItemIds: ['policy-information-security', 'policy-access', 'policy-continuity'],
    items: [
      {
        id: 'policy-information-security', name: 'Information Security Policy', status: 'Review required',
        description: 'Request the applicable approved policy, owner, scope, review history, exception process, and supporting procedures. Public control descriptions are a guide to review rather than a substitute for an approved internal policy.',
        requestLabel: 'Information Security Policy and governance scope',
      },
      {
        id: 'policy-access', name: 'Access Control Policy', status: 'Review required',
        description: 'Review personnel and service access approval, least privilege, privileged roles, authentication, periodic review, and removal requirements alongside the documented product controls.',
        resourceIds: ['identity-and-access'], requestLabel: 'Access Control Policy and operating procedures',
      },
      {
        id: 'policy-continuity', name: 'Business Continuity and Disaster Recovery', status: 'Review required',
        description: 'Request the applicable plan, critical dependencies, response roles, recovery objectives, communications, and completed exercise evidence. Review actual recovery coverage for data, documents, identities, and accepted work.',
        resourceIds: ['business-continuity', 'operations-resilience'], requestLabel: 'Business continuity and disaster recovery plan',
      },
      {
        id: 'policy-incident-response', name: 'Incident Response Plan', status: 'Review required',
        description: 'Review incident classification, response ownership, escalation, evidence handling, provider coordination, notification responsibilities, and available exercise evidence under the agreed confidentiality terms.',
        resourceIds: ['incident-response-plan', 'incident-response-guide'], requestLabel: 'Incident Response Plan and escalation responsibilities',
      },
      {
        id: 'policy-privacy', name: 'Privacy and Cookies Policies', status: 'Documented',
        description: 'Public policies describe information use, processing roles, service providers, retention, rights, essential browser storage, and optional website features.',
        resourceIds: ['privacy-policy', 'cookie-policy'], href: '/privacy',
      },
      {
        id: 'policy-retention', name: 'Retention and Deletion Schedule', status: 'Review required',
        description: 'Request the approved schedule for source data, results, financial records, audit events, temporary artifacts, and backups. Review legal holds, source restrictions, deletion responsibilities, and completion evidence.',
        controlIds: ['retention'], resourceIds: ['privacy-requests'], requestLabel: 'Service retention and deletion schedule',
      },
      {
        id: 'policy-suppliers', name: 'Third-Party Risk Management', status: 'Review required',
        description: 'Review supplier approval, data scope, contractual safeguards, Canadian processing, assurance access, incident duties, material changes, and exit responsibilities for the service providers in your deployment.',
        resourceIds: ['institutional-subprocessor-register', 'security-review-guide'], requestLabel: 'Third-party risk and supplier-review procedures',
      },
      {
        id: 'policy-development', name: 'Secure Development and Change Management', status: 'Review required',
        description: 'Request the approved review, release, testing, dependency-risk, emergency-change, and remediation procedures. Compare the required process with release-specific records and results.',
        controlIds: ['software-delivery'], resourceIds: ['secure-product-lifecycle', 'operations-resilience'], requestLabel: 'Secure development and change-management procedures',
      },
      {
        id: 'policy-acceptable-use', name: 'Acceptable Use and Asset Handling', status: 'Review required',
        description: 'Review requirements for device use, confidential information, credential handling, approved tools, remote work, disposal, and reported loss. Request the personnel policy and relevant acknowledgment evidence.',
        requestLabel: 'Acceptable-use and asset-handling policies',
      },
      {
        id: 'policy-ai', name: 'AI Governance and Model Risk', status: 'Review required',
        description: 'Review the approved intended-use, validation, oversight, change, monitoring, and exception requirements for AI and model-enabled workflows. Link the policy to the actual task, version, evidence, and responsible reviewers.',
        resourceIds: ['ai-governance'], requestLabel: 'AI governance and model-risk policy evidence',
      },
    ],
  },
  {
    id: 'security-grades',
    name: 'Security Grades',
    description: 'Review dated external assessments for the hostname and configuration in scope.',
    previewItemIds: ['grade-cryptcheck', 'grade-immuniweb', 'grade-qualys'],
    items: [
      {
        id: 'grade-cryptcheck', name: 'CryptCheck', status: 'Review required',
        description: 'Request a dated CryptCheck assessment for the relevant Amlok domain and service. Review the tested endpoint, configuration, findings, and follow-up; no completed scan or Amlok grade is published in this card.',
        href: 'https://cryptcheck.fr/', requestLabel: 'CryptCheck domain assessment and findings',
      },
      {
        id: 'grade-immuniweb', name: 'ImmuniWeb SSL Security Test', status: 'Review required',
        description: 'Request the SSL/TLS assessment for the selected web or email endpoint, including tested hostname, date, configuration findings, and remediation. A TLS test does not assess all application controls or establish regulatory compliance.',
        href: 'https://www.immuniweb.com/ssl/', requestLabel: 'ImmuniWeb SSL/TLS assessment and remediation',
      },
      {
        id: 'grade-qualys', name: 'Qualys SSL Labs', status: 'Review required',
        description: 'Review a dated SSL Server Test for the specific public hostname and its certificate and transport configuration. Request the actual results; no Amlok score or assessment completion is inferred from the tool’s availability.',
        href: 'https://www.ssllabs.com/ssltest/', requestLabel: 'Qualys SSL Labs hostname assessment',
      },
    ],
  },
];
