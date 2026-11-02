import guideIndex from './industry-guide-index.json';

// Keep the homepage curated while the searchable library includes every guide.
export const resources = [
  {
    "format": "Report",
    "category": "Risk intelligence",
    "gradientTitle": "Evidence before intelligence:",
    "title": "building a foundational risk graph.",
    "description": "A transparent account of AMLOK’s public-data experiments, the measurements they support, and the work still required for lending decisions.",
    "image": "retrospective-validation",
    "href": "/research/evidence-before-intelligence",
    "readMinutes": 9,
    "date": "2026-11-02"
  },
  {
    "format": "Guide",
    "category": "Merchant cash advance",
    "gradientTitle": "",
    "title": "Follow the receipts. Understand merchant resilience.",
    "description": "A merchant cash advance guide to settlement timing, recurring cash generation, and contract-aware stress testing.",
    "image": "merchant-cash-advance",
    "href": "/research/follow-the-receipts",
    "readMinutes": 7,
    "date": "2026-11-02"
  },
  {
    "format": "Whitepaper",
    "category": "Insurtech",
    "gradientTitle": "",
    "title": "Exposure changes. The policy needs context.",
    "description": "A whitepaper on connected evidence for trade credit insurance, from buyer concentration to invoice-level review.",
    "image": "insurtech",
    "href": "/research/exposure-between-renewals",
    "readMinutes": 7,
    "date": "2026-11-02"
  },
  {
    "format": "Guide",
    "category": "Mortgage lending",
    "gradientTitle": "",
    "title": "The mortgage after the application.",
    "description": "A guide to affordability, renewal scenarios, and the evidence that connects an origination decision to the years that follow.",
    "image": "mortgage",
    "href": "/research/mortgage-after-the-application",
    "readMinutes": 7,
    "date": "2026-11-02"
  },
  {
    "format": "Report",
    "category": "Auto finance",
    "gradientTitle": "",
    "title": "Two risks inside every auto loan.",
    "description": "An auto-finance report on the interaction between payment capacity, vehicle exposure, and the measurement of realized loss.",
    "image": "auto-finance",
    "href": "/research/two-risks-in-auto-finance",
    "readMinutes": 7,
    "date": "2026-11-02"
  },
  {
    "format": "Whitepaper",
    "category": "Fintech",
    "gradientTitle": "",
    "title": "One sale. Many records. One financial truth.",
    "description": "A whitepaper on evidence architecture for embedded finance: reconciliation, data coverage, and the boundaries of an API response.",
    "image": "fintech",
    "href": "/research/one-sale-many-records",
    "readMinutes": 7,
    "date": "2026-11-02"
  },
  {
    "format": "Guide",
    "category": "Business lending",
    "gradientTitle": "",
    "title": "Underwrite the connected business.",
    "description": "A business-lending guide to cash conversion, financing capacity, and the relationships behind the balance sheet.",
    "image": "business-lending",
    "href": "/research/underwrite-the-connected-business",
    "readMinutes": 7,
    "date": "2026-11-02"
  },
  {
    "format": "Whitepaper",
    "category": "Consumer credit",
    "gradientTitle": "",
    "title": "Affordability is a moving picture.",
    "description": "A consumer-credit whitepaper on income timing, financial buffers, and evidence-led review as household circumstances change.",
    "image": "consumer-credit",
    "href": "/research/affordability-in-motion",
    "readMinutes": 7,
    "date": "2026-11-02"
  }
] as const;

export type ResearchResource = {
  format: 'Report' | 'Whitepaper' | 'Guide';
  category: string;
  industry?: string;
  gradientTitle: string;
  title: string;
  description: string;
  image: string;
  href: string;
  readMinutes: number;
  date: string;
};

export const industryGuides: ResearchResource[] = guideIndex.map(guide => ({ ...guide, format: 'Guide' }));
export const researchLibrary: ResearchResource[] = [...resources, ...industryGuides];
export const industryGroups = ['Consumer Lending', 'Business Lending', 'Financial Institutions', 'Fintech', 'Insurtech'] as const;
