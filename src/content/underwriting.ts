export const underwritingAudiences = [
  {
    id: 'business', label: 'Business lending', eyebrow: 'SMB · COMMERCIAL · MERCHANT FINANCE',
    title: 'Understand the business behind the balance sheet.',
    description: 'Bring bank activity, payments, accounting, and commercial relationships into the same assessment. Review how money is earned, where it moves, and which obligations compete for it.',
    questions: [
      ['Revenue quality', 'Separate operating receipts from transfers and financing. Reconcile sales, refunds, processor settlements, and deposits.'],
      ['Capacity & resilience', 'Examine liquidity, seasonality, debt service, and customer concentration within a consistent observation window.'],
      ['Connected exposure', 'Review supported ownership, related businesses, guarantors, and security interests with their evidence attached.'],
    ],
    cta: 'Discuss your business lending workflow', guide: '/industry-guides/business-smb',
    subject: 'Business', nodes: ['Bank accounts', 'Sales & receipts', 'Owners & guarantors', 'Debt & facilities', 'Customers & suppliers', 'Assets & security'],
    insight: 'Follow a sale through to cash received.',
    chain: ['Customer invoice', 'Processor settlement', 'Bank receipt'],
    note: 'One economic event can appear in several systems. Reconcile the records before measuring capacity.',
  },
  {
    id: 'consumer', label: 'Consumer lending', eyebrow: 'PERSONAL · AUTO · MORTGAGE · STUDENT · RENT',
    title: 'See the financial life behind the application.',
    description: 'Understand income, recurring commitments, liquidity, and payment timing together. Give your team a clearer view of affordability for the specific product being assessed.',
    questions: [
      ['Income in context', 'Distinguish payroll, self-employment receipts, transfers, and one-off deposits. Keep income definitions and source coverage visible.'],
      ['Ability to repay', 'Review recurring expenses, known debt payments, and residual cash over comparable periods. Surface timing mismatches and missing obligations.'],
      ['Product-specific review', 'Apply your own criteria for personal credit, auto, or mortgage lending. Include joint applicants or guarantors only within the authorized scope.'],
    ],
    cta: 'Discuss your consumer lending workflow', guide: '/industry-guides/consumer-personal',
    subject: 'Applicant', nodes: ['Bank accounts', 'Income sources', 'Joint applicants', 'Debt & bills', 'Payment patterns', 'Assets & liquidity'],
    insight: 'Connect income to the commitments it supports.',
    chain: ['Income evidence', 'Recurring obligations', 'Residual cash'],
    note: 'A deposit is a starting point. Its source, regularity, and timing help explain what it means for affordability.',
  },
  {
    id: 'insurance', label: 'Insurance & specialty finance', eyebrow: 'TRADE CREDIT · SURETY · PREMIUM FINANCE',
    title: 'Assess the relationships behind the exposure.',
    description: 'Bring financial evidence into the review of insured receivables, contractor capacity, and financed premiums. Connect the relevant parties, agreements, and obligations before judging the exposure.',
    questions: [
      ['Trade credit', 'Review buyer concentration, receivable aging, and supported buyer limits. Keep seller liquidity, buyer non-payment, and insured claims distinct.'],
      ['Surety', 'Connect principals, obligees, contracts, and bonds. Examine working capital, project obligations, and the quality of work-in-progress evidence.'],
      ['Premium finance', 'Review installment burden against household or business cash flow. Examine policy terms before assuming a premium amount is recoverable.'],
    ],
    cta: 'Discuss your insurance underwriting use case', guide: '/industry-guides/trade-credit',
    subject: 'Exposure', nodes: ['Financial records', 'Receivables', 'Related parties', 'Payment obligations', 'Buyers & principals', 'Policy & bond terms'],
    insight: 'Keep every party and obligation in context.',
    chain: ['Party & agreement', 'Financial evidence', 'Exposure review'],
    note: 'Configure the financial assessment to your line of business. Your team owns coverage, pricing, binding, and claims decisions.',
  },
] as const;

export const underwritingStages = [
  { title: 'Prepare', label: 'Define the deal', description: 'Agree the subject, product, evidence window, and required output. Confirm permissions and identify what is ready, missing, or outside scope.', artifact: 'Evidence readiness', rows: [['Application scope', 'Defined'], ['Authorized sources', 'Recorded'], ['Coverage gaps', 'Visible']], takeaway: 'Begin with a clear boundary for the assessment.' },
  { title: 'Connect', label: 'Resolve the relationships', description: 'Organize entities, accounts, documents, and transactions. Reconcile overlapping records and retain source references for supported relationships.', artifact: 'Connected evidence', rows: [['Entities & accounts', 'Linked'], ['Cross-source records', 'Reconciled'], ['Uncertain matches', 'For review']], takeaway: 'See which records describe the same financial reality.' },
  { title: 'Analyze', label: 'Evaluate capacity in context', description: 'Calculate supported attributes and examine income, cash flow, obligations, concentration, and exceptions under the agreed workflow.', artifact: 'Financial analysis', rows: [['Cash flow & obligations', 'Assessed'], ['Calculation inputs', 'Traceable'], ['Assumptions', 'Explicit']], takeaway: 'Understand the factors that support or weaken the case.' },
  { title: 'Review', label: 'Give judgment a clear foundation', description: 'Review structured findings, the agreed memo, and unresolved questions. Preserve the assessment alongside the institution’s policy context and final decision.', artifact: 'Underwriting snapshot', rows: [['Findings & evidence', 'Together'], ['Open questions', 'Retained'], ['Final decision', 'Your team']], takeaway: 'Challenge the reasoning before making the call.' },
  { title: 'Follow', label: 'Carry the context forward', description: 'Use the completed assessment as a baseline for Amlok Signal. Compare permitted new evidence with the original context as the financial relationship changes.', artifact: 'Monitoring baseline', rows: [['Original assessment', 'Preserved'], ['New evidence', 'Compared'], ['Material changes', 'For review']], takeaway: 'Start the next review with the history already connected.' },
] as const;

export const underwritingFaqs = [
  { question: 'What does it mean to underwrite the ecosystem?', answer: 'It means examining the applicant or exposure together with the financial relationships that affect it: accounts, income sources, obligations, counterparties, ownership, and relevant agreements. The scope is defined by the deal and the evidence your institution is authorized to use. A possible relationship remains a question for review until the evidence supports it.' },
  { question: 'What does Amlok Insights produce?', answer: 'Insights organizes and reconciles evidence, analyzes financial and risk information, and produces the structured findings and underwriting summary or credit memo agreed for your workflow. A completed assessment is tied to an evidence snapshot, so your team can review the supporting records and the questions that remain open.' },
  { question: 'Can we use it for business, consumer, and insurance-related assessments?', answer: 'The assessment should be configured for the specific product and available evidence. Business and consumer workflows use different financial definitions and policy criteria. For insurance-related use cases, discuss the required financial-risk scope for trade credit, surety, or premium finance with us. Coverage, actuarial pricing, policy administration, and claims handling remain with your institution and its systems.' },
  { question: 'Which data sources can we bring together?', answer: 'The agreed workflow can combine supplied documents, banking, payments, commerce, accounting, and other eligible sources. Availability depends on provider access, permissions, coverage, and integration arrangements.' },
  { question: 'Does Amlok make the final decision?', answer: 'Your institution owns its policy, risk appetite, approval or decline, and any customer communication. Amlok supports the analytical work with findings, calculations, evidence, and reviewable exceptions. Recommendations and policy observations remain distinct from the institution’s final decision.' },
  { question: 'How does underwriting connect to ongoing monitoring?', answer: 'A completed Insights assessment can become the baseline for Amlok Signal. Signal compares permitted new evidence with that baseline and can reassess material changes while preserving the original assessment. Change-driven reassessment is included in Signal; a separately requested new full underwriting is an Insights run.' },
  { question: 'How is a completed underwriting priced?', answer: 'Insights is priced per completed underwriting for one application and an agreed evidence snapshot. Standard, Advanced, and Complex tiers reflect the workload and scope. Agree the evidence limits and required outputs before processing. See our pricing page or discuss your workflow with the team.' },
] as const;
