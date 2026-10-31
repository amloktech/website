// Editorial previews only. Add publication URLs when the research is released.
// Cover diagrams are illustrations, not measured results.
export const resources = [
  {
    format: 'Report',
    category: 'Featured research',
    gradientTitle: 'Building a foundational risk graph:',
    title: 'Retrospective validation across 275,019 closed deals.',
    description: 'An upcoming look at how AMLOK retrospectively validated its models against historical lending outcomes across the institutions featured above.',
    image: 'retrospective-validation',
  },
  {
    format: 'Guide',
    category: 'Merchant cash advance',
    title: 'Reading the rhythm of merchant cash flow',
    description: 'Daily receipts, revenue volatility, and repayment capacity: exploring the signals behind merchant resilience.',
    image: 'merchant-cash-advance',
  },
  {
    format: 'Whitepaper',
    category: 'Insurtech',
    title: 'A clearer view of changing exposure',
    description: 'Connecting policy, claims, and financial behaviour to understand how risk evolves between renewal dates.',
    image: 'insurtech',
  },
  {
    format: 'Guide',
    category: 'Mortgage lending',
    title: 'Beyond the mortgage application',
    description: 'Income stability, household cash flow, and the changing context behind long-term mortgage risk.',
    image: 'mortgage',
  },
  {
    format: 'Report',
    category: 'Auto finance',
    title: 'The road ahead for auto credit',
    description: 'Bringing borrower behaviour, affordability, and vehicle exposure into a connected view of the lending lifecycle.',
    image: 'auto-finance',
  },
  {
    format: 'Whitepaper',
    category: 'Fintech',
    title: 'Intelligence for embedded finance',
    description: 'How financial products can connect fragmented data and keep risk decisions grounded as they scale.',
    image: 'fintech',
  },
  {
    format: 'Guide',
    category: 'Business lending',
    title: 'The connected business borrower',
    description: 'Reading working capital, cash conversion, and trading relationships to see beyond the balance sheet.',
    image: 'business-lending',
  },
  {
    format: 'Whitepaper',
    category: 'Consumer credit',
    title: 'A living view of consumer credit',
    description: 'Understanding affordability and repayment resilience as household circumstances change.',
    image: 'consumer-credit',
  },
] as const;

export type ResearchResource = typeof resources[number];
