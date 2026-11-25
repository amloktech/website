export type LegalSection = { id: string; title: string; paragraphs: string[]; bullets?: string[]; links?: { label: string; href: string }[] };
export type LegalPolicy = { slug: string; title: string; description: string; summary: string[]; sections: LegalSection[] };

export const legalCompany = { name: "Amlok Tech Inc.", email: "support@amlok.tech", address: "15 Iceboat Terrace, Toronto ON M5V 4A5, Canada", corporationNumber: "1461755-0", businessNumber: "783288210" };
// Provider and policy alignment updated locally on 24 November 2026.
// This revision does not amend separately signed agreements by itself.
export const legalRevision = { date: "2026-11-24", label: "Updated November 24, 2026", draft: false };

export const legalPolicies: LegalPolicy[] = [
  {
    "slug": "terms",
    "title": "Terms and Conditions",
    "description": "Website and service responsibilities for Amlok’s financial health intelligence and financial risk assessment technology.",
    "summary": [
      "Amlok Tech Inc. supplies data and analytical technology; institutions remain responsible for their decisions.",
      "Merchant connections have their own authorization and connection terms.",
      "A signed institutional agreement governs the service and commercial terms agreed with that institution."
    ],
    "sections": [
      {
        "id": "scope",
        "title": "Who we are and which terms apply",
        "paragraphs": [
          "These terms concern the website and services operated by Amlok Tech Inc., corporation number 1461755-0, business number 783288210, with its registered business address at 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.",
          "By using the website, you agree to these website-use terms. Paid institutional services, APIs, and workspaces are governed by the applicable service agreement, order form, and processing terms. A separately signed agreement controls the contracted service if there is a conflict, subject to mandatory law and applicable source-provider restrictions.",
          "If you connect a business account through Amlok Hub, the Merchant Connection Terms apply when presented and accepted in the connection process. Visiting this website, installing an app, or requesting a meeting does not by itself authorize disclosure to an institution or purchase an institutional service."
        ],
        "links": [
          {
            "label": "Merchant Connection Terms",
            "href": "/connection-terms"
          },
          {
            "label": "Privacy Policy",
            "href": "/privacy"
          }
        ]
      },
      {
        "id": "service-scope",
        "title": "What Amlok provides",
        "paragraphs": [
          "Amlok provides financial health intelligence and financial risk assessment technology, including authorized data connections, data preparation, analysis, and monitoring where enabled and separately authorized. The institution determines its requested workflow and remains responsible for its own policies, decisions, and obligations.",
          "Amlok does not provide financing or guarantee a financial or commercial outcome through these services. Outputs depend on available source data, scope, freshness, assumptions, and service limitations. They may require correction or further investigation and should not be treated as a guarantee of accuracy or a substitute for appropriate professional judgment.",
          "An integration catalog, illustration, or prospective feature is not a promise that the capability is available in every deployment. Available integrations, permissions, workloads, and service levels are specified in the applicable service arrangement.",
          "The Trust Center and security documentation describe relevant controls, standards, provider roles, and review materials. A framework listing is not a guarantee that every law applies to every workflow, and a provider’s certification does not extend its audit scope to Amlok or your institution."
        ],
        "links": [
          {
            "label": "Trust Center",
            "href": "/trust"
          },
          {
            "label": "Standards and scope",
            "href": "https://docs.amlok.io/security/standards"
          }
        ]
      },
      {
        "id": "website-use",
        "title": "Permitted use and authority",
        "paragraphs": [
          "You may use public website materials to learn about and evaluate Amlok. If you act for an organization, you must have authority for the information you disclose and commitments you make. Protect your credentials and use only accounts and data you are authorized to access."
        ],
        "bullets": [
          "Do not access another organization’s records or bypass authentication, permission, or tenant boundaries.",
          "Do not introduce malware, impair availability, misrepresent your identity, or use the service unlawfully.",
          "Do not request, disclose, export, or reuse data outside the stated purpose, authorization, agreement, or provider permissions.",
          "Do not use Amlok or third-party names and marks to imply an endorsement that has not been authorized."
        ]
      },
      {
        "id": "customer-responsibilities",
        "title": "Institutional responsibilities",
        "paragraphs": [
          "The institution is responsible for the lawful purpose and instructions it supplies, its authorized users, its notices and required permissions, and its handling of data and outputs. Source access does not permit every downstream use, and an institution’s instruction does not remove Amlok’s own legal obligations.",
          "The institution must establish appropriate review, correction, explanation, and rights procedures for decisions it makes using outputs. It must consider evidence gaps and applicable restrictions on profiling or automated consequential decisions. Amlok’s service does not authorize a prohibited use of information.",
          "An institution must identify who can instruct Amlok, the people and records within scope, permitted recipients and purposes, and any restrictions on retention, automated processing, or source data. Instructions must be lawful and consistent with the source permissions. Amlok’s role as a service provider does not authorize it to determine a new unrelated purpose for institution-controlled information."
        ]
      },
      {
        "id": "data",
        "title": "Confidentiality and processing restrictions",
        "paragraphs": [
          "Personal and confidential information is handled under the Privacy Policy and applicable confidentiality and data-processing agreements. The processing schedule should identify permitted purposes, categories, recipients, duration, provider roles, security requirements, rights assistance, and return or deletion obligations.",
          "Connection authorization does not grant unrestricted rights to sell data, use it for unrelated advertising, train models, or create unrelated products. Any separate use must meet applicable law and source-provider conditions and receive any required separate authorization. Neither these terms nor an institution’s general instructions override stricter source restrictions.",
          "Use approved secure channels for sensitive records. General website enquiries and booking notes are intended for business contact details and a brief description of your request.",
          "The applicable processing arrangement also addresses provider oversight and changes, confidentiality, security incidents, assistance with individual requests, and return or deletion of information. Statutory obligations continue to apply. The Trust Center is a review resource, not a substitute for those terms or evidence that a particular assessment has been completed."
        ],
        "links": [
          {
            "label": "Privacy Policy",
            "href": "/privacy"
          },
          {
            "label": "Privacy requests",
            "href": "/privacy-requests"
          }
        ]
      },
      {
        "id": "fees",
        "title": "Commercial terms",
        "paragraphs": [
          "Fees, credits, subscriptions, renewals, payment methods, refunds, and any service levels are set out in the applicable accepted order form or service agreement. Website estimates do not replace that agreement. These terms do not introduce a new price, payment obligation, or change to an existing commercial agreement.",
          "Stripe is Amlok’s payment provider for platform billing and service-credit funding. This relationship is separate from any institution’s borrower disbursements, loan repayments, or customer-payment operations. Payment availability and the collection, refund, and security responsibilities for an enabled payment flow are governed by the applicable service arrangement and provider terms.",
          "Connecting a Shopify store through Amlok is free for the store owner. Amlok does not charge the Shopify merchant for installing the app or authorizing the connection. Any institutional service arrangement is separate from the merchant’s free connection."
        ]
      },
      {
        "id": "cancellation",
        "title": "Suspension, cancellation, and data handling",
        "paragraphs": [
          "Contact support@amlok.tech or your account manager to request institutional account cancellation. The applicable agreement governs commercial cutoffs, closure, exports, and refunds. Do not assume that a portal control exists unless it is available in your service.",
          "We may restrict access where reasonably necessary to address unauthorized use, a security risk, a legal requirement, or a source-provider restriction, subject to the applicable agreement and law. Connection withdrawal, institutional account cancellation, and data deletion are distinct actions.",
          "Privacy and provider deletion obligations apply independently of commercial reconciliation. Account closure or an expired download link is not proof that all data has been erased. Request the applicable deletion confirmation where needed."
        ],
        "links": [
          {
            "label": "Retention and Shopify deletion",
            "href": "/privacy#retention"
          },
          {
            "label": "Merchant connection withdrawal",
            "href": "/connection-terms#withdrawal"
          }
        ]
      },
      {
        "id": "content",
        "title": "Intellectual property and public materials",
        "paragraphs": [
          "Amlok and its licensors retain their rights in software, website content, designs, and marks. Third-party materials remain the property of their owners. Public access does not transfer ownership. Applicable statutory exceptions and separately licensed materials remain unaffected.",
          "You may share links and use public materials for internal evaluation with appropriate attribution. Obtain permission for other reproduction or commercial use unless a license or applicable law permits it. Research, examples, and illustrations apply to their stated context and are not promises of a customer outcome."
        ],
        "links": [
          {
            "label": "Third-party notices",
            "href": "/third-party-notices.txt"
          }
        ]
      },
      {
        "id": "third-parties",
        "title": "Connected and external services",
        "paragraphs": [
          "Amlok uses Microsoft Azure for the institutional platform, Stripe for platform billing, and Cloudflare for website delivery, domain management, and DNS. Authorized financial-data connections can use Flinks and Plaid; Baselayer supplies business-verification and risk information for applicable workflows. The provider register describes their respective roles and the data involved.",
          "Google, Microsoft, and GitHub provide optional user sign-in. GitHub also supports Amlok’s source-code versioning and development workflows. Public documentation is hosted through Mintlify, and Cal.com provides scheduling when requested. A sign-in provider, source-data service, development provider, or linked destination is not automatically a subprocessor for every customer dataset; the activity and applicable agreement determine the role.",
          "Connected sources such as Shopify operate under their own terms and permissions. Availability, records, and interfaces can change. Source-specific use restrictions continue to apply: for example, Baselayer business information must not be used for consumer eligibility decisions prohibited by its terms. A connection does not grant unrestricted access, onward disclosure, or secondary-use rights.",
          "External websites and AI-summary links open services with their own practices. A link does not itself transfer your account or financial records, grant access to them, or imply endorsement."
        ],
        "links": [
          {
            "label": "Cookies Policy",
            "href": "/cookies"
          },
          {
            "label": "Shopify connection responsibilities",
            "href": "/connection-terms#shopify"
          },
          {
            "label": "Provider register",
            "href": "/trust#subprocessors"
          },
          {
            "label": "Hosting and provider responsibilities",
            "href": "https://docs.amlok.io/security/hosting-and-subprocessors"
          },
          {
            "label": "Processing locations",
            "href": "/privacy#locations"
          }
        ]
      },
      {
        "id": "limitations",
        "title": "Limitations and legal protections",
        "paragraphs": [
          "Public information and analytical outputs are not legal, investment, insurance, or other professional advice, and do not promise approval, loss reduction, regulatory compliance, or uninterrupted service. Review information in its context and obtain appropriate advice where needed.",
          "Service warranties, remedies, indemnities, liability limits, and termination rights are governed by the applicable agreement. These website terms do not introduce a monetary liability cap, an arbitration requirement, or a waiver of statutory rights. Nothing excludes obligations or remedies that applicable law does not permit to be excluded."
        ]
      },
      {
        "id": "changes-disputes",
        "title": "Changes and questions",
        "paragraphs": [
          "An effective revision will identify its date. A website update does not by itself amend a separately signed agreement or retrospectively authorize a new data use. Contractual notice and amendment procedures continue to apply.",
          "Contact us about a concern so we can identify the relevant service and agreement. The governing law and dispute arrangements specified in an applicable signed agreement remain subject to mandatory law."
        ]
      },
      {
        "id": "contact",
        "title": "Company and contact details",
        "paragraphs": [
          "Amlok Tech Inc., corporation number 1461755-0, business number 783288210, with its registered business address at 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.",
          "Registration date: December 20, 2022. For privacy, support, legal, and business matters, email support@amlok.tech."
        ],
        "links": [
          {
            "label": "Contact Amlok",
            "href": "mailto:support@amlok.tech"
          }
        ]
      }
    ]
  },
  {
    "slug": "privacy",
    "title": "Privacy Policy",
    "description": "How Amlok handles information across its website, business services, and authorized account connections.",
    "summary": [
      "Amlok provides financial health intelligence and financial risk assessment technology.",
      "A connection identifies the institution receiving your data; ongoing monitoring requires a separate choice.",
      "Contact support@amlok.tech for privacy, access, correction, withdrawal, or deletion requests."
    ],
    "sections": [
      {
        "id": "scope",
        "title": "Who we are and who this policy covers",
        "paragraphs": [
          "Amlok, we, and us mean Amlok Tech Inc., corporation number 1461755-0, business number 783288210, with its registered business address at 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.",
          "This policy covers our website and business communications, Amlok accounts and institutional services, and business users who connect supported data sources through Amlok Hub, including its Shopify connection. It also describes our handling of information about individuals contained in authorized business records. Personal information includes information that identifies a person or can reasonably be linked to a person.",
          "A catalog entry does not mean an integration is enabled or that we collect data from it. Collection depends on the services made available, the institution’s configured workflow, source permissions, and the authorization for the connection."
        ]
      },
      {
        "id": "responsibilities",
        "title": "Amlok, the institution, and the source provider",
        "paragraphs": [
          "We determine the purposes of our own website administration, business communications, account administration, and security activities. For information processed on behalf of an institution, we process the agreed information under documented instructions and the applicable processing agreement. Actual activities and applicable law determine each party’s legal role.",
          "The institution identified in a connection determines its requested assessment and is responsible for its own policies, decisions, notices, and handling of information it receives. Its privacy notice applies to its independent activities. The connected source, such as Shopify, also remains responsible for its own service and records. This policy does not transfer Amlok’s own obligations to either party.",
          "A merchant’s permission to connect a store does not replace notices, consent, or another lawful authority required for personal information about shoppers or other individuals.",
          "Where we process personal information for an institution, our instructions and permitted service purposes define that processing. Where we determine a purpose ourselves, such as account administration or website security, we are responsible for that activity. These roles can differ within the same relationship. We do not treat an institution’s general instruction as authority for an unrelated use or a disclosure prohibited by law."
        ],
        "links": [
          {
            "label": "Merchant Connection Terms",
            "href": "/connection-terms"
          }
        ]
      },
      {
        "id": "information",
        "title": "Information we receive",
        "paragraphs": [
          "The information involved depends on the service and connection. Business records and financial information may contain personal information about owners, representatives, employees, or customers."
        ],
        "bullets": [
          "Information you provide: name, business contact details, organization, role, support correspondence, meeting requests, and account or billing information relevant to your relationship with Amlok.",
          "Sign-in information: your provider account identifier, basic profile details and email, relevant verification information, and the sign-in association when you choose Google, Microsoft, or GitHub. These permissions are separate from financial-source access.",
          "Connection and authorization records: institution and workspace references, provider and account identifiers, selected sources, permitted data and purposes, one-time or monitoring choices, notice versions, and authorization, expiry, or withdrawal events.",
          "Authorized source information: the account, financial, transaction, commerce, document, or verification information specified for the enabled connection. The Shopify scope is described below.",
          "Verification information: business identifiers and submitted details, related business or ownership records, and verification or risk results returned by an enabled service such as Baselayer, limited to the permitted workflow.",
          "Analysis: normalized records, calculated measures, financial health findings, risk indicators, and other outputs generated within the authorized service.",
          "Technical and security information: IP address, device and browser information, request times, service activity, errors, and information needed to protect accounts and investigate misuse."
        ]
      },
      {
        "id": "sign-in",
        "title": "Google, Microsoft, and GitHub sign-in",
        "paragraphs": [
          "When you choose an available Google, Microsoft, or GitHub sign-in option, that provider authenticates you and supplies the permitted basic identity and email information to Amlok. We use it to establish or link your Amlok account, check account eligibility, and protect access. The provider handles its own account and authentication service under its applicable terms and privacy notice.",
          "Console sign-in requests basic profile and email permissions. It does not request Google mail or Drive access, Microsoft mailbox or directory access, or GitHub repository access. Provider access, refresh, and identity tokens are discarded after identity resolution; the Amlok account association and session are separate records.",
          "Disconnecting a sign-in method from Amlok does not delete your provider account or necessarily revoke a consent grant stored by the provider. Use the provider’s account controls for its records, and the Amlok account or privacy-request process for records within our responsibility. Sign-in alone does not authorize a bank-data connection or disclosure to an institution."
        ],
        "links": [
          {
            "label": "Google Privacy Policy",
            "href": "https://policies.google.com/privacy"
          },
          {
            "label": "Microsoft Privacy Statement",
            "href": "https://www.microsoft.com/en-us/privacy/privacystatement"
          },
          {
            "label": "GitHub Privacy Statement",
            "href": "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
          }
        ]
      },
      {
        "id": "financial-and-verification-providers",
        "title": "Financial connections and business verification",
        "paragraphs": [
          "Amlok uses Flinks and Plaid for supported, authorized financial-data connections and Baselayer for applicable business-verification and risk workflows. Which provider is used, the requested information, the recipient institution, and the purpose depend on the enabled connection and the authority for that use. These services are not invoked for every website visitor or every Amlok account.",
          "Financial connections can involve selected account identifiers, ownership information, balances, transactions, and documents where that information is requested and permitted. Business verification can involve business identifiers, submitted business details, associated people, public or licensed records, and verification or risk results. Do not infer that every product offered by a provider, or every field in its privacy policy, is collected by Amlok.",
          "Flinks, Plaid, and Baselayer may have distinct contractual and legal roles for their services, source datasets, security activities, and relationships with you. Their own notices explain those independent activities; our agreement and connection authorization govern processing they perform for Amlok. A provider’s independent source records are not erased merely because an Amlok record is deleted.",
          "Source permissions and permitted-use restrictions apply to the returned information. Baselayer’s business information is not a consumer report and must not be used for personal credit, employment, housing, or other consumer eligibility purposes prohibited by its terms. Contact Amlok and the relevant source about inaccuracies; the institution remains responsible for its decisions."
        ],
        "links": [
          {
            "label": "Flinks privacy information",
            "href": "https://www.flinks.com/privacy-policy"
          },
          {
            "label": "Plaid privacy and service terms",
            "href": "https://plaid.com/legal/"
          },
          {
            "label": "Baselayer Privacy Policy",
            "href": "https://baselayer.com/privacy-policy/"
          },
          {
            "label": "Provider register",
            "href": "/trust#subprocessors"
          }
        ]
      },
      {
        "id": "shopify",
        "title": "Shopify information and permitted purposes",
        "paragraphs": [
          "The Shopify financial-data connection retrieves information needed to assess the authorized business’s financial health and financial risk. This includes store and order identifiers, order dates and statuses, currency and financial amounts, discounts, taxes, shipping totals, cancellations, refunds, transaction amounts and statuses, and relevant line-item descriptions, quantities, and prices.",
          "Where Shopify grants the required permissions, collection can include available orders older than 60 days. Historical information supports analysis of revenue trends, seasonality, stability, refunds, and cancellations. The amount of available history depends on the store’s records and permissions; authorization does not guarantee complete records.",
          "Our financial order query does not request buyer names, email addresses, phone numbers, billing or shipping addresses, payment credentials, or order notes. Order references and financial records can still relate to a person and are treated as protected information. An order label or product name is not a request for the buyer’s name.",
          "Shopify’s required privacy-event messages can include customer identifiers or contact details. We use those messages to identify and handle the request, minimize the information retained, and do not repurpose them to build shopper contact lists.",
          "We share the authorized information and relevant outputs with the institution identified in the connection for the disclosed service. Connecting Shopify does not authorize unrelated advertising, sale of shopper contact lists, or unrestricted reuse of records."
        ]
      },
      {
        "id": "authorization",
        "title": "One-time collection, monitoring, and withdrawal",
        "paragraphs": [
          "Before a connection is authorized, the connection experience must identify the recipient institution, the selected source or accounts, the data and purpose, and the access mode. Only an authorized business representative may grant access. Provider installation permission and authorization to share with an institution are distinct; installation alone does not authorize sharing with an institution.",
          "One-time access permits an initial collection and the work necessary to complete that collection. Ongoing monitoring permits further collections for the disclosed purpose while authorization remains valid. An institution’s choice to offer monitoring does not itself authorize it: the connecting user must separately allow it. Adding another source, store, or recipient requires the applicable authorization.",
          "You may ask us to withdraw a connection or monitoring permission at support@amlok.tech. Identify the institution and business account without including credentials. You may also use the connection controls made available in your deployment. Shopify merchants can uninstall the app through Shopify. Removing the entire app can affect all institutions connected through that installation.",
          "Withdrawal stops future collection under the affected authorization. It does not automatically erase earlier records or copies independently held by an institution or source provider. Deletion requests are assessed separately under the retention section; information that no longer has a permitted purpose must not be kept merely because it was once authorized.",
          "You may choose not to provide optional information or authorize an optional connection. If information is necessary for a requested service, declining or withdrawing access can prevent that service from being provided or updated. The institution is responsible for explaining any effect on its own application or customer relationship. Withdrawal does not by itself end an account or cancel an applicable agreement."
        ],
        "links": [
          {
            "label": "Privacy requests and connection help",
            "href": "/privacy-requests"
          }
        ]
      },
      {
        "id": "purposes",
        "title": "Why we use information and how we limit use",
        "paragraphs": [
          "We use information to provide the authorized financial health and risk assessment service, manage accounts and permissions, deliver requested outputs, answer enquiries, arrange meetings, maintain and secure the service, investigate misuse, and meet applicable legal obligations. We limit collection and use to information needed for those purposes.",
          "The legal authority depends on the activity and jurisdiction, including consent where required, contractual obligations, lawful instructions, and applicable legal or security obligations. A contract with an institution is not a substitute for another person’s consent where the law requires that consent.",
          "Permission to connect an account is not permission to train or improve models using its records or derived information. Any separate use must satisfy applicable law, source-provider restrictions, appropriate notices, and any required separate authorization. General acceptance of these pages does not grant unrestricted training rights.",
          "We do not offer connected Shopify records for unrelated advertising or sale as a data product. Sharing that you authorize with a named institution is disclosed separately from service-provider processing. We assess any applicable legal sale or sharing classification by the actual activity, rather than by the name of the service."
        ]
      },
      {
        "id": "analysis",
        "title": "Analysis and institutional decisions",
        "paragraphs": [
          "Amlok supplies data and analytical outputs for financial health intelligence and financial risk assessment. An institution remains responsible for decisions it makes using those outputs, including the appropriate review, explanations, and rights procedures. Outputs may be incomplete, may contain errors, and must be considered with their source dates, assumptions, and limitations.",
          "If a workflow involves profiling or automated processing with legal or similarly significant effects on an individual, the applicable notices, lawful basis, and review or opt-out rights must be addressed for that workflow. Describing an output as intelligence does not remove those obligations. Contact us and the identified institution about a relevant objection, correction, or request for human review; we will coordinate the part within our responsibility.",
          "Where applicable law gives you rights concerning an automated decision, you can ask about the personal information used, the reasons and principal factors behind the decision, correction of inaccurate information, and review by a person able to reconsider it. Contact the decision-making institution and Amlok for the relevant parts of that request. Describing a person as involved does not establish meaningful review if that person cannot affect the decision."
        ]
      },
      {
        "id": "website-features",
        "title": "Website, communications, and scheduling",
        "paragraphs": [
          "Website contact and journal-signup features prepare a message in your email application. Preparing a draft does not submit it to an Amlok website form database; we receive it when you send it. Your email provider handles drafts and messages under its own terms.",
          "The website requests Cal.com’s booking script when you select a scheduling link. Amlok does not automatically forward the page’s query parameters to the booking experience. When you open scheduling, Cal.com receives associated technical requests and the information you choose to submit. Keep personal or confidential information out of website URLs and booking notes.",
          "Some pages request institution logos from the institution’s own website or an external asset host. Your browser sends technical request information, including an IP address and browser details, to that host when it loads the image. Displaying a logo does not give that institution access to your Amlok account or financial records, and does not make it an Amlok-contracted subprocessor.",
          "External links, including social and AI-summary links, take you to services with their own practices. Optional marketing requests are separate from necessary service communications; contact us to stop optional messages."
        ],
        "links": [
          {
            "label": "Cookies Policy",
            "href": "/cookies"
          },
          {
            "label": "Cal.com Privacy Policy",
            "href": "https://cal.com/privacy"
          }
        ]
      },
      {
        "id": "sharing",
        "title": "Recipients and service providers",
        "paragraphs": [
          "Information is disclosed to the institution identified in your authorized connection and the personnel it authorizes for the stated purpose. Service providers receive information appropriate to the function they perform and the applicable agreement. The register separates institutional processing, billing, identity services, development services, and the public website.",
          "Not every listed provider receives borrower records, and not every service provider acts solely as an Amlok subprocessor. Identity providers and financial-data services may also handle information independently under their own notices. An integration catalog lists available or prospective connections; it is not a declaration that every listed company receives your information.",
          "The main provider functions are listed below. Review the Trust Center and deployment-specific processing schedule for the contracted entity, services, data categories, locations, onward providers, and applicable change-notice process. These public descriptions do not replace a signed data-processing agreement.",
          "Provider appointments and material changes to processing follow the applicable agreement and legal requirements, including any required notice, authorization, or opportunity to object. A public provider entry does not itself authorize a new purpose or override a contractual restriction. Ask support@amlok.tech for the change process applicable to your service.",
          "Information may also be disclosed when legally required or lawfully necessary to protect systems or people, investigate misuse, resolve a dispute, or complete a corporate transaction subject to applicable confidentiality and data-protection safeguards. Disclosure remains limited by applicable law and source-provider restrictions."
        ],
        "links": [
          {
            "label": "Trust Center provider register",
            "href": "/trust#subprocessors"
          },
          {
            "label": "Hosting and provider information",
            "href": "https://docs.amlok.io/security/hosting-and-subprocessors"
          }
        ],
        "bullets": [
          "Microsoft Azure: institutional-platform hosting, account and product services, database and artifact storage, secrets, operational monitoring, and transactional account email. The information depends on the hosted service.",
          "Stripe: platform billing and service-credit funding, including billing identity and payment or transaction information required by the enabled payment flow. This is separate from borrower payments and from any authorized Stripe financial-data connection.",
          "Flinks and Plaid: authorized financial-data connections, involving the information selected and permitted for the configured service.",
          "Baselayer: business-verification and risk information, involving the permitted business details, related-person information, source records, and returned results for the applicable workflow.",
          "Google, Microsoft, and GitHub: optional user sign-in, involving basic identity, email, authentication, and account-association information. Microsoft’s identity role is distinct from Azure platform hosting.",
          "GitHub development services: source-code versioning and development workflows, including contributor details, repository content, change history, and workflow metadata. Source control is not the designated repository for customer financial records; sensitive customer information must use approved channels.",
          "Cloudflare: public website delivery, domain management, and DNS, involving domain and administrative records and relevant network-request metadata. Domain management does not itself make Cloudflare the host of the institutional application database.",
          "Cal.com: requested meeting scheduling, involving booking details and associated technical requests.",
          "Mintlify: public documentation hosting, involving documentation content and relevant visitor or interaction information. Visiting documentation is separate from authorizing access to institutional account records."
        ]
      },
      {
        "id": "locations",
        "title": "Processing locations",
        "paragraphs": [
          "Amlok’s institutional platform is hosted on Microsoft Azure in Canada, with Canada Central used for core hosting. Processing carried out under Amlok’s provider arrangements is contractually restricted to Canada, including storage, backups, and support access. The applicable agreement and processing schedule identify the services and information covered by that restriction.",
          "This restriction concerns the processing performed for Amlok. It does not mean every provider is headquartered in Canada or that its independent services operate only in Canada. For example, your existing Google, Microsoft, or GitHub account and a provider’s independently maintained source records remain subject to that provider’s own relationship with you and applicable privacy notice.",
          "Provider corporate location, Amlok-contracted processing location, and an independent service’s processing are distinct. Review the relevant service terms before connecting an account or requesting an optional service. Contact support@amlok.tech for the processing schedule and transfer safeguards applicable to your service; a change to this webpage does not broaden an agreed geographic restriction.",
          "Canadian processing can still involve a transfer outside your province. Where Québec law applies, relevant handling outside Québec, including elsewhere in Canada, requires the applicable privacy assessment and written safeguards. The Canadian contractual restriction remains in place; a legal rule permitting an international transfer does not itself authorize Amlok to disregard it."
        ],
        "links": [
          {
            "label": "Provider locations and responsibilities",
            "href": "/trust#subprocessors"
          },
          {
            "label": "Hosting documentation",
            "href": "https://docs.amlok.io/security/hosting-and-subprocessors"
          }
        ]
      },
      {
        "id": "retention",
        "title": "Retention, deletion, and uninstalling Shopify",
        "paragraphs": [
          "We retain personal information only for as long as necessary for the stated purposes, subject to applicable law and source-provider restrictions. Relevant criteria include the authorized service duration, whether the purpose is still active, agreed retention requirements, request handling, and specific legal retention obligations. A connection’s available history is not an indefinite retention permission.",
          "Raw source records, normalized records, outputs, exports, authorization evidence, security logs, correspondence, and billing records can require different schedules. Contact support@amlok.tech for the schedule applicable to your service. The Console does not currently provide a customer-configurable retention setting. A request acknowledgment is not confirmation that deletion has been completed.",
          "For Shopify Merchant Data, the applicable API terms generally require deletion of originals, copies, and reproductions within 30 days of uninstalling the app, when the data is no longer needed to provide the permitted service, or following an enforceable deletion request. An applicable legal requirement may prohibit or vary deletion. Where that exception applies, retained information is limited to the required purpose; it does not authorize continued collection or unrelated analysis. Shopify must be notified when its deletion requirement cannot be met.",
          "Shopify data-request and redaction events must also be handled within the applicable provider deadlines. A commercial billing cycle or month-end cancellation process does not extend a privacy or provider deletion deadline.",
          "Deletion must address relevant source records, normalized data, derived records, files, exports, and backups, including preventing erased records from being restored into active use. Any legal exception or backup handling affecting completion must be identified in the response. Amlok deletion does not remove original records held independently by Shopify or another source, and the recipient institution must address copies it holds under its own responsibilities.",
          "A legal hold or other retention exception must have an identified basis and scope. Information retained for that purpose is restricted to authorized access and must be reviewed when the reason ends. Backup expiry, restricted recovery copies, and necessary billing or security records must be accounted for in the applicable schedule and completion response. We do not treat an unspecified future use as justification for indefinite retention."
        ],
        "links": [
          {
            "label": "Request deletion or withdrawal",
            "href": "/privacy-requests"
          },
          {
            "label": "Shopify API terms",
            "href": "https://www.shopify.com/legal/api-terms"
          }
        ]
      },
      {
        "id": "security",
        "title": "Safeguards and secure communications",
        "paragraphs": [
          "Our safeguards are intended to protect information through measures such as scoped access, tenant separation, encryption, and controlled handling of credentials. The controls and assurance materials applicable to a service must be assessed for that deployment. This policy is not a certification and no transmission or storage method eliminates all risk.",
          "Azure supplies the underlying platform services; Amlok remains responsible for its application, configuration, access, and agreed processing. Stripe’s payment-service assurance and other providers’ reports apply to their stated scope. A framework or provider badge is not a substitute for assessing the controls, evidence, and responsibilities that apply to your service.",
          "Do not send passwords, access tokens, complete financial files, identity documents, or sensitive account records in an ordinary support email or booking note. We will identify an approved secure channel if additional information is needed."
        ],
        "links": [
          {
            "label": "Security information",
            "href": "/security-compliance"
          },
          {
            "label": "Trust Center",
            "href": "/trust"
          },
          {
            "label": "Standards and framework scope",
            "href": "https://docs.amlok.io/security/standards"
          }
        ]
      },
      {
        "id": "security-incidents",
        "title": "Security incidents and breach communications",
        "paragraphs": [
          "Report a suspected security or privacy incident to support@amlok.tech or your agreed incident contact. Identify the service, approximate time, and concern without including credentials or complete sensitive records. Use the secure channel we identify if further evidence is needed.",
          "Incident handling includes assessing the information and people affected, limiting harm, coordinating with relevant providers and institutions, preserving necessary evidence, and considering required notifications. Where Amlok processes information for an institution, its incident obligations and the assistance it provides follow applicable law and the processing agreement; coordination does not remove either party’s own responsibilities.",
          "We provide required notices and regulatory reports under the thresholds and timelines applicable to the incident. Depending on the law, a record may be required even when individual notification is not. Required communications explain the nature of the incident, relevant information and risks, available protective steps, and a contact for further information to the extent known and legally permitted. An initial notice may be supplemented as the investigation develops."
        ],
        "links": [
          {
            "label": "Incident-response guidance",
            "href": "https://docs.amlok.io/security/incident-response"
          },
          {
            "label": "Contact Amlok",
            "href": "mailto:support@amlok.tech"
          }
        ]
      },
      {
        "id": "rights",
        "title": "Your rights and complaints",
        "paragraphs": [
          "Depending on applicable law and the circumstances, you may have rights to information about processing, access, correction, deletion, portability, objection, restriction, withdrawal of consent, and review of certain automated processing. Rights can have conditions and lawful exceptions. Withdrawing consent does not invalidate earlier lawful processing.",
          "Send privacy requests to support@amlok.tech. We may verify identity or authority using proportionate information and will coordinate with the responsible institution where needed. Requests concerning Shopify shoppers may be made through the merchant; we assist the merchant with data within our control. Correcting source information may also require reviewing affected outputs.",
          "We handle requests within applicable legal and source-provider deadlines. You may also complain to the relevant regulator, including the Office of the Privacy Commissioner of Canada or another competent provincial, state, or national authority. This policy does not limit statutory rights.",
          "You may use an authorized representative where the law allows. We may ask for proof of the representative’s authority and proportionate identity confirmation, without collecting more information than needed. You do not need to create a new Amlok account solely to submit a privacy request. We do not penalize the lawful exercise of privacy rights; any necessary service limitation caused by withdrawal is explained separately.",
          "If a request is limited or refused, we explain the applicable reason and available review or complaint route, subject to lawful restrictions. Where an appeal right applies, you may request that review through support@amlok.tech. PIPEDA, applicable provincial privacy laws, and U.S. privacy or financial-sector rules have different scope, exemptions, and rights; this policy does not assert that every regime applies to every person or service."
        ],
        "links": [
          {
            "label": "How to make a privacy request",
            "href": "/privacy-requests"
          },
          {
            "label": "Office of the Privacy Commissioner of Canada",
            "href": "https://www.priv.gc.ca/en/report-a-concern/"
          },
          {
            "label": "Canadian and U.S. privacy scope",
            "href": "https://docs.amlok.io/security/standards"
          }
        ]
      },
      {
        "id": "children",
        "title": "Children and business records",
        "paragraphs": [
          "Our website and connection services are intended for authorized business users, not for children to open accounts. Do not submit children’s information through general enquiries or booking fields. Business records may nevertheless contain information about individuals who are not users of Amlok; such information remains subject to the applicable purpose and safeguards. Contact support@amlok.tech about information that should not have been provided."
        ]
      },
      {
        "id": "changes-contact",
        "title": "Changes and contact",
        "paragraphs": [
          "We will identify the date of an effective policy revision and provide further notice or obtain consent where required. Posting a policy does not authorize an unrelated new use of information or amend a signed agreement by itself.",
          "Address privacy, access, correction, deletion, and complaint enquiries to the person responsible for privacy protection through support@amlok.tech. The same address handles support, legal, and business enquiries. Mail: Amlok Tech Inc., 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada."
        ],
        "links": [
          {
            "label": "Email Amlok",
            "href": "mailto:support@amlok.tech"
          },
          {
            "label": "Terms and Conditions",
            "href": "/terms"
          }
        ]
      }
    ]
  },
  {
    "slug": "cookies",
    "title": "Cookies Policy",
    "description": "Browser storage, embedded services, and the choices relevant to Amlok’s website and connection services.",
    "summary": [
      "The website stores a language preference in local storage.",
      "Cal.com scheduling is a separate embedded service.",
      "Browser settings let you review and clear stored site data."
    ],
    "sections": [
      {
        "id": "scope",
        "title": "Cookies and similar technologies",
        "paragraphs": [
          "Cookies are small records a website or service can place in your browser and receive with later requests. Local storage also keeps information in your browser, but is accessed by page scripts rather than automatically attached to every request. Embedded scripts can contact a provider even if no cookie is stored.",
          "This policy is provided by Amlok Tech Inc., corporation number 1461755-0, business number 783288210, with its registered business address at 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada. The website inventory below applies to amlok.io. Authenticated services, embedded connection flows, documentation, and source-provider authorization pages can use different storage; their roles are distinguished below."
        ]
      },
      {
        "id": "inventory",
        "title": "What this website uses",
        "paragraphs": [
          "The following inventory describes the website’s implemented features. Storage associated with external infrastructure or scheduling can depend on your browser, settings, and interaction with that service."
        ],
        "bullets": [
          "Language preference: key: amlok-language. Technology: first-party local storage. Purpose: remember the selected language. Duration: until you change it, clear site data, or the browser removes it.",
          "Cal.com booking: third-party script served from app.cal.com. Purpose: initialize and display scheduling when you select a booking link. The script is not requested automatically on page load. Any service-specific storage after opening scheduling follows the provider’s configuration and policy.",
          "Website delivery and domains: Cloudflare serves the website and provides domain management and DNS. Website delivery involves technical network requests; domain management and DNS are distinct from a browser advertising tracker. Infrastructure storage or security mechanisms depend on the enabled service and configuration, so no fixed security-cookie lifetime is asserted here.",
          "Externally hosted images: some institution logos load from the institution’s website or asset hosts such as Contentful and Webflow. The browser contacts the relevant host to fetch the image. This can disclose technical request information even if no cookie is set; these requests are separate from Amlok’s contracted platform processing.",
          "Advertising and analytics: the current website implementation does not include a first-party advertising tracker or a configured analytics tag such as Google Analytics. This statement does not describe all independent processing by an external service."
        ],
        "links": [
          {
            "label": "Cal.com privacy and cookie information",
            "href": "https://cal.com/privacy"
          },
          {
            "label": "Cloudflare Privacy Policy",
            "href": "https://www.cloudflare.com/privacypolicy/"
          }
        ]
      },
      {
        "id": "connected-services",
        "title": "Authenticated services and connection flows",
        "paragraphs": [
          "Authenticated Amlok services use sessions and security mechanisms to maintain sign-in and protect access. Some Console screens store interface preferences or temporary invitation and authorization-flow state. These mechanisms are separate from the marketing website’s language preference.",
          "Choosing Google, Microsoft, or GitHub sign-in sends you through that provider’s authentication service. The provider controls storage on its own domain; Amlok uses its own session and short-lived sign-in-state mechanisms. Basic identity sign-in does not request access to your mailbox, cloud files, or source-code repositories.",
          "Amlok Hub can be opened as a hosted link or embedded in an institution’s website. The institution controls its own cookies and tracking. Flinks, Plaid, Shopify, and other enabled connection providers control storage used by their own authorization or connection experiences. Baselayer verification and Stripe payment services can have separate provider interactions where the relevant feature is enabled; their inclusion in the provider register does not mean their scripts run on every page.",
          "The documentation at docs.amlok.io is hosted through Mintlify and has its own reader experience. Its storage and interaction handling are distinct from the public website inventory above. Review the notice and controls applicable to the service you open.",
          "Clearing browser storage does not revoke server-side access to a connected source or request deletion of previously collected records. Use the withdrawal or privacy-request process for those actions. Contact support@amlok.tech for the inventory applicable to your service."
        ],
        "links": [
          {
            "label": "Withdraw access or request deletion",
            "href": "/privacy-requests"
          },
          {
            "label": "Sign-in information",
            "href": "/privacy#sign-in"
          },
          {
            "label": "Provider register",
            "href": "/trust#subprocessors"
          },
          {
            "label": "Hosting and service scope",
            "href": "https://docs.amlok.io/security/hosting-and-subprocessors"
          }
        ]
      },
      {
        "id": "console-storage",
        "title": "Console storage and sign-in security",
        "paragraphs": [
          "The Console uses first-party storage for authenticated access and interface state. The inventory below describes the current application configuration; an authentication-state lifetime does not determine how long underlying account, audit, billing, or financial records are retained.",
          "Sign-out revokes the Amlok session and clears its session cookie. Clearing a browser cookie alone does not necessarily revoke every server-side session or an independent provider authorization. Review your account’s sessions and sign-in methods as well as browser storage when you want to remove access."
        ],
        "bullets": [
          "Amlok session cookies: maintain database-backed sign-in. Session lifetime is configured for seven days with renewal during continued use; sessions can end earlier through revocation or sign-out. Production session cookies use HttpOnly, Secure, and SameSite=Lax protections. Session tokens are not stored in local storage.",
          "OAuth and multi-factor state: short-lived security state links a sign-in request to its response and prevents replay. The multi-factor challenge is configured for up to ten minutes. This state does not grant access to your mailbox, files, repositories, or financial accounts.",
          "Workspace invitations: the Console uses tab session storage and a narrowly scoped, HttpOnly continuation cookie to resume an invitation. The continuation expires with the invitation and is cleared on acceptance. It is separate from the provider’s sign-in service.",
          "Interface preferences: the sidebar_state cookie remembers whether the Console sidebar is expanded, with a configured lifetime of seven days. Some setup notices use local storage; Sandbox preparation and dismissal state can use tab session storage. These are interface records, not a record of consent for financial-data collection.",
          "Email preferences: a temporary token may be retained in tab session storage while you complete the email-preference flow. Keeping a page open does not itself authorize unrelated marketing or financial-source access."
        ],
        "links": [
          {
            "label": "Privacy and retention",
            "href": "/privacy#retention"
          },
          {
            "label": "Sign-in information",
            "href": "/privacy#sign-in"
          }
        ]
      },
      {
        "id": "scheduling",
        "title": "Scheduling and URL information",
        "paragraphs": [
          "Automatic forwarding of page query parameters into the Cal.com booking experience is disabled. Parameters are the portion of a URL following a question mark, such as a campaign reference. Keep personal or confidential information out of website URLs.",
          "When you open or submit a booking, Cal.com handles the associated technical requests and the details you provide. The booking provider’s policy explains its own information handling. You may contact Amlok by email if you prefer not to use the calendar."
        ],
        "links": [
          {
            "label": "Contact Amlok by email",
            "href": "mailto:support@amlok.tech"
          }
        ]
      },
      {
        "id": "controls",
        "title": "Managing browser storage",
        "paragraphs": [
          "Use your browser’s privacy or site-data settings to inspect, block, or remove cookies and local storage. Clear data for this website’s domain to remove the saved language preference. If you also want to manage an external provider’s stored data, review that provider’s domain separately.",
          "Clearing site data can reset preferences and sign you out of services whose data you remove. Blocking necessary cookies or scripts may prevent sign-in, invitation completion, financial connection, or requested scheduling from working. Browser controls usually apply to that browser and device; changing one does not necessarily update another.",
          "This page does not present a cookie-consent switch because the site does not implement a category-based consent manager. A displayed preference control should not be interpreted as blocking third-party requests unless it actually does so."
        ],
        "links": [
          {
            "label": "Chrome: manage cookies",
            "href": "https://support.google.com/chrome/answer/95647"
          },
          {
            "label": "Firefox: clear cookies and site data",
            "href": "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
          },
          {
            "label": "Safari: manage website data",
            "href": "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
          },
          {
            "label": "Edge: manage cookies",
            "href": "https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
          }
        ]
      },
      {
        "id": "preferences",
        "title": "Language preference and enquiry forms",
        "paragraphs": [
          "The saved language value is used by the site’s language controls. You can change the selection through those controls or remove the amlok-language entry through your browser’s site-data tools. Local storage has no application-set expiry for this preference.",
          "Contact and journal signup features prepare email drafts. They do not set a separate submission cookie or automatically add you to a mailing list merely because you type in a field. Your email provider handles the message after the draft is opened, and Amlok receives it when sent."
        ]
      },
      {
        "id": "external-links",
        "title": "External links and privacy signals",
        "paragraphs": [
          "Links to social networks, research sources, documentation, and AI-summary services open those destinations under their own storage and privacy practices. Amlok’s browser preference does not control those services.",
          "This website does not implement a custom response to the legacy Do Not Track signal or a dedicated Global Privacy Control handler. Browser-level blocking and applicable statutory rights remain available. Contact support@amlok.tech for a question about a privacy signal or request; this notice does not limit rights under applicable law.",
          "A provider’s own consent or privacy controls do not change permissions for every Amlok service. Where applicable law requires an opt-out, consent, or privacy-signal response for a particular activity, that obligation must be assessed for the actual activity; the absence of a custom website control does not remove statutory rights. Contact support@amlok.tech about a choice you cannot exercise through the displayed controls."
        ]
      },
      {
        "id": "changes",
        "title": "Changes and questions",
        "paragraphs": [
          "We will update this inventory when the website’s implemented storage or embedded services change. If optional tracking is introduced, its purposes, providers, and required choice mechanisms should be reflected in the website and this policy.",
          "For questions about website storage, contact support@amlok.tech. The Privacy Policy explains the broader use of personal information, disclosures, retention, and requests.",
          "Amlok Tech Inc., 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada. Privacy, support, legal, and business contact: support@amlok.tech."
        ],
        "links": [
          {
            "label": "Email privacy",
            "href": "mailto:support@amlok.tech"
          },
          {
            "label": "Privacy Policy",
            "href": "/privacy"
          }
        ]
      }
    ]
  },
  {
    "slug": "connection-terms",
    "title": "Merchant Connection Terms",
    "description": "Terms for authorizing Amlok Hub to connect business accounts and share data with a specified institution.",
    "summary": [
      "Only connect accounts you are authorized to represent.",
      "Review the institution, data, purpose, and access mode before authorizing a connection.",
      "Ongoing monitoring is optional authorization, separate from an institution’s choice to offer it."
    ],
    "sections": [
      {
        "id": "agreement",
        "title": "Your connection agreement",
        "paragraphs": [
          "These terms are between you, acting for the business you are authorized to represent, and Amlok Tech Inc. They govern Amlok Hub and supported business-account connections when these terms are presented and accepted during authorization. They do not make you a party to the institution’s separate Amlok subscription.",
          "Amlok provides technology for financial health intelligence and financial risk assessment. A connection permits specified business information to be collected and shared with the institution identified to you for the disclosed purpose. The institution’s own relationship with you is governed by its notices and agreements."
        ],
        "links": [
          {
            "label": "Amlok Privacy Policy",
            "href": "/privacy"
          },
          {
            "label": "General Terms and Conditions",
            "href": "/terms"
          }
        ]
      },
      {
        "id": "authority",
        "title": "Your authority and responsibilities",
        "paragraphs": [
          "You must have authority to connect the selected business account and grant the specified permissions. Check the institution and account details before confirming. Do not connect accounts belonging to another business without authority or provide passwords or access tokens to an unauthorized person.",
          "You remain responsible for notices, consent, or other lawful authority required for information about shoppers or other individuals within your business records. Installing an app does not override those obligations, provider restrictions, or an individual’s rights.",
          "Provide accurate connection details and notify Amlok or the institution if authority changes or an account should no longer be accessed. Where the records identify other people, use the service only for the disclosed lawful business purpose and respect any source-specific restrictions. A technical ability to connect is not proof that all required notices or permissions exist."
        ]
      },
      {
        "id": "permission",
        "title": "The permission you give",
        "paragraphs": [
          "When you confirm a connection, you authorize Amlok to retrieve the specified information, process it for the disclosed service, and provide the authorized information and outputs to the named institution. We may use service providers as described in the Privacy Policy to carry out that service. Permission is limited by the selected source, accounts, purpose, access mode, and applicable provider rules.",
          "For Shopify, the scope is financial order information and relevant store references, including historical orders where approved. The financial order query excludes buyer names, emails, phone numbers, billing and shipping addresses, payment credentials, and order notes. Required privacy-event processing is described separately in the Privacy Policy.",
          "Installing the Shopify app alone does not authorize sharing with an institution. Each additional account, store, or recipient requires the applicable authorization. An order-history permission is not unrestricted access to every Shopify data field.",
          "Flinks and Plaid can provide supported financial connections; Baselayer can supply business-verification and risk information where the workflow and permitted use apply. The authorization notice and provider permissions identify the information actually involved. Choosing Google, Microsoft, or GitHub to sign in does not itself authorize a financial connection or an institution’s access to your records.",
          "If a purpose, recipient, or requested data category changes materially, the applicable notice and authorization must be addressed before that changed collection or disclosure. A provider’s ordinary interface update does not expand the permission you granted. Geographic processing commitments and safeguards are described in the Privacy Policy and applicable agreement."
        ],
        "links": [
          {
            "label": "Shopify data and purposes",
            "href": "/privacy#shopify"
          },
          {
            "label": "Financial and verification providers",
            "href": "/privacy#financial-and-verification-providers"
          },
          {
            "label": "Processing locations",
            "href": "/privacy#locations"
          }
        ]
      },
      {
        "id": "monitoring",
        "title": "One-time access and ongoing monitoring",
        "paragraphs": [
          "One-time access permits the initial collection and steps needed to complete it. Ongoing monitoring permits further collections for the disclosed purpose while the authorization remains active. We do not treat an institution’s widget setting as your consent to monitoring.",
          "If monitoring is offered, you can choose whether to allow it. Declining monitoring does not authorize it indirectly through acceptance of these terms. Any effect on the institution’s own service must be explained by that institution."
        ]
      },
      {
        "id": "withdrawal",
        "title": "Withdrawal, disconnection, and deletion",
        "paragraphs": [
          "You can request withdrawal of a connection or monitoring permission at support@amlok.tech or use the controls available in your deployment. Include the business, source account, and institution without sending credentials. Shopify merchants can uninstall the app in Shopify; uninstalling affects the app installation and may affect multiple connected institutions.",
          "Withdrawal stops future collection under the affected authorization. It does not by itself erase information already collected or information independently retained by an institution or source. Request deletion separately; applicable law, source-provider obligations, and permitted exceptions govern what must be erased and the deadline. The Shopify-specific rules are described in the Privacy Policy.",
          "An institution’s commercial cancellation or billing schedule cannot extend an applicable privacy or source-provider deletion deadline."
        ],
        "links": [
          {
            "label": "Privacy requests",
            "href": "/privacy-requests"
          },
          {
            "label": "Retention and deletion",
            "href": "/privacy#retention"
          }
        ]
      },
      {
        "id": "institution",
        "title": "The institution’s use and decisions",
        "paragraphs": [
          "The identified institution is responsible for the purpose it requests, its access to received information, its policies and decisions, and its notices and rights procedures. Amlok is responsible for the parts of the service and processing within its own control.",
          "Amlok does not provide financing through the connection or guarantee an institution’s decision. Data and analysis can contain gaps or errors. Contact Amlok about a connection or processing error, and contact the institution about its decision, review, or correction process.",
          "For a decision that affects you, ask the institution for the explanation, correction, or human-review process required by applicable law. Amlok assists with the records and processing within its responsibility. Rights to challenge a decision are distinct from withdrawing an account connection or requesting deletion."
        ]
      },
      {
        "id": "shopify",
        "title": "Shopify-specific responsibilities",
        "paragraphs": [
          "Amlok Tech Inc. is solely responsible for the Amlok application, its development, operation, marketing, distribution, and support, and for Amlok’s access, use, distribution, and storage of Merchant Data.",
          "Shopify is not responsible for faults in the Amlok application or harm resulting from its installation or use. Unless Shopify expressly states otherwise, Shopify does not provide assistance with installing or using Amlok. Amlok is solely responsible for liability arising from your access to or use of the Amlok application and its handling of Merchant Data, subject to applicable law.",
          "The connection does not require exclusivity after these terms end, prohibit lawful development of competing products, or restrict your freedom to conduct business with other parties. Confidentiality, intellectual-property, and lawful data-use obligations still apply."
        ],
        "links": [
          {
            "label": "Amlok application support",
            "href": "mailto:support@amlok.tech"
          }
        ]
      },
      {
        "id": "availability",
        "title": "Availability, fees, and ending access",
        "paragraphs": [
          "Source permissions, provider availability, and data completeness can change. We may suspend access to address unauthorized use, security risks, legal requirements, or provider restrictions. Ending access does not remove applicable privacy or deletion obligations.",
          "Connecting a Shopify store is free for the store owner: Amlok does not charge the merchant for installing the app or authorizing the connection. Connecting does not enroll you in an institutional subscription. These terms do not guarantee a financing outcome, impose a new monetary liability cap, or waive statutory rights."
        ]
      },
      {
        "id": "changes",
        "title": "Changes and contact",
        "paragraphs": [
          "Material changes to the authorized purpose or recipient require appropriate notice and authorization before that changed processing. A revision to a webpage does not expand an existing connection permission.",
          "Amlok Tech Inc., corporation number 1461755-0, business number 783288210, with its registered business address at 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.",
          "For connection, privacy, support, or legal requests, contact support@amlok.tech. Applicable mandatory law and any separately agreed lawful dispute procedures remain unaffected."
        ],
        "links": [
          {
            "label": "Email Amlok",
            "href": "mailto:support@amlok.tech"
          }
        ]
      }
    ]
  },
  {
    "slug": "privacy-requests",
    "title": "Privacy Requests",
    "description": "How to ask about your information, withdraw a connection, or request access, correction, or deletion.",
    "summary": [
      "Use support@amlok.tech for every privacy or connection request.",
      "Include enough context to identify the request, without sending passwords or sensitive documents.",
      "Requests are verified and handled through support; this page is not an automated deletion portal."
    ],
    "sections": [
      {
        "id": "contact",
        "title": "Send your request",
        "paragraphs": [
          "Email support@amlok.tech with a subject such as “Privacy request” or “Withdraw connection.” You can also write to Amlok Tech Inc., 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada.",
          "Tell us which business or institution the request concerns, the service or source involved, the type of request, and a contact method. A store domain or connection reference can help. Provide only the information needed to locate the relationship.",
          "You do not need to open a new account to make a request. If you cannot use email, write to the mailing address above and include a safe way for us to respond. Mark the request for the person responsible for privacy protection."
        ],
        "links": [
          {
            "label": "Email a privacy request",
            "href": "mailto:support@amlok.tech?subject=Privacy%20request"
          }
        ]
      },
      {
        "id": "options",
        "title": "What you can request",
        "paragraphs": [
          "Available rights depend on the applicable law and circumstances. Tell us what you need even if you are unsure which category applies."
        ],
        "bullets": [
          "Information about collection, recipients, purposes, retention, provider roles, Canadian processing commitments, or applicable safeguards.",
          "Access to information, a copy in an applicable portable format, or correction of inaccurate records.",
          "Deletion, restriction, objection, or withdrawal of consent where applicable.",
          "Withdrawal of a specific connection or ongoing monitoring permission.",
          "Assistance with applicable automated-processing review or opt-out rights, or a privacy complaint.",
          "An explanation of the personal information and principal factors used in an applicable automated decision, and routing to the responsible person or institution for meaningful review."
        ]
      },
      {
        "id": "verification",
        "title": "Verification and secure handling",
        "paragraphs": [
          "We may need to verify your identity or authority and the affected account, institution, or records. Verification should be proportionate to the sensitivity and request. Do not send passwords, API tokens, banking credentials, identity-document scans, or complete financial records in the initial email.",
          "If additional evidence is necessary, we will explain the approved secure method. A support acknowledgment means the request has been received; it is not confirmation that data has been delivered or erased.",
          "An authorized representative may act where applicable law permits. We may request written authority or other appropriate evidence and, when necessary and permitted, confirmation from the individual. Verification must not become a reason to collect unrelated information. We will explain any additional information needed to identify the records or confirm authority."
        ]
      },
      {
        "id": "relationships",
        "title": "Institutions, connected businesses, and source-provider records",
        "paragraphs": [
          "If you connected your business account, identify the institution and source you want us to review. If you are a shopper whose information is held by a Shopify merchant, the merchant can initiate Shopify’s data-request or deletion process. You may also contact Amlok about information within our responsibility.",
          "For information processed on behalf of an institution or merchant, we coordinate with the responsible organization and assist within our role. We do not disclose another customer’s information without verifying authority. Independent copies held by the institution or original source require that party’s own handling.",
          "For a Flinks, Plaid, or Baselayer record, identify the provider and affected business or connection. We coordinate requests for information within Amlok’s responsibility; a provider’s independent source records or your Google, Microsoft, or GitHub account may require a request to that provider. Disconnecting an Amlok sign-in method and deleting a provider account are separate actions."
        ],
        "links": [
          {
            "label": "Provider roles and contacts",
            "href": "/trust#subprocessors"
          },
          {
            "label": "Sign-in information",
            "href": "/privacy#sign-in"
          },
          {
            "label": "Financial and verification providers",
            "href": "/privacy#financial-and-verification-providers"
          }
        ]
      },
      {
        "id": "withdrawal",
        "title": "Stopping access versus deleting records",
        "paragraphs": [
          "Withdrawal stops future collection under the affected authorization. Removing the Shopify app through Shopify affects that installation and may stop more than one connected institution. Neither action automatically describes what copies remain with a recipient institution.",
          "Deletion requires addressing the records within the applicable scope, provider rules, and lawful exceptions. We will identify any relevant limitation or retention obligation in the response. Commercial closure and privacy deadlines are separate."
        ],
        "links": [
          {
            "label": "Retention and deletion policy",
            "href": "/privacy#retention"
          }
        ]
      },
      {
        "id": "timing",
        "title": "Responses and complaints",
        "paragraphs": [
          "Applicable legal and source-provider deadlines govern the request. We will explain required clarification, the outcome, and any applicable exception or permitted extension. Shopify’s compliance-event handling has its own deadlines and cannot be treated as completed merely because a webhook was acknowledged.",
          "If you disagree with a response, reply to support@amlok.tech requesting a privacy review. You may also contact the competent privacy regulator, including the Office of the Privacy Commissioner of Canada or another relevant authority.",
          "If we cannot fulfill all or part of a request, we explain the applicable reason and review or complaint options, subject to legal limits. You may ask for an appeal or further review where the applicable law provides one. Amlok does not penalize the lawful exercise of privacy rights. Withdrawal can affect a service that depends on the information; this is assessed and explained separately from the request itself."
        ],
        "links": [
          {
            "label": "Office of the Privacy Commissioner of Canada",
            "href": "https://www.priv.gc.ca/en/report-a-concern/"
          },
          {
            "label": "Privacy Policy",
            "href": "/privacy"
          }
        ]
      }
    ]
  }
];
