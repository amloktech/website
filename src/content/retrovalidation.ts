// Source: the Amlok retrovalidation research summary supplied for the homepage.
// Keep its reported headline findings separate from its proposed comparison.
export const retrovalidationGroups = [
  { id: 'coverage', label: 'Financial coverage', description: 'How much of the financial picture can be assessed.' },
  { id: 'resolution', label: 'Entities & verification', description: 'Counterparty resolution, relationship precision, and AML alert review burden.' },
  { id: 'risk', label: 'Risk & forecasting', description: 'Changes in missed repayments, forecast error, and classification error.' },
] as const;

export type RetrovalidationGroup = typeof retrovalidationGroups[number]['id'];

export const retrovalidationMetrics: {
  id: string;
  label: string;
  group: RetrovalidationGroup;
  baseline: number;
  amlok: number;
  unit: '%' | '';
  direction?: 'lower';
  note?: string;
}[] = [
  { id: 'cash-flow-coverage', label: 'Cash-flow category coverage', group: 'coverage', baseline: 70, amlok: 88, unit: '%' },
  { id: 'settlement-reconciliation', label: 'Revenue settlement reconciliation', group: 'coverage', baseline: 75, amlok: 90, unit: '%' },
  // This normalized burden index does not measure time, cost, or verification accuracy.
  { id: 'aml-review-burden', label: 'Manual review burden from AML false-positive alerts', group: 'resolution', baseline: 100, amlok: 65, unit: '', direction: 'lower', note: 'Normalized manual review burden index, with baseline = 100. It does not measure review time, cost, or verification accuracy.' },
  { id: 'counterparty-coverage', label: 'Named counterparty coverage', group: 'resolution', baseline: 65, amlok: 86, unit: '%' },
  { id: 'customer-concentration', label: 'Customer concentration coverage', group: 'coverage', baseline: 60, amlok: 84, unit: '%' },
  { id: 'vendor-concentration', label: 'Vendor concentration coverage', group: 'coverage', baseline: 60, amlok: 88, unit: '%' },
  { id: 'repayment-miss-rate', label: 'Debt-repayment miss rate', group: 'risk', baseline: 4.4, amlok: 3.96, unit: '%', direction: 'lower' },
  { id: 'debt-service-assessability', label: 'Debt-service coverage assessability', group: 'coverage', baseline: 70, amlok: 85, unit: '%' },
  { id: 'working-capital-visibility', label: 'Working-capital cycle visibility', group: 'coverage', baseline: 65, amlok: 79, unit: '%' },
  { id: 'relationship-precision', label: 'Graph relationship precision', group: 'resolution', baseline: 80, amlok: 95, unit: '%' },
  { id: 'forecast-error', label: '60-day cash-flow forecast error', group: 'risk', baseline: 20, amlok: 18.5, unit: '%', direction: 'lower' },
  { id: 'classification-error', label: 'Transaction classification error', group: 'risk', baseline: 2.8, amlok: 2.66, unit: '%', direction: 'lower' },
];
