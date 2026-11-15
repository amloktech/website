export type LegalSection = { id: string; title: string; paragraphs: string[]; bullets?: string[]; links?: { label: string; href: string }[] };
export type LegalPolicy = { slug: string; title: string; description: string; summary: string[]; sections: LegalSection[] };

export const legalCompany = { name: "Amlok Tech Inc.", email: "support@amlok.tech", address: "15 Iceboat Terrace, Toronto ON M5V 4A5, Canada", corporationNumber: "1461755-0", businessNumber: "783288210" };
// Website publication authorized by the business owner on 15 November 2026.
export const legalRevision = { date: "2026-11-15", label: "Effective November 15, 2026", draft: false };

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
          "An integration catalog, illustration, or prospective feature is not a promise that the capability is available in every deployment. Available integrations, permissions, workloads, and service levels are specified in the applicable service arrangement."
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
          "The institution must establish appropriate review, correction, explanation, and rights procedures for decisions it makes using outputs. It must consider evidence gaps and applicable restrictions on profiling or automated consequential decisions. Amlok’s service does not authorize a prohibited use of information."
        ]
      },
      {
        "id": "data",
        "title": "Confidentiality and processing restrictions",
        "paragraphs": [
          "Personal and confidential information is handled under the Privacy Policy and applicable confidentiality and data-processing agreements. The processing schedule should identify permitted purposes, categories, recipients, duration, provider roles, security requirements, rights assistance, and return or deletion obligations.",
          "Connection authorization does not grant unrestricted rights to sell data, use it for unrelated advertising, train models, or create unrelated products. Any separate use must meet applicable law and source-provider conditions and receive any required separate authorization. Neither these terms nor an institution’s general instructions override stricter source restrictions.",
          "Use approved secure channels for sensitive records. General website enquiries and booking notes are intended for business contact details and a brief description of your request."
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
          "A merchant’s act of connecting a store does not by itself enroll that merchant in an institution’s paid Amlok subscription. Any merchant fee must be separately disclosed and agreed before it is charged."
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
          "Providers such as Shopify operate their own services under their own terms. Their availability, permissions, records, or interfaces can change. We do not guarantee uninterrupted access or that a provider will supply every requested record.",
          "The website also uses Cal.com scheduling and links to external sites and AI-summary services. Those destinations receive the requests you open and have their own privacy practices. A link alone does not imply endorsement."
        ],
        "links": [
          {
            "label": "Cookies Policy",
            "href": "/cookies"
          },
          {
            "label": "Shopify connection responsibilities",
            "href": "/connection-terms#shopify"
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
          "A merchant’s permission to connect a store does not replace notices, consent, or another lawful authority required for personal information about shoppers or other individuals."
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
          "Connection and authorization records: institution and workspace references, provider and account identifiers, selected sources, permitted data and purposes, one-time or monitoring choices, notice versions, and authorization, expiry, or withdrawal events.",
          "Authorized source information: the account, financial, transaction, commerce, document, or verification information specified for the enabled connection. The Shopify scope is described below.",
          "Analysis: normalized records, calculated measures, financial health findings, risk indicators, and other outputs generated within the authorized service.",
          "Technical and security information: IP address, device and browser information, request times, service activity, errors, and information needed to protect accounts and investigate misuse."
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
          "Withdrawal stops future collection under the affected authorization. It does not automatically erase earlier records or copies independently held by an institution or source provider. Deletion requests are assessed separately under the retention section; information that no longer has a permitted purpose must not be kept merely because it was once authorized."
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
          "If a workflow involves profiling or automated processing with legal or similarly significant effects on an individual, the applicable notices, lawful basis, and review or opt-out rights must be addressed for that workflow. Describing an output as intelligence does not remove those obligations. Contact us and the identified institution about a relevant objection, correction, or request for human review; we will coordinate the part within our responsibility."
        ]
      },
      {
        "id": "website-features",
        "title": "Website, communications, and scheduling",
        "paragraphs": [
          "Website contact and journal-signup features prepare a message in your email application. Preparing a draft does not submit it to an Amlok website form database; we receive it when you send it. Your email provider handles drafts and messages under its own terms.",
          "The website loads Cal.com’s booking script after the page becomes interactive, including before a booking dialog is opened. The embed forwards page query parameters into the booking experience. Cal.com receives associated technical requests and the information you submit when booking. Keep personal or confidential information out of website URLs and booking notes.",
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
          "Information is disclosed to the institution identified in your authorized connection and the personnel it authorizes for the stated purpose. We also use service providers for functions such as hosting, storage, security, communications, scheduling, and other expressly enabled services. They receive information appropriate to their function and applicable agreement.",
          "The marketing website uses Cloudflare infrastructure and Cal.com scheduling. Providers for institutional services depend on the deployed service and may differ from website providers. An integration catalog is not a list of every recipient of your data. Ask support@amlok.tech for the applicable provider register, processing locations, and contractual safeguards.",
          "Information may also be disclosed when legally required or lawfully necessary to protect systems or people, investigate misuse, resolve a dispute, or complete a corporate transaction subject to applicable confidentiality and data-protection safeguards. Disclosure remains limited by applicable law and source-provider restrictions."
        ],
        "links": [
          {
            "label": "Hosting and provider information",
            "href": "https://docs.amlok.io/security/hosting-and-subprocessors"
          }
        ]
      },
      {
        "id": "locations",
        "title": "Processing locations",
        "paragraphs": [
          "Information may be handled in Canada and other countries where relevant providers or authorized personnel operate. Laws and lawful-access requirements can differ. We do not make a Canada-only processing commitment through this policy.",
          "Applicable transfer protections and any geographic restrictions are addressed for the service and jurisdiction involved. Storage, backups, operational access, exports, and any authorized model processing must be considered together; the primary database region alone does not establish the complete processing location."
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
          "Deletion must address relevant source records, normalized data, derived records, files, exports, and backups, including preventing erased records from being restored into active use. Any legal exception or backup handling affecting completion must be identified in the response. Amlok deletion does not remove original records held independently by Shopify or another source, and the recipient institution must address copies it holds under its own responsibilities."
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
          "Do not send passwords, access tokens, complete financial files, identity documents, or sensitive account records in an ordinary support email or booking note. We will identify an approved secure channel if additional information is needed."
        ],
        "links": [
          {
            "label": "Security information",
            "href": "/security-compliance"
          }
        ]
      },
      {
        "id": "rights",
        "title": "Your rights and complaints",
        "paragraphs": [
          "Depending on applicable law and the circumstances, you may have rights to information about processing, access, correction, deletion, portability, objection, restriction, withdrawal of consent, and review of certain automated processing. Rights can have conditions and lawful exceptions. Withdrawing consent does not invalidate earlier lawful processing.",
          "Send privacy requests to support@amlok.tech. We may verify identity or authority using proportionate information and will coordinate with the responsible institution where needed. Requests concerning Shopify shoppers may be made through the merchant; we assist the merchant with data within our control. Correcting source information may also require reviewing affected outputs.",
          "We handle requests within applicable legal and source-provider deadlines. You may also complain to the relevant regulator, including the Office of the Privacy Commissioner of Canada or another competent provincial, state, or national authority. This policy does not limit statutory rights."
        ],
        "links": [
          {
            "label": "How to make a privacy request",
            "href": "/privacy-requests"
          },
          {
            "label": "Office of the Privacy Commissioner of Canada",
            "href": "https://www.priv.gc.ca/en/report-a-concern/"
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
          "Privacy, support, legal, and business enquiries: support@amlok.tech. Mail: Amlok Tech Inc., 15 Iceboat Terrace, Toronto ON M5V 4A5, Canada."
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
          "Cal.com booking: third-party script served from app.cal.com. Purpose: initialize and display the scheduling experience. It loads after the page becomes interactive, so a provider request can occur before a booking button is pressed. Any service-specific storage follows the provider’s configuration and policy.",
          "Website delivery: Cloudflare serves the website and handles technical network requests. Infrastructure security mechanisms may vary with configuration and request conditions; a fixed security-cookie lifetime is not specified by this website’s source code.",
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
          "Authenticated Amlok services use session mechanisms to maintain sign-in and protect access. Some Console screens also store interface preferences or temporary flow state. These mechanisms are distinct from the marketing website’s language preference; availability and configuration depend on the deployed service.",
          "Amlok Hub may be opened as a hosted link or embedded in an institution’s website. The institution controls its own website cookies and tracking. Shopify and other source providers control cookies and storage on their own authorization pages. Review those parties’ notices as well as Amlok’s.",
          "Removing browser storage does not revoke server-side access to a connected source or request deletion of previously collected records. Use the connection withdrawal or privacy-request process for those actions. Contact support@amlok.tech for the inventory applicable to your service."
        ],
        "links": [
          {
            "label": "Withdraw access or request deletion",
            "href": "/privacy-requests"
          }
        ]
      },
      {
        "id": "scheduling",
        "title": "Scheduling and URL information",
        "paragraphs": [
          "The Cal.com embed is configured to forward page query parameters into the booking experience. Parameters are the portion of a URL following a question mark, such as a campaign reference. Keep personal or confidential information out of website URLs.",
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
          "Clearing site data can reset preferences and sign you out of other services whose data you remove. Blocking scripts or third-party content may prevent the embedded calendar from working. Browser controls usually apply to that browser and device; changing one does not necessarily update another.",
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
          "This website does not implement a custom response to the legacy Do Not Track signal or a dedicated Global Privacy Control handler. Browser-level blocking and applicable statutory rights remain available. Contact support@amlok.tech for a question about a privacy signal or request; this notice does not limit rights under applicable law."
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
          "These terms are between you, acting for the business you are authorized to represent, and Amlok Tech Inc. They govern use of Amlok Hub and the Shopify connection when these terms are presented and accepted during authorization. They do not make you a party to the institution’s separate Amlok subscription.",
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
          "You remain responsible for notices, consent, or other lawful authority required for information about shoppers or other individuals within your business records. Installing an app does not override those obligations, provider restrictions, or an individual’s rights."
        ]
      },
      {
        "id": "permission",
        "title": "The permission you give",
        "paragraphs": [
          "When you confirm a connection, you authorize Amlok to retrieve the specified information, process it for the disclosed service, and provide the authorized information and outputs to the named institution. We may use service providers as described in the Privacy Policy to carry out that service. Permission is limited by the selected source, accounts, purpose, access mode, and applicable provider rules.",
          "For Shopify, the scope is financial order information and relevant store references, including historical orders where approved. The financial order query excludes buyer names, emails, phone numbers, billing and shipping addresses, payment credentials, and order notes. Required privacy-event processing is described separately in the Privacy Policy.",
          "Installing the Shopify app alone does not authorize sharing with an institution. Each additional account, store, or recipient requires the applicable authorization. An order-history permission is not unrestricted access to every Shopify data field."
        ],
        "links": [
          {
            "label": "Shopify data and purposes",
            "href": "/privacy#shopify"
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
          "Withdrawal stops future collection under the affected authorization. It does not by itself erase information already collected or information independently retained by an institution or source. Request deletion separately; applicable legal and Shopify deletion rules govern what must be erased, any lawful exception, and the deadline.",
          "An institution’s commercial cancellation or billing schedule cannot extend Shopify’s applicable deletion deadline."
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
          "Amlok does not provide financing through the connection or guarantee an institution’s decision. Data and analysis can contain gaps or errors. Contact Amlok about a connection or processing error, and contact the institution about its decision, review, or correction process."
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
          "Connecting a business account does not itself create a paid institutional subscription for you. Any merchant fee requires separate disclosure and agreement. These terms do not guarantee a financing outcome, impose a new monetary liability cap, or waive statutory rights."
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
          "Tell us which business or institution the request concerns, the service or source involved, the type of request, and a contact method. A store domain or connection reference can help. Provide only the information needed to locate the relationship."
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
          "Information about collection, recipients, purposes, retention, or providers.",
          "Access to information, a copy in an applicable portable format, or correction of inaccurate records.",
          "Deletion, restriction, objection, or withdrawal of consent where applicable.",
          "Withdrawal of a specific connection or ongoing monitoring permission.",
          "Assistance with applicable automated-processing review or opt-out rights, or a privacy complaint."
        ]
      },
      {
        "id": "verification",
        "title": "Verification and secure handling",
        "paragraphs": [
          "We may need to verify your identity or authority and the affected account, institution, or records. Verification should be proportionate to the sensitivity and request. Do not send passwords, API tokens, banking credentials, identity-document scans, or complete financial records in the initial email.",
          "If additional evidence is necessary, we will explain the approved secure method. A support acknowledgment means the request has been received; it is not confirmation that data has been delivered or erased."
        ]
      },
      {
        "id": "relationships",
        "title": "Merchants, institutions, and Shopify shoppers",
        "paragraphs": [
          "If you connected your business account, identify the institution and source you want us to review. If you are a shopper whose information is held by a Shopify merchant, the merchant can initiate Shopify’s data-request or deletion process. You may also contact Amlok about information within our responsibility.",
          "For information processed on behalf of an institution or merchant, we coordinate with the responsible organization and assist within our role. We do not disclose another customer’s information without verifying authority. Independent copies held by the institution or original source require that party’s own handling."
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
          "If you disagree with a response, reply to support@amlok.tech requesting a privacy review. You may also contact the competent privacy regulator, including the Office of the Privacy Commissioner of Canada or another relevant authority."
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
